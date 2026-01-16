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
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/CloudUpload';
import { type FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { Instrument } from '@/shared/types/models.ts';
import { parseFileName } from '@/datasets/components/uploader/helpers.ts';
import { useDatasetUploadFile } from '@/datasets/components/dataset-upload-file-provider.tsx';

interface UploaderProps {
  instruments: Instrument[];
}

const Uploader: FC<UploaderProps> = ({ instruments }) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { files, addFile, removeFile, updateFile } = useDatasetUploadFile();

  const instrumentIdentifiers = instruments.map((inst) => inst.serial_number);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    Array.from(fileList).forEach((file) => {
      const parsed = parseFileName(file.name);
      let instrumentSerialNumber = parsed?.instrument ?? null;
      let error: string | undefined;

      if (instrumentSerialNumber && !instrumentIdentifiers.includes(instrumentSerialNumber)) {
        error = t('datasets.uploader.errors.instrumentNotPartOfStation');
        instrumentSerialNumber = null;
      } else if (!instrumentSerialNumber) {
        error = t('datasets.uploader.errors.instrumentNotFoundInFilename');
      }

      const instrument = instruments.find(
        (inst) => inst.serial_number === instrumentSerialNumber,
      );

      addFile({
        file,
        instrument: instrument ? { id: instrument.id, serial_number: instrument.serial_number } : null,
        date: parsed?.date ?? null,
        time: parsed?.time ?? null,
        status: 'pending',
        error,
      });
    });
  };

  const handleInstrumentChange = (idx: number, serial_number: string) => {
    const instrument = instruments.find(
      (inst) => inst.serial_number === serial_number,
    );
    if (!instrument) return;

    updateFile(files[idx].file.name, {
      instrument: {
        id: instrument.id,
        serial_number: instrument.serial_number,
      },
    });
  };

  const handleRemove = (fileName: string) => {
    removeFile(fileName);
  };

  return (
    <Box>
      <Typography variant="h5" mt={2}>
        {t('datasets.uploader.title')}
      </Typography>
      <Typography variant="subtitle1" mb={2}>
        {t('datasets.uploader.subtitle')}
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
      >
        {t('datasets.uploader.button')}
      </Button>
      {files.length > 0 && (
        <Box>
          <Typography variant="h6" mt={2}>
            {t('datasets.uploader.sectionTitle')}
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
                        {t('datasets.uploader.instrument')}
                      </InputLabel>
                      <Select
                        value={file.instrument?.serial_number ?? ''}
                        label={t('datasets.uploader.instrument')}
                        onChange={(e) =>
                          handleInstrumentChange(idx, e.target.value)
                        }
                      >
                        {instruments.map((instrument) => (
                          <MenuItem
                            key={instrument.id}
                            value={instrument.serial_number}
                          >
                            {instrument.serial_number}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <IconButton
                      edge="end"
                      aria-label={t('Delete')}
                      onClick={() => handleRemove(file.file.name)}
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
                          {t('datasets.uploader.status.pending')}
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
