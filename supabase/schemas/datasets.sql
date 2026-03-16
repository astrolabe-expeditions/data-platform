CREATE TYPE processing_status AS ENUM ('pending', 'processing', 'completed', 'failed');

CREATE TABLE public.datasets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  processing_status processing_status NOT NULL DEFAULT 'pending',
  processed_at TIMESTAMPTZ,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ,
  station_id uuid NOT NULL REFERENCES public.stations(id) ON DELETE CASCADE,
  program_id uuid REFERENCES public.programs(id) ON DELETE SET NULL,
  campaign_id uuid REFERENCES public.campaigns(id) ON DELETE SET NULL
);

ALTER TABLE
  public.datasets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view datasets" ON public.datasets FOR
SELECT
  TO authenticated USING (TRUE);

CREATE POLICY "Allow all authenticated users to insert datasets" ON public.datasets FOR
INSERT
  TO authenticated WITH CHECK (TRUE);
