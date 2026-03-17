set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_stations_with_public_data()
 RETURNS TABLE(id uuid, name text, description text, is_mobile boolean, campaign_ids uuid[], program_ids uuid[], long double precision, lat double precision)
 LANGUAGE sql
AS $function$
WITH stations as (SELECT
      s.id,
      s.name,
      s.description,
      s.is_mobile,
      COALESCE((
        SELECT array_agg(DISTINCT campaign_id)
        FROM (
          SELECT d.campaign_id
          FROM public.datasets d
          WHERE d.station_id = s.id
            AND d.is_public = true
            AND d.deleted_at IS NULL
            AND d.campaign_id IS NOT NULL

          UNION

          SELECT shc.campaign_id
          FROM public.station_has_campaigns shc
          WHERE shc.station_id = s.id
        ) campaign_sources
      ), ARRAY[]::uuid[]) AS campaign_ids,
      COALESCE((
        SELECT array_agg(DISTINCT program_id)
        FROM (
          SELECT d.program_id
          FROM public.datasets d
          WHERE d.station_id = s.id
            AND d.is_public = true
            AND d.deleted_at IS NULL
            AND d.program_id IS NOT NULL

          UNION

          SELECT shp.program_id
          FROM public.station_has_programs shp
          WHERE shp.station_id = s.id
        ) program_sources
      ), ARRAY[]::uuid[]) AS program_ids,
      CASE
        WHEN s.is_mobile = false THEN s.position::geometry
        ELSE lm.position
      END AS position
    FROM public.stations s
    LEFT JOIN LATERAL (
      SELECT
        m.position,
        m.recorded_at
      FROM public.station_has_instruments shi
      JOIN public.measures m
        ON m.instrument_id = shi.instrument_id
      WHERE shi.station_id = s.id
        AND m.position IS NOT NULL
      ORDER BY m.recorded_at DESC
      LIMIT 1
    ) lm ON true
    WHERE EXISTS (
      SELECT 1
      FROM public.datasets d
      WHERE d.station_id = s.id
        AND d.is_public = true
        AND d.deleted_at IS NULL
    )
    AND s.deleted_at IS NULL)

SELECT
  id,
  name,
  description,
  is_mobile,
  campaign_ids,
  program_ids,
  ST_X(ST_Transform(s.position, 4326)) as long,
  ST_Y(ST_Transform(s.position, 4326)) as lat
FROM stations s;
$function$
;


