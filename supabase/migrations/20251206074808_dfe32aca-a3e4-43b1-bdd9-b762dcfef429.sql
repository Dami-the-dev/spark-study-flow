-- Create custom courses table for university students
CREATE TABLE public.custom_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_name TEXT NOT NULL,
  course_code TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create custom course questions (FAQs) table
CREATE TABLE public.custom_course_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.custom_courses(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create custom course materials table
CREATE TABLE public.custom_course_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.custom_courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  material_type TEXT NOT NULL,
  url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.custom_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_course_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_course_materials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for custom_courses
CREATE POLICY "Users can view their own courses"
  ON public.custom_courses FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own courses"
  ON public.custom_courses FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own courses"
  ON public.custom_courses FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own courses"
  ON public.custom_courses FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for custom_course_questions
CREATE POLICY "Users can view questions for their courses"
  ON public.custom_course_questions FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.custom_courses WHERE id = course_id AND user_id = auth.uid()));

CREATE POLICY "Users can create questions for their courses"
  ON public.custom_course_questions FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.custom_courses WHERE id = course_id AND user_id = auth.uid()));

CREATE POLICY "Users can update questions for their courses"
  ON public.custom_course_questions FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.custom_courses WHERE id = course_id AND user_id = auth.uid()));

CREATE POLICY "Users can delete questions for their courses"
  ON public.custom_course_questions FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.custom_courses WHERE id = course_id AND user_id = auth.uid()));

-- RLS Policies for custom_course_materials
CREATE POLICY "Users can view materials for their courses"
  ON public.custom_course_materials FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.custom_courses WHERE id = course_id AND user_id = auth.uid()));

CREATE POLICY "Users can create materials for their courses"
  ON public.custom_course_materials FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.custom_courses WHERE id = course_id AND user_id = auth.uid()));

CREATE POLICY "Users can update materials for their courses"
  ON public.custom_course_materials FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.custom_courses WHERE id = course_id AND user_id = auth.uid()));

CREATE POLICY "Users can delete materials for their courses"
  ON public.custom_course_materials FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.custom_courses WHERE id = course_id AND user_id = auth.uid()));

-- Add updated_at trigger
CREATE TRIGGER update_custom_courses_updated_at
  BEFORE UPDATE ON public.custom_courses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();