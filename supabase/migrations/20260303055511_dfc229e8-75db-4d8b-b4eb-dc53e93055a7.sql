
-- Fix past_questions: drop restrictive policy and add a proper PERMISSIVE one for anon + authenticated
DROP POLICY IF EXISTS "Anyone can view past questions" ON public.past_questions;

CREATE POLICY "Anyone can view past questions"
ON public.past_questions
FOR SELECT
TO anon, authenticated
USING (true);

-- Also fix quiz_questions: ensure the public read policy is permissive for anon
DROP POLICY IF EXISTS "Public can read quiz questions via safe view" ON public.quiz_questions;

CREATE POLICY "Public can read quiz questions via safe view"
ON public.quiz_questions
FOR SELECT
TO anon, authenticated
USING (true);
