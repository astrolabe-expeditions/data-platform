import {
  useTranslate,
  useShow,
  type HttpError,
  useParsed,
  useMany,
  useList,
} from '@refinedev/core';
import { Create } from '@refinedev/mui';
import {
  TextField,
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useForm } from '@refinedev/react-hook-form';
import { Controller } from 'react-hook-form';
import type { FC } from 'react';
import { CreateSessionDataset } from '../components/create-session-dataset';

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

  const {
    result: station,
    query: { isLoading, isError },
  } = useShow({
    resource: 'stations',
    id: id,
  });

  console.log('Données de la station:', station);

  // Récupérer les relations instrument <-> station
  const {
    result: stationInstruments,
    query: { isLoading: instrumentsLoading, isError: instrumentsError },
  } = useList({
    resource: 'station_has_instruments',
    filters: [
      {
        field: 'station_id',
        operator: 'eq',
        value: id,
      },
    ],
    pagination: { pageSize: 100 },
  });

  // Récupérer les instruments liés
  const instrumentIds =
    stationInstruments?.data?.map((rel) => rel.instrument_id) || [];
  const {
    result: { data: instruments },
  } = useMany({
    resource: 'instruments',
    ids: instrumentIds,
    queryOptions: { enabled: instrumentIds.length > 0 },
  });

  const t = useTranslate();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm<ISession, HttpError, Partial<ISession>>({
    refineCoreProps: {
      resource: 'sessions',
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading station data</div>;
  }

  return (
    <Create
      isLoading={formLoading || instrumentsLoading}
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
        <Typography variant="h6">Instruments liés à la station</Typography>
        {instrumentsLoading ? (
          <Typography>Chargement des instruments...</Typography>
        ) : instrumentsError ? (
          <Typography color="error">
            Erreur lors du chargement des instruments
          </Typography>
        ) : (
          instruments?.map((instrument) => (
            <CreateSessionDataset key={instrument.id} instrument={instrument} />
          ))
        )}
      </Box>
    </Create>
  );
};

export { CreateSession };
