import {
  useTranslate,
  type HttpError,
  useParsed
} from '@refinedev/core';
import { Create } from '@refinedev/mui';
import {
  TextField,
  Box,
  Stack,
  Typography
} from '@mui/material';
import { useForm } from '@refinedev/react-hook-form';
import { Controller } from 'react-hook-form';
import type { FC } from 'react';

import { useOneStation } from '@/stations/hooks/useOneStation';
import { Uploader } from '@/stations/components/uploader';

interface ISession {
  id?: number;
  name: string;
  description?: string;
  date?: string;
  start_at?: string;
  end_at?: string;
}

const CreateSession: FC = () => {
  const { id } = useParsed();
  const t = useTranslate();
  const { isInstrumentsLoading, isInstrumentsError } = useOneStation({
    id: id as string
  })

  const {
    saveButtonProps,
    refineCore: { formLoading },
    control,
    formState: { errors },
  } = useForm<ISession, HttpError, Partial<ISession>>({
    refineCoreProps: {
      resource: 'sessions',
    },
  });

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      title={t('sessions.titles.create', 'Create Session')}
    >
      <Box component="form" autoComplete="off" sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          {t('sessions.sections.details', 'Session Details')}
        </Typography>
        <Stack spacing={2} direction="row">
          <Controller
            name="start_at"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('sessions.fields.start_at', 'Start')}
                type="date"
                error={!!errors.start_at}
                helperText={errors.start_at?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="end_at"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('sessions.fields.end_at', 'End')}
                type="date"
                error={!!errors.end_at}
                helperText={errors.end_at?.message}
                fullWidth
              />
            )}
          />
        </Stack>
        <Typography variant="h6" mt={2} mb={2}>Fichiers liés</Typography>
        {isInstrumentsLoading ? (
          <Typography>Chargement des instruments...</Typography>
        ) : isInstrumentsError ? (
          <Typography color="error">
            Erreur lors du chargement des instruments
          </Typography>
        ) : (
          <Uploader />
        )}
      </Box>
    </Create>
  );
};

// Gérer le cas où il n'y a pas d'instruments (afficher un message d'erreur dans l'uploader)
// Pas possible de créer une session sans instruments liés aux fichiers uploadés

export { CreateSession };
