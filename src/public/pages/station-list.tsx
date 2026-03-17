import { Stack } from '@mui/material';

import { PublicLayout } from '@/public/components/public-layout';
import { StationMap } from '@/public/components/station-map';

const StationList = () => {
  return (
    <PublicLayout isFluid>
      <Stack direction="row" sx={{ height: 'calc(100vh - 64px)' }}>
        <StationMap />
      </Stack>
    </PublicLayout>
  );
};

export { StationList };
