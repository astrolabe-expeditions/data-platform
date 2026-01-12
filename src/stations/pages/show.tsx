import { useShow, useMany } from '@refinedev/core';
import {
  Show,
  TextFieldComponent as TextField,
  DateField,
} from '@refinedev/mui';
import { Stack, Typography, List, ListItem, ListItemText } from '@mui/material';

const ShowStation = () => {
  const {
    result: station,
    query: { isLoading },
  } = useShow();

  const {
    result: { data: instruments },
  } = useMany({
    resource: 'instruments',
    ids: [
      '497e59b3-b6d1-59b6-81a5-5963a182fe55',
      'b0d7ee5b-1b5a-5921-a7bc-5b5b8427a123',
    ],
    queryOptions: {
      enabled: true,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <TextField value={station?.name} />
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={station?.created_at} />
        <Typography variant="body1" fontWeight="bold">
          Updated At
        </Typography>
        <DateField value={station?.updated_at} />
        <Typography variant="body1" fontWeight="bold">
          Instruments associés
        </Typography>
        <List dense>
          {instruments?.map((instrument) => (
            <ListItem
              key={instrument.id}
              disableGutters
            >
              <ListItemText primary={instrument.identifier} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Show>
  );
};

export { ShowStation };
