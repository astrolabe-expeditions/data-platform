import { useShow, useOne } from '@refinedev/core';
import {
  Show,
  TextFieldComponent as TextField,
  DateField,
} from '@refinedev/mui';
import { Stack, Typography } from '@mui/material';

const ShowInstrument = () => {
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
          Identifier
        </Typography>
        <TextField value={instrument?.identifier} />
        <Typography variant="body1" fontWeight="bold">
          Model
        </Typography>
        {modelIsLoading ? (
          <>Loading...</>
        ) : (
          <>
            {model?.name} ({model?.version})
          </>
        )}
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={instrument?.created_at} />
      </Stack>
    </Show>
  );
};

export { ShowInstrument };
