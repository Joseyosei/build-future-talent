
-- Add new columns to candidate_profiles
ALTER TABLE public.candidate_profiles
  ADD COLUMN IF NOT EXISTS postcode text,
  ADD COLUMN IF NOT EXISTS age_range text,
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS cv_url text,
  ADD COLUMN IF NOT EXISTS profile_completion integer DEFAULT 0;

-- Create jobs table
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id uuid NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  location text NOT NULL,
  salary_min integer,
  salary_max integer,
  contract_type text,
  description text,
  requirements text,
  build_ready_required boolean DEFAULT false,
  open_to_career_changers boolean DEFAULT true,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Jobs policies
CREATE POLICY "Anyone can read active jobs" ON public.jobs FOR SELECT USING (status = 'active');
CREATE POLICY "Employers can read own jobs" ON public.jobs FOR SELECT TO authenticated USING (employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Employers can insert own jobs" ON public.jobs FOR INSERT TO authenticated WITH CHECK (employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Employers can update own jobs" ON public.jobs FOR UPDATE TO authenticated USING (employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()));

-- Create applications table
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  candidate_id uuid NOT NULL,
  status text DEFAULT 'applied',
  applied_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Candidates can insert own applications" ON public.applications FOR INSERT TO authenticated WITH CHECK (candidate_id IN (SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Candidates can read own applications" ON public.applications FOR SELECT TO authenticated USING (candidate_id IN (SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Employers can read applications for their jobs" ON public.applications FOR SELECT TO authenticated USING (job_id IN (SELECT j.id FROM public.jobs j JOIN public.employer_profiles ep ON j.employer_id = ep.id WHERE ep.user_id = auth.uid()));
CREATE POLICY "Employers can update applications for their jobs" ON public.applications FOR UPDATE TO authenticated USING (job_id IN (SELECT j.id FROM public.jobs j JOIN public.employer_profiles ep ON j.employer_id = ep.id WHERE ep.user_id = auth.uid()));

-- Create badges table
CREATE TABLE public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text,
  time_estimate text,
  sort_order integer
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read badges" ON public.badges FOR SELECT USING (true);

-- Create candidate_badges table
CREATE TABLE public.candidate_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid NOT NULL,
  badge_id uuid REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at timestamptz DEFAULT now()
);

ALTER TABLE public.candidate_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Candidates can read own badges" ON public.candidate_badges FOR SELECT TO authenticated USING (candidate_id IN (SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Candidates can insert own badges" ON public.candidate_badges FOR INSERT TO authenticated WITH CHECK (candidate_id IN (SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Employers can view candidate badges" ON public.candidate_badges FOR SELECT TO authenticated USING (true);

-- Create cohorts table
CREATE TABLE public.cohorts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL,
  name text NOT NULL,
  upload_date date DEFAULT CURRENT_DATE,
  student_count integer DEFAULT 0
);

ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Institutions can CRUD own cohorts" ON public.cohorts FOR ALL TO authenticated USING (institution_id IN (SELECT id FROM public.institution_profiles WHERE user_id = auth.uid())) WITH CHECK (institution_id IN (SELECT id FROM public.institution_profiles WHERE user_id = auth.uid()));

-- Create placements table
CREATE TABLE public.placements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid NOT NULL,
  employer_id uuid,
  job_id uuid REFERENCES public.jobs(id),
  start_date date,
  status text DEFAULT 'active',
  three_month_checkin text,
  twelve_month_checkin text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read placements" ON public.placements FOR SELECT TO authenticated USING (true);
CREATE POLICY "Employers can insert placements" ON public.placements FOR INSERT TO authenticated WITH CHECK (employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()));

-- Create match_scores table
CREATE TABLE public.match_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid NOT NULL,
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  score integer NOT NULL,
  breakdown jsonb,
  computed_at timestamptz DEFAULT now(),
  UNIQUE(candidate_id, job_id)
);

ALTER TABLE public.match_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Candidates can read own scores" ON public.match_scores FOR SELECT TO authenticated USING (candidate_id IN (SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Anyone can insert scores" ON public.match_scores FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update scores" ON public.match_scores FOR UPDATE USING (true);

-- Also allow employers to read all candidate_profiles (for viewing applicants)
CREATE POLICY "Employers can view candidate profiles" ON public.candidate_profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'employer'));

-- Allow candidates to read employer profiles (for job listings)
CREATE POLICY "Candidates can view employer profiles" ON public.employer_profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'candidate'));

-- Allow public read of employer profiles for job board
CREATE POLICY "Public can read employer profiles" ON public.employer_profiles FOR SELECT USING (true);
