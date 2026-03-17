CREATE OR REPLACE FUNCTION get_stations_geojson()
RETURNS jsonb
LANGUAGE SQL
AS $$
  WITH stations AS (
    SELECT
      s.id,
      s.name,
      s.description,
      s.is_mobile,
      CASE
        WHEN s.is_mobile = false THEN s.position
        ELSE lm.position::geography
      END AS current_position
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
    AND s.deleted_at IS NULL
  )

  SELECT jsonb_build_object(
    'type',     'FeatureCollection',
    'features', jsonb_agg(feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(current_position)::jsonb,
      'properties', to_jsonb(stations) - 'current_position'
    ) AS feature
    FROM stations
  ) features;
$$;

CREATE OR REPLACE FUNCTION get_stations_with_public_data()
RETURNS table (
  id uuid,
  name text,
  description text,
  is_mobile boolean,
  campaign_ids uuid[],
  program_ids uuid[],
  long double precision,
  lat double precision
)
LANGUAGE SQL
AS $$
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
$$;

CREATE OR REPLACE FUNCTION mvt_measures(z integer, x integer, y integer, instrument_id uuid)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
    mvt_output text;
BEGIN
    WITH
    -- Define the bounds of the tile using the provided Z, X, Y coordinates
    bounds AS (
        SELECT ST_TileEnvelope(z, x, y) AS geom
    ),
    -- Transform the geometries from EPSG:4326 to EPSG:3857 and clip them to the tile bounds
    mvtgeom AS (
        SELECT
            m.id,
            m.recorded_at,
            m.parameters,
            ST_AsMVTGeom(
                ST_Transform(m.position, 3857), -- Transform the geometry to Web Mercator
                bounds.geom,
                4096, -- The extent of the tile in pixels (commonly 256 or 4096)
                0,    -- Buffer around the tile in pixels
                true  -- Clip geometries to the tile extent
            ) AS geom
        FROM
          public.measures as m, bounds
        WHERE
          ST_Intersects(ST_Transform(m.position, 3857), bounds.geom)
          AND m.instrument_id = mvt_measures.instrument_id
    )
    -- Generate the MVT from the clipped geometries
    SELECT INTO mvt_output encode(ST_AsMVT(mvtgeom, 'measures', 4096, 'geom'),'base64')
    FROM mvtgeom;

    RETURN mvt_output;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_station_measure_parameter_list(station_id uuid)
RETURNS text[]
LANGUAGE SQL
STABLE
AS $$
  SELECT COALESCE(array_agg(DISTINCT k.key ORDER BY k.key), ARRAY[]::text[])
  FROM public.station_has_instruments shi
  JOIN public.measures m
    ON m.instrument_id = shi.instrument_id
  CROSS JOIN LATERAL jsonb_object_keys(
    CASE
      WHEN jsonb_typeof(m.parameters) = 'object' THEN m.parameters
      ELSE '{}'::jsonb
    END
  ) AS k(key)
  WHERE shi.station_id = get_station_measure_parameter_list.station_id;
$$;

CREATE OR REPLACE FUNCTION public.get_station_last_position(station_id uuid)
RETURNS text
LANGUAGE SQL
STABLE
AS $$
  SELECT
    ST_AsGeoJSON(CASE
      WHEN s.is_mobile = false THEN s.position
      ELSE (
        SELECT m.position
        FROM public.station_has_instruments shi
        JOIN public.measures m ON m.instrument_id = shi.instrument_id
        JOIN public.datasets d ON d.id = m.dataset_id
        WHERE shi.station_id = get_station_last_position.station_id
          AND d.is_public = true
          AND d.deleted_at IS NULL
          AND m.position IS NOT NULL
        ORDER BY m.recorded_at DESC
        LIMIT 1
      )
    END) AS position
  FROM public.stations s
  WHERE s.id = get_station_last_position.station_id
    AND s.deleted_at IS NULL;
$$;
