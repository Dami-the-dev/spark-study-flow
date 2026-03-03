
-- Fix the view to use SECURITY INVOKER (not definer) so RLS of the querying user applies
DROP VIEW IF EXISTS public.quiz_questions_safe;

CREATE VIEW public.quiz_questions_safe
  WITH (security_invoker = true)
AS
  SELECT id, subject, difficulty, question, options, explanation, created_at
  FROM public.quiz_questions;

-- Enable RLS on the view's underlying read path by adding a permissive SELECT policy
-- to quiz_questions for the safe view usage (anon + authenticated can read via view)
DROP POLICY IF EXISTS "No direct public select on quiz_questions" ON public.quiz_questions;

CREATE POLICY "Public can read quiz questions via safe view"
ON public.quiz_questions
FOR SELECT
USING (true);

GRANT SELECT ON public.quiz_questions_safe TO anon, authenticated;
