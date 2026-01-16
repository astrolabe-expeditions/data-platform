import { useParsed } from '@refinedev/core';
import type { FC } from 'react';

import { CreateDatasetForm } from '@/datasets/components/create-dataset-form';
import { DatasetUploadFileProvider } from '@/datasets/components/dataset-upload-file-provider';

const CreateDataset: FC = () => {
  const { id: stationId } = useParsed();

  return (
    <DatasetUploadFileProvider>
      <CreateDatasetForm stationId={stationId as string} />
    </DatasetUploadFileProvider>
  );
};

export { CreateDataset };
