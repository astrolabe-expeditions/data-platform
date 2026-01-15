import { useTranslate, type HttpError, useParsed } from '@refinedev/core';
import { Create } from '@refinedev/mui';
import { TextField, Box, Stack, Typography } from '@mui/material';
import { useForm } from '@refinedev/react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { FC } from 'react';

import { useOneStation } from '@/stations/hooks/useOneStation';
import { Uploader } from '@/sessions/components/uploader/uploader';
import type { Session } from '@/shared/types/models';

const CreateSession: FC = () => {
  const { id: stationId } = useParsed();
  const t = useTranslate();
  const { instruments, isInstrumentsLoading, isInstrumentsError } =
    useOneStation({
      id: stationId as string,
    });

  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish, redirect },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Session, HttpError, Partial<Session>>({
    refineCoreProps: {
      resource: 'sessions',
      redirect: false,
    },
  });

  const onFinishHandler = async (data: FieldValues) => {
    console.log('Form Data:', data);
    const respData = await onFinish({
      ...data,
      station_id: stationId,
    });
    redirect('show', respData?.data?.id);
  };

  return (
    <Create
      isLoading={formLoading || isInstrumentsLoading}
      title={t('sessions.titles.create')}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: handleSubmit(onFinishHandler),
      }}
    >
      <Box component="form" autoComplete="off">
        <Stack spacing={2}>
          <Typography variant="h5" gutterBottom>
            {t('sessions.sections.details')}
          </Typography>
          <TextField
            {...register('description')}
            label={t('sessions.fields.description')}
            error={!!errors.description}
            helperText={errors.description?.message}
            multiline
            minRows={3}
            fullWidth
          />
          <Stack spacing={2} direction="row">
            <TextField
              {...register('start_at', {
                required: t('sessions.validation.startAtRequired'),
              })}
              label={t('sessions.fields.start_at', 'Start')}
              type="date"
              error={!!errors.start_at}
              helperText={errors.start_at?.message}
              fullWidth
            />
            <TextField
              {...register('end_at', {
                required: t('sessions.validation.endAtRequired'),
              })}
              label={t('sessions.fields.end_at', 'End')}
              type="date"
              error={!!errors.end_at}
              helperText={errors.end_at?.message}
              fullWidth
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
