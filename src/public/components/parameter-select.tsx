import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useTranslate } from '@refinedev/core';
import type { FC } from 'react';

import { useSupabaseRpc } from '@/core/hooks/use-supabase-rpc';

interface ParameterSelectProps {
  value: string;
  stationId: string;
  onChange: (parameterName: string) => void;
}

const ParameterSelect: FC<ParameterSelectProps> = ({
  stationId,
  value,
  onChange,
}) => {
  const t = useTranslate();

  const {
    query: { data: parameters, isSuccess },
  } = useSupabaseRpc<string[]>({
    name: 'get_station_measure_parameter_list',
    params: {
      station_id: stationId,
    },
  });

  console.log('Parameters from RPC:', parameters);

  const handleChangeParameter = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    onChange(newValue);
  };

  if (!isSuccess || parameters.length === 0 || value === '') return null;

  return (
    <FormControl
      sx={{
        width: '250px',
      }}
    >
      <InputLabel id="parameter-select-label">
        {t('public.graph.parameter.label')}
      </InputLabel>
      <Select
        labelId="parameter-select-label"
        id="parameter-select"
        defaultValue={parameters[0]}
        value={value}
        label={t('public.graph.parameter.label')}
        onChange={handleChangeParameter}
      >
        {parameters.map((p) => (
          <MenuItem key={p} value={p}>
            {t(`public.graph.parameter.options.${p}`, p)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { ParameterSelect };
