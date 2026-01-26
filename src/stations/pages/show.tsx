import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useParsed, useTranslate } from '@refinedev/core';
import { DateField, Show } from '@refinedev/mui';

import { DatasetSection } from '@/stations/components/dataset-section';
import { useOneStation } from '@/stations/hooks/use-one-station';

const ShowStation = () => {
  const t = useTranslate();
  const { id } = useParsed();
  const { station, instruments, isLoading } = useOneStation({
    id: id as string,
  });

  return (
    <Show
      isLoading={isLoading}
      canEdit={false}
      title={<Typography variant="h5">{station?.name}</Typography>}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems="flex-start"
      >
        <Stack flex={2} spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
          <Stack
            spacing={1}
            p={2}
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
              width: { xs: '100%', md: 'auto' },
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {t('stations.show.instruments')}
            </Typography>
            <List dense>
              {instruments?.map((instrument) => (
                <ListItem key={instrument.id} disableGutters>
                  <ListItemText primary={instrument.serial_number} />
                </ListItem>
              ))}
            </List>
          </Stack>
          <Stack
            spacing={1}
            p={2}
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
              width: { xs: '100%', md: 'auto' },
            }}
          >
            <DatasetSection stationId={station?.id as string} />
          </Stack>
        </Stack>
        <Stack
          flex={1}
          spacing={2}
          p={2}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
            minWidth: { md: 280 },
            width: { xs: '100%', md: '33%' },
            mt: { xs: 2, md: 0 },
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {t('stations.show.details')}
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body1" fontWeight="bold">
              {t('stations.show.createdAt')}
            </Typography>
            <DateField value={station?.created_at} />
            <Typography variant="body1" fontWeight="bold">
              {t('stations.show.updatedAt')}
            </Typography>
            <DateField value={station?.updated_at} />
          </Stack>
        </Stack>
      </Stack>
    </Show>
  );
};

export { ShowStation };
