import { useTranslate, type HttpError, useParsed } from '@refinedev/core';
import { Create } from '@refinedev/mui';
import { TextField, Box, Stack, Typography } from '@mui/material';
import { useForm } from '@refinedev/react-hook-form';
import { Controller } from 'react-hook-form';
import type { FC } from 'react';

import { useOneStation } from '@/stations/hooks/useOneStation';
import { Uploader } from '@/sessions/components/uploader/uploader';

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
  const { instruments, isInstrumentsLoading, isInstrumentsError } =
    useOneStation({
      id: id as string,
    });

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
      isLoading={formLoading || isInstrumentsLoading}
      saveButtonProps={saveButtonProps}
      title={t('sessions.titles.create')}
    >
      <Box component="form" autoComplete="off">
        <Stack spacing={2}>
          <Typography variant="h5" gutterBottom>
            {t('sessions.sections.details')}
          </Typography>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('sessions.fields.description')}
                multiline
                minRows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
              />
            )}
          />
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
        </Stack>
        {!isInstrumentsLoading && !isInstrumentsError ? (
          <Uploader instruments={instruments} />
        ) : null}
      </Box>
    </Create>
  );
};

export { CreateSession };
