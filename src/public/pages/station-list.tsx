import { Button, Stack, Typography } from '@mui/material';
import { useGo, useTranslate } from '@refinedev/core';
import type {
  CircleLayerSpecification,
  GeoJSONSource,
  SymbolLayerSpecification,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef, useState } from 'react';
import {
  Layer,
  Map as MapLibre,
  type MapMouseEvent,
  type MapRef,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
} from 'react-map-gl/maplibre';

import { supabaseClient } from '@/core/utils/supabase-client';
import { PublicLayout } from '@/public/components/public-layout';

interface StationPopupInfo {
  id: string;
  name: string;
  description: string;
  long: number;
  lat: number;
}

const brestCoordinate = [48.400002, -4.48333];

const StationList = () => {
  const mapRef = useRef<MapRef>(null);
  const go = useGo();
  const [popupInfo, setPopupInfo] = useState<StationPopupInfo | null>(null);
  const t = useTranslate();

  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabaseClient.rpc('get_stations_geojson');
      setGeojsonData(resp.data);
    };

    fetchData();
  }, []);

  const clusterLayer: CircleLayerSpecification = {
    id: 'clusters',
    source: 'stations',
    type: 'circle',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': '#1976D2',
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 300, 40],
    },
  };

  const clusterCountLayer: SymbolLayerSpecification = {
    id: 'cluster-count',
    source: 'stations',
    type: 'symbol',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['Noto Sans Regular'],
      'text-size': 12,
    },
  };

  const unclusteredPointLayer: CircleLayerSpecification = {
    id: 'unclustered-point',
    source: 'stations',
    type: 'circle',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#1976D2',
      'circle-radius': 8,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#000',
    },
  };

  const handleClick = async (event: MapMouseEvent) => {
    const feature = event.features?.[0];

    if (!feature || mapRef.current === null) {
      return;
    }

    if (feature.layer.id === 'clusters') {
      const clusterId = feature.properties.cluster_id;

      const geojsonSource: GeoJSONSource | undefined =
        mapRef.current.getSource('stations');

      const zoom = await geojsonSource?.getClusterExpansionZoom(clusterId);

      if (feature.geometry.type === 'Point') {
        const [long, lat] = feature.geometry.coordinates;
        mapRef.current.easeTo({
          center: [long, lat],
          zoom,
          duration: 500,
        });
      }
    }

    if (
      feature.layer.id === 'unclustered-point' &&
      feature.geometry.type === 'Point'
    ) {
      const [long, lat] = feature.geometry.coordinates;
      setPopupInfo({
        id: feature.properties?.id ?? 'unknown',
        name: feature.properties?.name ?? 'Unknown',
        description:
          feature.properties?.description ?? 'No description available',
        lat,
        long,
      });
    }

    if (popupInfo) {
      setPopupInfo(null);
    }
  };

  return (
    <PublicLayout isFluid>
      <Stack direction="row" sx={{ height: 'calc(100vh - 64px)' }}>
        <MapLibre
          initialViewState={{
            latitude: brestCoordinate[0],
            longitude: brestCoordinate[1],
            zoom: 4,
            bearing: 0,
            pitch: 0,
          }}
          ref={mapRef}
          onClick={handleClick}
          interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
          <NavigationControl position="top-right" />
          <ScaleControl />

          {geojsonData ? (
            <Source
              id="stations"
              type="geojson"
              data={geojsonData}
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
            >
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source>
          ) : null}

          {popupInfo && (
            <Popup
              anchor="bottom"
              longitude={popupInfo.long}
              latitude={popupInfo.lat}
              onClose={() => setPopupInfo(null)}
            >
              <Stack spacing={1}>
                <Typography>{popupInfo.name}</Typography>
                <Button
                  variant="contained"
                  onClick={() => go({ to: `/stations/${popupInfo.id}` })}
                  size="small"
                >
                  {t('public.list.explore')}
                </Button>
              </Stack>
            </Popup>
          )}
        </MapLibre>
      </Stack>
    </PublicLayout>
  );
};

export { StationList };
