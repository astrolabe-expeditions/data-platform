import { useGo } from '@refinedev/core';
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
import { useParsed } from '@refinedev/core';
import { useOneStation } from '@/stations/hooks/useOneStation';

const ShowStation = () => {
  const go = useGo();
  const { id } = useParsed();
  const { station, instruments, isLoading } = useOneStation({
    id: id as string,
  });

  const handleCreateSession = () => {
    go({
      to: `/stations/${station?.id}/sessions/create`,
      type: 'replace',
    });
  };

  return (
    <Show
      isLoading={isLoading}
      canEdit={false}
      title={<Typography variant="h5">{station?.name}</Typography>}
    >
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
        <Typography variant="body2">Aucune session d'enregistrement</Typography>
      </Stack>
    </Show>
  );
};

export { ShowStation };
