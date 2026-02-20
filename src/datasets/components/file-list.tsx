import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTranslate } from '@refinedev/core';
import type { FC } from 'react';

import type { DatasetFile } from '@/shared/types/models.ts';

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
              <Typography variant="caption">
                {t(`commons.processing_status.${file.processing_status}`)}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export { FileList };
