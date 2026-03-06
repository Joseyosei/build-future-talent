
-- Fix permissive RLS on match_scores
DROP POLICY IF EXISTS "Anyone can insert scores" ON public.match_scores;
DROP POLICY IF EXISTS "Anyone can update scores" ON public.match_scores;

CREATE POLICY "Service role can insert scores" ON public.match_scores FOR INSERT TO authenticated WITH CHECK (candidate_id IN (SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Service role can update scores" ON public.match_scores FOR UPDATE TO authenticated USING (candidate_id IN (SELECT id FROM public.candidate_profiles WHERE user_id = auth.uid()));
