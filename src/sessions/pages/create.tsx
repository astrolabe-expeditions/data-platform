import { useParsed } from '@refinedev/core';
import type { FC } from 'react';

import { CreateSessionForm } from '@/sessions/components/create-session-form';
import { SessionUploadFileProvider } from '../components/session-upload-file-provider';

const CreateSession: FC = () => {
  const { id: stationId } = useParsed();

  return (
    <SessionUploadFileProvider>
      <CreateSessionForm stationId={stationId as string} />
    </SessionUploadFileProvider>
  );
};

export { CreateSession };
