import type { FC } from 'react';
import { useState, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  LinearProgress,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';

/**
 * On doit pouvoir uploader 40 csv files en un seul coup pour une même session.
 * Chaque fichier doit être associé à un instrument (via un select dropdown).
 * Le nom du fichier doit être parsé pour extraire la date et l'heure de début d'enregistrement.
 * Le format du nom de fichier est : INSTRUMENTNAME_YYYYMMDD_HHMMSS.csv
 * Par exemple : Thermometer_20231015_143000.csv
 * On détermine l'instrument via INSTRUMENTNAME
 * Si on ne trouve pas l'instrument, on affiche une erreur. et on laisse l'utilisateur choisir l'instrument dans le dropdown.
 * Si l'instrument est trouvé, on pré-remplit le dropdown avec l'instrument trouvé.
 * Si l'instrument ne fait pas partie de la station courante, on affiche une erreur.
 * On affiche la liste des fichiers uploadés avec leur statut (en attente, en cours, terminé, erreur).
 * On affiche une barre de progression globale pour l'upload de tous les fichiers.
 * On permet de supprimer un fichier de la liste avant l'upload.
 */

// Dummy instruments for dropdown (replace with real data from station context)
const INSTRUMENTS = [
  'Thermometer',
  'Barometer',
  'Hygrometer',
  'Anemometer',
  'RainGauge',
];

type FileStatus = 'pending' | 'uploading' | 'done' | 'error';

interface UploadFile {
  file: File;
  instrument: string | null;
  date: string | null;
  time: string | null;
  status: FileStatus;
  error?: string;
}

function parseFileName(name: string) {
  // Example: Thermometer_20231015_143000.csv
  const regex = /^([A-Za-z0-9]+)_(\d{8})_(\d{6})\.csv$/;
  const match = name.match(regex);
  if (!match) return null;
  const [, instrument, date, time] = match;
  return { instrument, date, time };
}

const Uploader: FC = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Replace with actual station instruments from context
  const stationInstruments = INSTRUMENTS;

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadFile[] = [];
    Array.from(fileList).forEach((file) => {
      const parsed = parseFileName(file.name);
      let instrument = parsed?.instrument ?? null;
      let error: string | undefined;
      if (instrument && !stationInstruments.includes(instrument)) {
        error = t('Instrument not part of current station');
        instrument = null;
      } else if (!instrument) {
        error = t('Instrument not found in filename');
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

  const progress =
    files.length === 0
      ? 0
      : (files.filter((f) => f.status === 'done').length / files.length) * 100;

  return (
    <Box>
      <Typography variant="h6">{t('Upload CSV files')}</Typography>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".csv"
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />
      {files.length > 0 && (
        <Box mt={2}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ mb: 2 }}
          />
          <List>
            {files.map((f, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={f.file.name}
                  secondary={
                    <>
                      {f.date &&
                        f.time &&
                        `${t('Date')}: ${f.date}, ${t('Time')}: ${f.time}`}
                      <br />
                      <FormControl
                        size="small"
                        sx={{ minWidth: 120, mt: 1 }}
                        error={!!f.error}
                      >
                        <InputLabel>{t('Instrument')}</InputLabel>
                        <Select
                          value={f.instrument ?? ''}
                          label={t('Instrument')}
                          onChange={(e) =>
                            handleInstrumentChange(idx, e.target.value)
                          }
                          disabled={uploading}
                        >
                          {stationInstruments.map((inst) => (
                            <MenuItem key={inst} value={inst}>
                              {inst}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {f.error && (
                        <Typography
                          color="error"
                          variant="caption"
                          sx={{ ml: 1 }}
                        >
                          {f.error}
                        </Typography>
                      )}
                    </>
                  }
                />
                <Chip
                  label={t(f.status)}
                  color={
                    f.status === 'done'
                      ? 'success'
                      : f.status === 'error'
                        ? 'error'
                        : f.status === 'uploading'
                          ? 'info'
                          : 'default'
                  }
                  sx={{ mr: 2 }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label={t('Delete')}
                    onClick={() => handleRemove(idx)}
                    disabled={uploading}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {t('Select files')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export { Uploader };
