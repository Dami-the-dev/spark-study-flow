-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create study_plans table
CREATE TABLE public.study_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  subjects JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own study plans"
  ON public.study_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own study plans"
  ON public.study_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study plans"
  ON public.study_plans FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study plans"
  ON public.study_plans FOR DELETE
  USING (auth.uid() = user_id);

-- Create study_sessions table for timer tracking
CREATE TABLE public.study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  notes TEXT,
  session_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own study sessions"
  ON public.study_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own study sessions"
  ON public.study_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create quiz_questions table
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quiz questions"
  ON public.quiz_questions FOR SELECT
  TO authenticated
  USING (true);

-- Create quiz_attempts table
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES public.quiz_questions(id) ON DELETE CASCADE NOT NULL,
  selected_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_taken_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quiz attempts"
  ON public.quiz_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quiz attempts"
  ON public.quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create past_questions table
CREATE TABLE public.past_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_name TEXT NOT NULL,
  year INTEGER NOT NULL,
  subject TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.past_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view past questions"
  ON public.past_questions FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_study_plans_updated_at
  BEFORE UPDATE ON public.study_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample quiz questions
INSERT INTO public.quiz_questions (subject, difficulty, question, options, correct_answer, explanation) VALUES
('Mathematics', 'easy', 'What is 2 + 2?', '["2", "3", "4", "5"]', '4', 'Basic addition: 2 + 2 = 4'),
('Mathematics', 'medium', 'What is the derivative of x²?', '["x", "2x", "x²", "2"]', '2x', 'Using the power rule: d/dx(x²) = 2x'),
('Physics', 'easy', 'What is the unit of force?', '["Joule", "Watt", "Newton", "Pascal"]', 'Newton', 'Force is measured in Newtons (N)'),
('Chemistry', 'medium', 'What is the atomic number of Carbon?', '["4", "6", "8", "12"]', '6', 'Carbon has 6 protons, making its atomic number 6'),
('Biology', 'easy', 'What is the powerhouse of the cell?', '["Nucleus", "Mitochondria", "Ribosome", "Golgi body"]', 'Mitochondria', 'Mitochondria produce ATP, the energy currency of the cell');

-- Insert sample past questions
INSERT INTO public.past_questions (exam_name, year, subject, question, options, correct_answer, explanation, difficulty) VALUES
('JAMB', 2023, 'Mathematics', 'Simplify: 3(x + 2) - 2(x - 1)', '["x + 8", "x + 4", "5x + 4", "x + 6"]', 'x + 8', 'Expand: 3x + 6 - 2x + 2 = x + 8', 'medium'),
('WAEC', 2023, 'English', 'Choose the correct word: The student was _____ for cheating.', '["expelled", "expeled", "expell", "expulled"]', 'expelled', 'The correct spelling is "expelled"', 'easy'),
('NECO', 2022, 'Physics', 'What is the formula for kinetic energy?', '["mv", "½mv²", "mgh", "F = ma"]', '½mv²', 'Kinetic energy = ½ × mass × velocity²', 'medium'),
('JAMB', 2022, 'Chemistry', 'What is the pH of a neutral solution?', '["0", "7", "14", "1"]', '7', 'Pure water has a pH of 7, which is neutral', 'easy'),
('WAEC', 2022, 'Biology', 'Which organelle is responsible for protein synthesis?', '["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"]', 'Ribosome', 'Ribosomes are the site of protein synthesis', 'medium');