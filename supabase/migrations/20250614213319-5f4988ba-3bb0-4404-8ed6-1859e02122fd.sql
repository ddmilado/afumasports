
-- Create table for customer enquiries
CREATE TABLE public.contact_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for contact enquiries
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact enquiries (public form)
CREATE POLICY "Anyone can submit contact enquiries" 
  ON public.contact_enquiries 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow admins to view contact enquiries (for future admin functionality)
CREATE POLICY "Admins can view contact enquiries" 
  ON public.contact_enquiries 
  FOR SELECT 
  USING (false); -- We'll update this later when we implement admin roles
