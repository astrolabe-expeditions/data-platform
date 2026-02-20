import { Stack, Typography } from '@mui/material';
import { useShow, useTranslate } from '@refinedev/core';
import { Show } from '@refinedev/mui';

import { DatasetTabs } from '@/datasets/components/dataset-tabs';
import type { Dataset } from '@/shared/types/models';

const ShowDataset = () => {
  const t = useTranslate();
  const {
    result: dataset,
    query: { isLoading },
  } = useShow<Dataset>();

  return (
    <Show
      isLoading={isLoading}
      canEdit={false}
      title={<Typography variant="h5">{dataset?.start_at}</Typography>}
    >
      <Stack spacing={2} mt={2}>
        {dataset ? <DatasetTabs datasetId={dataset?.id} /> : null}
        <Typography>
          <strong>{t('datasets.fields.description')}:</strong>{' '}
          {dataset?.description}
        </Typography>
        <Typography>
          <strong>{t('datasets.fields.status')}:</strong>{' '}
          {t(`commons.processing_status.${dataset?.processing_status}`)}
        </Typography>
        <Typography>
          <strong>{t('datasets.fields.period')}:</strong> {dataset?.start_at} -{' '}
          {dataset?.end_at}
        </Typography>
        <Typography>
          <strong>{t('commons.fields.createdAt')}:</strong>{' '}
          {dataset?.created_at}
        </Typography>
        <Typography>
          <strong>{t('commons.fields.updatedAt')}:</strong>{' '}
          {dataset?.updated_at}
        </Typography>
      </Stack>
    </Show>
  );
};

export { ShowDataset };
