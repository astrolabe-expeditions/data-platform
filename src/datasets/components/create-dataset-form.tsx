import { useTranslate, type HttpError } from '@refinedev/core';
import { Create } from '@refinedev/mui';
import { TextField, Box, Stack, Typography } from '@mui/material';
import { useForm } from '@refinedev/react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { Uploader } from '@/datasets/components/uploader/uploader';
import type { Dataset } from '@/shared/types/models';
import type { FC } from 'react';
import { useOneStation } from '@/stations/hooks/useOneStation';
import { useDatasetUploadFile } from './dataset-upload-file-provider';

interface CreateDatasetFormProps {
  stationId?: string;
}

const CreateDatasetForm: FC<CreateDatasetFormProps> = ({ stationId }) => {
  const t = useTranslate();
  const { instruments, isInstrumentsLoading, isInstrumentsError } =
    useOneStation({
      id: stationId,
    });
  const { hasFiles, uploadFiles } = useDatasetUploadFile();

  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish, redirect },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Dataset, HttpError, Partial<Dataset>>({
    refineCoreProps: {
      resource: 'datasets',
      redirect: false,
    },
  });

  const onFinishHandler = async (data: FieldValues) => {
    const respData = await onFinish({
      ...data,
      station_id: stationId,
    });
    await uploadFiles(respData?.data?.id as string);
    redirect('show', respData?.data?.id);
  };

  return (
    <Create
      isLoading={formLoading || isInstrumentsLoading}
      title={t('datasets.titles.create')}
      saveButtonProps={{
        onClick: handleSubmit(onFinishHandler),
        disabled: !hasFiles || saveButtonProps.disabled,
      }}
    >
      <Box component="form" autoComplete="off">
        <Stack spacing={2}>
          <Typography variant="h5" gutterBottom>
            {t('datasets.sections.details')}
          </Typography>
          <TextField
            {...register('description')}
            label={t('datasets.fields.description')}
            error={!!errors.description}
            helperText={errors.description?.message}
            multiline
            minRows={3}
            fullWidth
          />
          <Stack spacing={2} direction="row">
            <TextField
              {...register('start_at', {
                required: t('datasets.validation.startAtRequired'),
              })}
              label={t('datasets.fields.start_at', 'Start')}
              type="date"
              error={!!errors.start_at}
              helperText={errors.start_at?.message}
              fullWidth
            />
            <TextField
              {...register('end_at', {
                required: t('datasets.validation.endAtRequired'),
              })}
              label={t('datasets.fields.end_at', 'End')}
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

export { CreateDatasetForm };
