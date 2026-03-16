CREATE POLICY "Public can view public datasets" ON public.datasets FOR SELECT
  TO anon USING (
    is_public = true
    AND deleted_at IS NULL
  );

CREATE POLICY "Public can view stations with public datasets" ON public.stations FOR SELECT
  TO anon USING (
    EXISTS (
      SELECT 1
      FROM public.datasets d
      WHERE d.station_id = public.stations.id
      AND d.is_public = true
      AND d.deleted_at IS NULL
    )
  );

CREATE POLICY "Public can view instruments of public stations" ON public.instruments FOR SELECT
  TO anon USING (
    EXISTS (
      SELECT 1
      FROM public.station_has_instruments shi
      JOIN public.stations s ON s.id = shi.station_id
      JOIN public.datasets d ON d.station_id = s.id
      WHERE shi.instrument_id = public.instruments.id
      AND d.is_public = true
      AND d.deleted_at IS NULL
    )
  );

CREATE POLICY "Public can view measures from public datasets" ON public.measures FOR SELECT
  TO anon USING (
    EXISTS (
      SELECT 1
      FROM public.datasets d
      WHERE d.id = public.measures.dataset_id
      AND d.is_public = true
      AND d.deleted_at IS NULL
    )
  );

CREATE POLICY "Public can view station-instrument links for public stations" ON public.station_has_instruments FOR SELECT
  TO anon USING (
    EXISTS (
      SELECT 1
      FROM public.stations s
      JOIN public.datasets d ON d.station_id = s.id
      WHERE s.id = public.station_has_instruments.station_id
      AND d.is_public = true
      AND d.deleted_at IS NULL
    )
  );

CREATE POLICY "Public can view station-program links for public stations" ON public.station_has_programs FOR SELECT
  TO anon USING (
    EXISTS (
      SELECT 1
      FROM public.stations s
      JOIN public.datasets d ON d.station_id = s.id
      WHERE s.id = public.station_has_programs.station_id
      AND d.is_public = true
      AND d.deleted_at IS NULL
    )
  );

CREATE POLICY "Public can view station-campaign links for public stations" ON public.station_has_campaigns FOR SELECT
  TO anon USING (
    EXISTS (
      SELECT 1
      FROM public.stations s
      JOIN public.datasets d ON d.station_id = s.id
      WHERE s.id = public.station_has_campaigns.station_id
      AND d.is_public = true
      AND d.deleted_at IS NULL
    )
  );
