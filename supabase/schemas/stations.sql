CREATE TABLE public.stations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  is_mobile boolean NOT NULL DEFAULT false,
  position extensions.geography(POINT),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ
);

ALTER TABLE
  public.stations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view stations" ON public.stations FOR
SELECT
  TO authenticated USING (TRUE);

CREATE TABLE public.station_has_instruments (
  station_id uuid REFERENCES public.stations(id) ON DELETE CASCADE,
  instrument_id uuid REFERENCES public.instruments(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  unassigned_at TIMESTAMPTZ,
  PRIMARY KEY (station_id, instrument_id)
);

ALTER TABLE
  public.station_has_instruments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to view station_has_instruments" ON public.station_has_instruments FOR
SELECT
  TO authenticated USING (TRUE);
