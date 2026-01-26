import type { FC } from 'react';

import type { DatasetFile } from '@/shared/types/models.ts';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTranslate } from '@refinedev/core';

interface FileListProps {
  files: DatasetFile[];
}

const FileList: FC<FileListProps> = ({ files }) => {
  const t = useTranslate();

  return (
    <List>
      {files.map((file) => (
        <ListItem key={file.id}>
          <ListItemText
            primary={
              <>
                <b>{file.name}</b>.{file.extension}
              </>
            }
            secondary={
              file.processed_at === null && (
                <Typography variant="caption">
                  {t('datasets.uploader.status.pending')}
                </Typography>
              )
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export { FileList };
