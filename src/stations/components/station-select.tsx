import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useList } from '@refinedev/core';
import { type FC, type SyntheticEvent, useMemo } from 'react';

import type { Station } from '@/shared/types/models';

interface AutocompleteOption {
  label: string;
  id: string;
}

interface StationSelectProps {
  value?: AutocompleteOption | null;
  onChange?: (
    event: SyntheticEvent<Element, Event>,
    value: AutocompleteOption | null,
  ) => void;
}

const StationSelect: FC<StationSelectProps> = ({ value, onChange }) => {
  const {
    result: { data: stations },
    query: { isLoading },
  } = useList<Station>({
    resource: 'stations',
  });

  const options = useMemo(() => {
    if (!stations) {
      return [];
    }
    return stations.map((station) => ({
      label: station.name,
      id: station.id,
    }));
  }, [stations]);

  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      onChange={onChange}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Station d'observation"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
};

export { StationSelect, type AutocompleteOption };

