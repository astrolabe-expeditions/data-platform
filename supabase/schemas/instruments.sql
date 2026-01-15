CREATE TABLE public.instruments (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	serial_number text UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ,
  model_id uuid REFERENCES public.models(id) NOT NULL
);

ALTER TABLE public.instruments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view instruments"
  ON public.instruments
  FOR SELECT
  TO authenticated
  USING (true);
