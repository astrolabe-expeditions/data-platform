import { useShow, useMany, useGo } from '@refinedev/core';
import {
  Show,
  TextFieldComponent as TextField,
  DateField,
} from '@refinedev/mui';
import {
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

const ShowStation = () => {
  const go = useGo();

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

  const handleCreateSession = () => {
    go({
      to: `/stations/${station?.id}/sessions/create`,
      type: 'replace',
    });
  };

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
            <ListItem key={instrument.id} disableGutters>
              <ListItemText primary={instrument.identifier} />
            </ListItem>
          ))}
        </List>
        <Typography variant="body1" fontWeight="bold">
          Session d'enregistrements
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateSession}
          sx={{ mb: 1 }}
        >
          Ajouter une session
        </Button>
        {station?.sessions && station.sessions.length > 0 ? (
          <List dense>
            {station.sessions.map((session) => (
              <ListItem key={session.id} disableGutters>
                <ListItemText primary={session.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2">
            Aucune session d'enregistrement
          </Typography>
        )}
      </Stack>
    </Show>
  );
};

export { ShowStation };
