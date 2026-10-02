CREATE TABLE public.donation_intents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name text NOT NULL,
  amount numeric(12,2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.donation_intents TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.donation_intents TO authenticated;
ALTER TABLE public.donation_intents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view donation intents" ON public.donation_intents FOR SELECT TO authenticated USING (true);