CREATE TABLE public.stations (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	name text NOT NULL,
	description text,
	is_mobile boolean NOT NULL DEFAULT false, -- true for mobile, false for fixed
	position extensions.geography(POINT),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  deleted_at TIMESTAMPTZ
);

ALTER TABLE public.stations ENABLE ROW LEVEL SECURITY;

-- RLS policy: Allow all authenticated users to SELECT stations
CREATE POLICY "Allow all authenticated users to view stations"
  ON public.stations
  FOR SELECT
  TO authenticated
  USING (true);

-- Join table for stations and instruments (many-to-many)
CREATE TABLE public.station_has_instruments (
    station_id uuid REFERENCES public.stations(id) ON DELETE CASCADE,
    instrument_id uuid REFERENCES public.instruments(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT now(),
    unassigned_at TIMESTAMPTZ,
    PRIMARY KEY (station_id, instrument_id)
);

ALTER TABLE public.station_has_instruments ENABLE ROW LEVEL SECURITY;
