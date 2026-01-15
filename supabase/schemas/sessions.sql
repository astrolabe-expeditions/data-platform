CREATE TABLE public.sessions (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ,
  station_id uuid NOT NULL REFERENCES public.stations(id) ON DELETE CASCADE
);

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view sessions"
  ON public.sessions
  FOR SELECT
  TO authenticated
  USING (true);
