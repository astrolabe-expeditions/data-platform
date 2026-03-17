import { Box, Stack, Typography } from '@mui/material';
import { useTranslate } from '@refinedev/core';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl/maplibre';

import { supabaseClient as supabase } from '@/core/utils/supabase-client';
import { PublicLayout } from '@/public/components/public-layout';
import { StationFilters } from '@/public/components/station-filters';
import { StationMap } from '@/public/components/station-map';
import { StationTable } from '@/public/components/station-table';
import { filterStations } from '@/public/helpers/filter-helpers';
import type { Filters } from '@/public/types/filters';
import type { StationWithPublicData } from '@/shared/types/models';

const StationList = () => {
  const t = useTranslate();
  const mapRef = useRef<MapRef>(null);
  const [appliedFilters, setAppliedFilters] = useState<Filters>();

  const [stations, setStations] = useState<StationWithPublicData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabase.rpc('get_stations_with_public_data');
      setStations(resp.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleApplyFilters = (filters: Filters) => {
    setAppliedFilters(filters);
  };

  const filteredStations = useMemo(() => {
    if (!stations) return [];

    if (!appliedFilters) {
      return stations;
    }

    const filterFn = filterStations(appliedFilters);
    return stations.filter((station) => filterFn(station));
  }, [stations, appliedFilters]);

  return (
    <PublicLayout isFluid>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ height: 'calc(100vh - 64px)' }}
      >
        <Box sx={{ flex: 2 }}>
          <StationMap stations={filteredStations} mapRef={mapRef} />
        </Box>
        <Stack
          sx={{
            flex: 1,
            padding: 3,
          }}
          spacing={3}
        >
          <Typography variant="h5" gutterBottom>
            {t('public.list.title')}
          </Typography>
          <StationFilters onApply={handleApplyFilters} />
          <StationTable
            stations={filteredStations}
            isLoading={isLoading}
            mapRef={mapRef}
          />
        </Stack>
      </Stack>
    </PublicLayout>
  );
};

export { StationList };
