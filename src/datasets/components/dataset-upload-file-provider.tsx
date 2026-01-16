import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { useSupabaseUpload } from '@/core/hooks/use-supabase-upload';
import type { UploadFile } from '@/datasets/types/upload.ts';
import { useCreate, useTranslate, useNotification } from '@refinedev/core';

type DatasetUploadFileContextType = {
  files: UploadFile[];
  hasFiles: boolean;
  setFiles: (files: UploadFile[]) => void;
  addFile: (file: UploadFile) => void;
  removeFile: (fileName: string) => void;
  uploadFiles: (datasetId: string) => Promise<void>;
  updateFile: (fileName: string, updatedFile: Partial<UploadFile>) => void;
};

const DatasetUploadFileContext = createContext<
  DatasetUploadFileContextType | undefined
>(undefined);

export const DatasetUploadFileProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const { upload } = useSupabaseUpload({ bucket: 'dataset_files' });
  const { mutateAsync } = useCreate({
    resource: 'dataset_files',
  });
  const t = useTranslate();
  const { open } = useNotification();

  const hasFiles = files.length > 0;
  const addFile = (file: UploadFile) => {
    if (files.some((f) => f.file.name === file.file.name)) {
      open?.({
        type: 'error',
        message: t('datasets.uploader.errors.duplicateFile', {
          fileName: file.file.name,
        })
      });
      return;
    }
    setFiles((prev) => [...prev, file]);
  };
  const removeFile = (fileName: string) =>
    setFiles((prev) => prev.filter((file) => file.file.name !== fileName));
  const updateFile = (fileName: string, updatedFile: Partial<UploadFile>) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.file.name === fileName ? { ...file, ...updatedFile } : file,
      ),
    );
  };
  const uploadFiles = async (datasetId: string) => {
    console.log('Uploading files:', files);
    for (const file of files) {
      const storagePath = `datasets/${datasetId}/instruments/${file.instrument?.serial_number ?? 'unknown'}/${file.file.name}`;
      await mutateAsync({
        values: {
          dataset_id: datasetId,
          instrument_id: file.instrument?.id ?? null,
          storage_path: storagePath,
        },
      });
      await upload(file.file, storagePath);
    }
  };

  return (
    <DatasetUploadFileContext.Provider
      value={{
        files,
        hasFiles,
        setFiles,
        addFile,
        removeFile,
        uploadFiles,
        updateFile,
      }}
    >
      {children}
    </DatasetUploadFileContext.Provider>
  );
};

export const useDatasetUploadFile = () => {
  const context = useContext(DatasetUploadFileContext);
  if (!context) {
    throw new Error(
      'useDatasetUploadFile must be used within a DatasetUploadFileProvider',
    );
  }
  return context;
};
