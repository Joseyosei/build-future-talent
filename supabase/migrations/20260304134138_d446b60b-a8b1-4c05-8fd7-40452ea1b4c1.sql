
-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'candidate', 'employer', 'institution');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Candidate profiles
CREATE TABLE public.candidate_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT, last_name TEXT, location TEXT, phone TEXT,
  background_text TEXT, quiz_answers JSONB DEFAULT '{}'::jsonb,
  availability TEXT, right_to_work TEXT, photo_url TEXT, bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Candidates can read own profile" ON public.candidate_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Candidates can insert own profile" ON public.candidate_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Candidates can update own profile" ON public.candidate_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Employer profiles
CREATE TABLE public.employer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT, contact_name TEXT, logo_url TEXT, description TEXT,
  website TEXT, company_type TEXT, company_size TEXT, region TEXT,
  hiring_roles TEXT[] DEFAULT '{}', hire_volume TEXT,
  plan TEXT DEFAULT 'Free', trust_score NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.employer_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Employers can read own profile" ON public.employer_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Employers can insert own profile" ON public.employer_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Employers can update own profile" ON public.employer_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Institution profiles
CREATE TABLE public.institution_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  institution_name TEXT, contact_name TEXT, logo_url TEXT, description TEXT,
  institution_type TEXT, region TEXT, website TEXT, regulatory_body TEXT,
  partnership_goals TEXT[] DEFAULT '{}', plan TEXT DEFAULT 'Starter',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.institution_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Institutions can read own profile" ON public.institution_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Institutions can insert own profile" ON public.institution_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Institutions can update own profile" ON public.institution_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Auto-create role + profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE _role app_role;
BEGIN
  _role := COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'candidate');
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, _role);
  IF _role = 'candidate' THEN
    INSERT INTO public.candidate_profiles (user_id, first_name, last_name, location, phone)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'firstName', NEW.raw_user_meta_data->>'lastName', NEW.raw_user_meta_data->>'location', NEW.raw_user_meta_data->>'phone');
  ELSIF _role = 'employer' THEN
    INSERT INTO public.employer_profiles (user_id, company_name, contact_name, company_size, region)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'companyName', NEW.raw_user_meta_data->>'contactName', NEW.raw_user_meta_data->>'companySize', NEW.raw_user_meta_data->>'region');
  ELSIF _role = 'institution' THEN
    INSERT INTO public.institution_profiles (user_id, institution_name, contact_name, institution_type, region)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'institutionName', NEW.raw_user_meta_data->>'contactName', NEW.raw_user_meta_data->>'institutionType', NEW.raw_user_meta_data->>'region');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_candidate_profiles_updated_at BEFORE UPDATE ON public.candidate_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_employer_profiles_updated_at BEFORE UPDATE ON public.employer_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_institution_profiles_updated_at BEFORE UPDATE ON public.institution_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
