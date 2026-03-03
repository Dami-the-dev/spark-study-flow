
-- Create a view that exposes quiz questions WITHOUT correct_answer
CREATE OR REPLACE VIEW public.quiz_questions_safe AS
  SELECT id, subject, difficulty, question, options, explanation, created_at
  FROM public.quiz_questions;

-- Grant select on the safe view to anon and authenticated
GRANT SELECT ON public.quiz_questions_safe TO anon, authenticated;

-- Create RPC to check an answer server-side (returns boolean)
CREATE OR REPLACE FUNCTION public.check_quiz_answer(
  _question_id uuid,
  _selected_answer text
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.quiz_questions
    WHERE id = _question_id
      AND correct_answer = _selected_answer
  );
$$;

-- Create RPC to get correct answer AFTER submission (for showing explanation highlight)
CREATE OR REPLACE FUNCTION public.get_correct_answer(_question_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT correct_answer FROM public.quiz_questions WHERE id = _question_id;
$$;

-- Drop the overly permissive SELECT policy on quiz_questions
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON public.quiz_questions;

-- Add a restrictive policy: only authenticated users can SELECT, and only via RPC/admin
-- (The safe view handles public reads; direct table access is restricted)
CREATE POLICY "No direct public select on quiz_questions"
ON public.quiz_questions
FOR SELECT
TO authenticated
USING (false);
