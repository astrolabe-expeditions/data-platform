CREATE TABLE public.measures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recorded_at TIMESTAMPTZ NOT NULL,
  position GEOGRAPHY,
  parameters JSONB,
  instrument_id uuid NOT NULL REFERENCES public.instruments(id) ON DELETE CASCADE,
  dataset_id uuid NOT NULL REFERENCES public.datasets(id) ON DELETE CASCADE
);

ALTER TABLE
  public.measures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view measures" ON public.measures FOR
SELECT
  TO authenticated USING (TRUE);
