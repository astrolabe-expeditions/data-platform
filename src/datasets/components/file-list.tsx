import type { FC } from 'react';

import type { DatasetFile } from '@/shared/types/models.ts';

interface FileListProps {
  files: DatasetFile[];
}

const FileList: FC<FileListProps> = ({ files }) => {
  return (
    <div>
      <h2>Files</h2>
      {files.map((file) => (
        <div key={file.id}>
          <p>File Name: {file.storage_path}</p>
        </div>
      ))}
    </div>
  );
};

export { FileList };
