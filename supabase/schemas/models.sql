CREATE TABLE public.models (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	name text NOT NULL,
	version text NOT NULL,
	program text NOT NULL,
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
