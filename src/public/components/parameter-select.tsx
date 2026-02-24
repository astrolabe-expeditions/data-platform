import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useTranslate } from '@refinedev/core';
import { type FC, useEffect, useState } from 'react';

import { supabaseClient as supabase } from '@/core/utils/supabase-client';

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

  const [parameters, setParameters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await supabase.rpc('get_station_measure_parameter_list', {
        station_id: stationId,
      });
      setParameters(resp.data);
      onChange(resp.data[0]);
    };

    if (parameters.length === 0) {
      fetchData();
    }
  }, [stationId, onChange, parameters]);

  const handleChangeParameter = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    onChange(newValue);
  };

  if (parameters.length === 0 || value === '') return null;

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
