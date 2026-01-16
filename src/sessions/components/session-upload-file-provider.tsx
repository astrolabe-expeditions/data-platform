import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { useSupabaseUpload } from '@/core/hooks/use-supabase-upload';
import type { UploadFile } from '@/sessions/types/upload.ts';
import { useCreate, useTranslate, useNotification } from '@refinedev/core';

type SessionUploadFileContextType = {
  files: UploadFile[];
  hasFiles: boolean;
  setFiles: (files: UploadFile[]) => void;
  addFile: (file: UploadFile) => void;
  removeFile: (fileName: string) => void;
  uploadFiles: (sessionId: string) => Promise<void>;
  updateFile: (fileName: string, updatedFile: Partial<UploadFile>) => void;
};

const SessionUploadFileContext = createContext<
  SessionUploadFileContextType | undefined
>(undefined);

export const SessionUploadFileProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const { upload } = useSupabaseUpload({ bucket: 'session_files' });
  const { mutateAsync } = useCreate({
    resource: 'session_files',
  });
  const t = useTranslate();
  const { open } = useNotification();

  const hasFiles = files.length > 0;
  const addFile = (file: UploadFile) => {
    if (files.some((f) => f.file.name === file.file.name)) {
      open?.({
        type: 'error',
        message: t('sessions.uploader.errors.duplicateFile', {
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
  const uploadFiles = async (sessionId: string) => {
    console.log('Uploading files:', files);
    for (const file of files) {
      const storagePath = `sessions/${sessionId}/instruments/${file.instrument?.serial_number ?? 'unknown'}/${file.file.name}`;
      await mutateAsync({
        values: {
          session_id: sessionId,
          instrument_id: file.instrument?.id ?? null,
          storage_path: storagePath,
        },
      });
      await upload(file.file, storagePath);
    }
  };

  return (
    <SessionUploadFileContext.Provider
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
    </SessionUploadFileContext.Provider>
  );
};

export const useSessionUploadFile = () => {
  const context = useContext(SessionUploadFileContext);
  if (!context) {
    throw new Error(
      'useSessionUploadFile must be used within a SessionUploadFileProvider',
    );
  }
  return context;
};
