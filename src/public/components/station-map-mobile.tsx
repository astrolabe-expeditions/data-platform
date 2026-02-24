import { Box } from '@mui/material';
import { bbox } from '@turf/bbox';
import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  type CircleLayerSpecification,
  Layer,
  type MapLayerMouseEvent,
  Map as MapLibre,
  type MapRef,
  type MapSourceDataEvent,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
} from 'react-map-gl/maplibre';

import { supabaseClient as supabase } from '@/core/utils/supabase-client';
import { useSupabaseMVT } from '@/public/hooks/use-supabase-mvt';

interface StationMapMobileProps {
  stationId: string;
  instrumentId: string;
}

const StationMapMobile: FC<StationMapMobileProps> = ({
  stationId,
  instrumentId,
}) => {
  const mapRef = useRef<MapRef>(null);

  const [hasFitBounds, setHasFitBounds] = useState(false);
  const [lastPosition, setLastPosition] = useState<{
    lat: number;
    long: number;
  } | null>(null);
  const [popupInfo, setPopupInfo] = useState<{
    id: string;
    recorded_at: string;
    // biome-ignore lint/suspicious/noExplicitAny: parameters can be of any shape depending on the instrument
    parameters: Record<string, any>;
    long: number;
    lat: number;
  } | null>(null);

  useSupabaseMVT();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabase.rpc('get_station_last_position', {
        station_id: stationId,
      });
      const data = JSON.parse(resp.data);
      setLastPosition({
        long: data.coordinates[0],
        lat: data.coordinates[1],
      });
    };

    if (!lastPosition) {
      fetchData();
    }
  }, [stationId, lastPosition]);

  const layerStyle: CircleLayerSpecification = {
    id: 'point',
    source: 'measures',
    type: 'circle',
    paint: {
      'circle-radius': 5,
      'circle-color': '#1976D2',
    },
    'source-layer': 'measures',
  };

  const handleMouseMove = (event: MapLayerMouseEvent) => {
    const features = mapRef.current
      ?.getMap()
      .queryRenderedFeatures(event.point);
    if (features && features.length > 0) {
      const feature = features[0];
      if (
        feature.layer.id === 'point' &&
        feature.properties.id &&
        feature.geometry.type === 'Point'
      ) {
        const { id, recorded_at, ...parameters } = feature.properties;
        setPopupInfo({
          id,
          recorded_at,
          parameters,
          long: feature.geometry.coordinates[0],
          lat: feature.geometry.coordinates[1],
        });
      }
    } else {
      setPopupInfo(null);
    }
  };

  const handleSourceData = useCallback(
    (event: MapSourceDataEvent) => {
      if (
        !hasFitBounds &&
        event.sourceId === 'measures' &&
        event.isSourceLoaded &&
        mapRef.current
      ) {
        const features = mapRef.current.querySourceFeatures('measures', {
          sourceLayer: 'measures',
        });

        if (features.length) {
          // calculate the bounding box of the feature
          const [minLng, minLat, maxLng, maxLat] = bbox({
            type: 'FeatureCollection',
            features: features,
          });

          mapRef.current.fitBounds(
            [
              [minLng, minLat],
              [maxLng, maxLat],
            ],
            { padding: 40, duration: 1000 },
          );
          setHasFitBounds(true);
        }
      }
    },
    [hasFitBounds],
  );

  if (!lastPosition) return null;

  return (
    <Box
      sx={{ height: 450, width: '100%', borderRadius: 2, overflow: 'hidden' }}
    >
      <MapLibre
        ref={mapRef}
        initialViewState={{
          zoom: 8,
          latitude: lastPosition.lat,
          longitude: lastPosition.long,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        onMouseMove={handleMouseMove}
        onSourceData={handleSourceData}
      >
        <NavigationControl position="top-right" />
        <ScaleControl />

        <Source
          id="measures"
          type="vector"
          tiles={[`supabase://measures/{z}/{x}/{y}/${instrumentId}`]}
        >
          <Layer {...layerStyle} />
        </Source>

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.long)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.recorded_at}
              {popupInfo.parameters && (
                <ul>
                  {Object.entries(popupInfo.parameters).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Popup>
        )}
      </MapLibre>
    </Box>
  );
};

export { StationMapMobile };
