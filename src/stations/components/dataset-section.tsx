import type { FC } from 'react';
import type { Dataset } from '@/shared/types/models';
import { useList, useGo, useTranslate } from '@refinedev/core';
import { Stack, Typography, Button } from '@mui/material';

import { DatasetList } from '@/stations/components/dataset-list';

interface DatasetSectionProps {
  stationId: string;
}

const DatasetSection: FC<DatasetSectionProps> = ({ stationId }) => {
  const go = useGo();
  const t = useTranslate();

  const {
    result: { data: datasets },
    query: { isLoading },
  } = useList<Dataset>({
    resource: 'datasets',
    filters: [
      {
        field: 'station_id',
        operator: 'eq',
        value: stationId,
      },
    ],
  });

  const handleCreate = () => {
    go({
      to: `/stations/${stationId}/datasets/create`,
      type: 'replace',
    });
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" fontWeight="bold">
          {t('stations.show.datasets.title')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ mb: { xs: 1, md: 0 } }}
        >
          {t('stations.show.datasets.create')}
        </Button>
      </Stack>
      <DatasetList isLoading={isLoading} datasets={datasets} />
    </div>
  );
};

export { DatasetSection };
