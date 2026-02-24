import { Stack } from '@mui/material';
import { type FC, useState } from 'react';

import { InstrumentChart } from '@/public/components/instrument-chart';
import { ParameterSelect } from '@/public/components/parameter-select';
import type { Instrument } from '@/shared/types/models';

interface StationGraphProps {
  stationId: string;
  instruments: Instrument[];
}

const StationGraph: FC<StationGraphProps> = ({ stationId, instruments }) => {
  const [parametersName, setParametersName] = useState<string>('');

  const handleChangeParameter = (parameterName: string) => {
    setParametersName(parameterName);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row">
        <ParameterSelect
          stationId={stationId}
          value={parametersName}
          onChange={handleChangeParameter}
        />
      </Stack>
      {parametersName &&
        instruments.map((instrument) => (
          <InstrumentChart
            key={instrument.id}
            instrument={instrument}
            parameterName={parametersName}
          />
        ))}
    </Stack>
  );
};

export { StationGraph };
