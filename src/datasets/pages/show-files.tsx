import { useList, useParsed, useShow } from '@refinedev/core';
import { Show } from '@refinedev/mui';
import { Stack, Typography } from '@mui/material';
import type { Dataset, DatasetFile } from '@/shared/types/models';
import { DatasetTabs } from '@/datasets/components/dataset-tabs';
import { FileList } from '@/datasets/components/file-list.tsx';

const ShowDatasetFiles = () => {
  const { id: datasetId } = useParsed();
  const {
    result: dataset,
    query: { isLoading },
  } = useShow<Dataset>({
    resource: 'datasets',
    id: datasetId as string,
  });

  const { result: files } = useList<DatasetFile>({
    resource: 'dataset_files',
    meta: {
      filters: [
        {
          field: 'dataset_id',
          operator: 'eq',
          value: datasetId,
        },
      ],
    },
  });

  return (
    <Show
      isLoading={isLoading}
      canEdit={false}
      title={<Typography variant="h5">{dataset?.start_at}</Typography>}
    >
      <Stack spacing={2} mt={2}>
        {dataset ? <DatasetTabs datasetId={dataset?.id} /> : null}
        <FileList files={files?.data ?? []} />
      </Stack>
    </Show>
  );
};

export { ShowDatasetFiles };
