import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Stack, Typography } from '@mui/material';
import { useGo, useParsed, useTranslate } from '@refinedev/core';

import { PublicLayout } from '@/public/components/public-layout';
import { StationGraph } from '@/public/components/station-graph';
import { StationMapFixed } from '@/public/components/station-map-fixed';
import { StationMapMobile } from '@/public/components/station-map-mobile';
import { useOneStation } from '@/stations/hooks/use-one-station';

const StationDetail = () => {
  const { id } = useParsed();
  const { station, instruments } = useOneStation({
    id: id as string,
  });
  const go = useGo();
  const t = useTranslate();

  const handleBack = () => {
    go({ to: '/' });
  };

  return (
    <PublicLayout>
      <Stack spacing={3} marginTop={3}>
        <Stack direction="row" spacing={2}>
          <IconButton
            aria-label={t('public.detail.back')}
            onClick={handleBack}
            color="primary"
          >
            <ArrowBackIcon />
          </IconButton>
          <Stack direction="column">
            <Typography variant="h4" component="h1">
              {station?.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {station?.description}
            </Typography>
          </Stack>
        </Stack>
        {station && instruments.length > 0 ? (
          <>
            {station?.is_mobile ? (
              <StationMapMobile
                stationId={station.id}
                instrumentId={instruments[0].id}
              />
            ) : (
              <StationMapFixed stationId={station.id} />
            )}
            <StationGraph stationId={station.id} instruments={instruments} />
          </>
        ) : null}
      </Stack>
    </PublicLayout>
  );
};

export { StationDetail };
