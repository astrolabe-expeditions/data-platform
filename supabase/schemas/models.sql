CREATE TABLE public.models (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
	name text NOT NULL,
  description text,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view models"
  ON public.models
  FOR SELECT
  TO authenticated
  USING (true);
