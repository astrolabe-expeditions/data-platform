import type { DatasetFile } from '@/shared/types/models';

const getFileProcessingStatusKey = (datasetFile: DatasetFile) => {
  if (
    datasetFile.processing_status === 'pending' &&
    !datasetFile.is_validated
  ) {
    return 'datasets.files.processingStatus.validating';
  }

  return `datasets.files.processingStatus.${datasetFile.processing_status}`;
};

export { getFileProcessingStatusKey };
