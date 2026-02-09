import { Stack, Typography } from '@mui/material';
import { useOne, useShow, useTranslate } from '@refinedev/core';
import {
  DateField,
  Show,
  TextFieldComponent as TextField,
} from '@refinedev/mui';

const ShowInstrument = () => {
  const t = useTranslate();
  const {
    result: instrument,
    query: { isLoading },
  } = useShow();

  const {
    result: model,
    query: { isLoading: modelIsLoading },
  } = useOne({
    resource: 'models',
    id: instrument?.model_id || '',
    queryOptions: {
      enabled: !!instrument?.model_id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {t('instruments.fields.serial_number')}
        </Typography>
        <TextField value={instrument?.serial_number} />
        <Typography variant="body1" fontWeight="bold">
          {t('instruments.fields.model')}
        </Typography>
        {modelIsLoading ? (
          <>Loading...</>
        ) : (
          <>
            {model?.name} ({model?.code})
          </>
        )}
        <Typography variant="body1" fontWeight="bold">
          {t('commons.fields.createdAt')}
        </Typography>
        <DateField value={instrument?.created_at} />
      </Stack>
    </Show>
  );
};

export { ShowInstrument };
