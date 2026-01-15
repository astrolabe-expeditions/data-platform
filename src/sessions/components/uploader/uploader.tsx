import type { FC } from 'react';
import { useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@refinedev/core';

import {
  Box,
  Button,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';

import type { Instrument } from '@/shared/types/models.ts';
import { parseFileName } from '@/sessions/components/uploader/helpers';

type FileStatus = 'pending' | 'uploading' | 'done' | 'error';

interface UploadFile {
  file: File;
  instrument: string | null;
  date: string | null;
  time: string | null;
  status: FileStatus;
  error?: string;
}

interface UploaderProps {
  instruments: Instrument[];
}

const Uploader: FC<UploaderProps> = ({ instruments }) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { open } = useNotification();

  const instrumentIdentifiers = instruments.map((inst) => inst.serial_number);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadFile[] = [];
    Array.from(fileList).forEach((file) => {
      const parsed = parseFileName(file.name);
      let instrument = parsed?.instrument ?? null;
      let error: string | undefined;

      if (files.some((f) => f.file.name === file.name)) {
        open?.({
          type: 'error',
          message: t('sessions.uploader.errors.duplicateFile', {
            fileName: file.name,
          }),
        });
        return;
      }

      if (instrument && !instrumentIdentifiers.includes(instrument)) {
        error = t('sessions.uploader.errors.instrumentNotPartOfStation');
        instrument = null;
      } else if (!instrument) {
        error = t('sessions.uploader.errors.instrumentNotFoundInFilename');
      }

      newFiles.push({
        file,
        instrument,
        date: parsed?.date ?? null,
        time: parsed?.time ?? null,
        status: 'pending',
        error,
      });
    });
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleInstrumentChange = (idx: number, value: string) => {
    setFiles((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, instrument: value, error: undefined } : f,
      ),
    );
  };

  const handleRemove = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpload = async () => {
    setUploading(true);
    let completed = 0;
    for (let i = 0; i < files.length; i++) {
      setFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, status: 'uploading' } : f)),
      );
      // Simulate upload delay
      await new Promise((res) => setTimeout(res, 500));
      // Simulate error if instrument missing
      if (!files[i].instrument) {
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i
              ? {
                  ...f,
                  status: 'error',
                  error: t('Instrument required'),
                }
              : f,
          ),
        );
      } else {
        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: 'done' } : f)),
        );
      }
      completed++;
    }
    setUploading(false);
  };

  return (
    <Box>
      <Typography variant="h5" mt={2}>
        {t('sessions.uploader.title')}
      </Typography>
      <Typography variant="subtitle1" mb={2}>
        {t('sessions.uploader.subtitle')}
      </Typography>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".csv"
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Button
        variant="contained"
        startIcon={<UploadIcon />}
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {t('sessions.uploader.button')}
      </Button>
      {files.length > 0 && (
        <Box>
          <Typography variant="h6" mt={2}>
            {t('sessions.uploader.sectionTitle')}
          </Typography>
          <List>
            {files.map((file, idx) => (
              <ListItem
                key={file.file.name}
                disableGutters
                secondaryAction={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <FormControl
                      size="small"
                      sx={{ minWidth: 120, mt: 1 }}
                      error={!!file.error}
                    >
                      <InputLabel>
                        {t('sessions.uploader.instrument')}
                      </InputLabel>
                      <Select
                        value={file.instrument ?? ''}
                        label={t('sessions.uploader.instrument')}
                        onChange={(e) =>
                          handleInstrumentChange(idx, e.target.value)
                        }
                        disabled={uploading}
                      >
                        {instruments.map((inst) => (
                          <MenuItem key={inst.id} value={inst.serial_number}>
                            {inst.serial_number}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <IconButton
                      edge="end"
                      aria-label={t('Delete')}
                      onClick={() => handleRemove(idx)}
                      disabled={uploading}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText
                  primary={file.file.name}
                  secondary={
                    <>
                      {file.status === 'pending' && (
                        <Typography variant="caption">
                          {t('sessions.uploader.status.pending')}
                        </Typography>
                      )}
                      {file.error && (
                        <>
                          <Typography variant="caption" sx={{ mx: 1 }}>
                            -
                          </Typography>
                          <Typography color="error" variant="caption">
                            {file.error}
                          </Typography>
                        </>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export { Uploader };
