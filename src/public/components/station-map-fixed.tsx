import { Box } from '@mui/material';
import { type FC, useEffect, useState } from 'react';
import {
  Map as MapLibre,
  Marker,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl/maplibre';

import { supabaseClient as supabase } from '@/core/utils/supabase-client';

interface StationMapFixedProps {
  stationId: string;
}

const StationMapFixed: FC<StationMapFixedProps> = ({ stationId }) => {
  const [lastPosition, setLastPosition] = useState<{
    lat: number;
    long: number;
  } | null>(null);

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

  if (!lastPosition) return null;

  return (
    <Box
      sx={{ height: 450, width: '100%', borderRadius: 2, overflow: 'hidden' }}
    >
      <MapLibre
        initialViewState={{
          zoom: 8,
          latitude: lastPosition.lat,
          longitude: lastPosition.long,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <NavigationControl position="top-right" />
        <ScaleControl />
        {lastPosition && (
          <Marker
            longitude={lastPosition.long}
            latitude={lastPosition.lat}
            color="#eea200"
          />
        )}
      </MapLibre>
    </Box>
  );
};

export { StationMapFixed };
