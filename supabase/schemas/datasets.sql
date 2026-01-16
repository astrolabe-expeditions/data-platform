CREATE TABLE public.datasets (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ,
  station_id uuid NOT NULL REFERENCES public.stations(id) ON DELETE CASCADE
);

ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view datasets"
  ON public.datasets
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to insert datasets"
  ON public.datasets
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
