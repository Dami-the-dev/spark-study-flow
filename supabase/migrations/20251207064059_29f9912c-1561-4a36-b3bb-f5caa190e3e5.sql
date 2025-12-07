-- Create storage bucket for course PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('course-pdfs', 'course-pdfs', false);

-- Create policies for PDF uploads
CREATE POLICY "Users can upload their own PDFs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'course-pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own PDFs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'course-pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own PDFs" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'course-pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add avatar customization fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS reading_hours INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS avatar_level INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS custom_avatar TEXT DEFAULT NULL;

-- Add UPDATE and DELETE policies for study_sessions (fixing security issue)
CREATE POLICY "Users can update their own study sessions" 
ON study_sessions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study sessions" 
ON study_sessions FOR DELETE USING (auth.uid() = user_id);