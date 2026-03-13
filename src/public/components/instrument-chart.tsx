import { Typography } from '@mui/material';
import { useList, useTranslate } from '@refinedev/core';
import ReactECharts from 'echarts-for-react';
import { type FC, useMemo } from 'react';

import type { Instrument, Measure } from '@/shared/types/models';

interface InstrumentChartProps {
  instrument: Instrument;
  parameterName: string;
}

const InstrumentChart: FC<InstrumentChartProps> = ({
  instrument,
  parameterName,
}) => {
  const t = useTranslate();
  const {
    result: { data: measures },
    query: { status },
  } = useList<Measure>({
    resource: 'measures',
    filters: [
      {
        field: 'instrument_id',
        operator: 'eq',
        value: instrument.id,
      },
    ],
    pagination: {
      pageSize: 500,
    },
  });

  const datetimes = useMemo(
    () => measures.map((m) => new Date(m.recorded_at).toLocaleString()),
    [measures],
  );
  const values = measures[0]?.parameters[parameterName]
    ? measures.map((m) => {
        return m.parameters[parameterName];
      })
    : [];

  const options = {
    xAxis: {
      type: 'category',
      data: datetimes,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: values,
        type: 'line',
        smooth: true,
        color: '#eea200',
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <>
      <Typography variant="h6" component="h2">
        {instrument.serial_number}
      </Typography>
      {status === 'pending' ? (
        <Typography variant="body1" color="text.secondary">
          {t('loading')}
        </Typography>
      ) : !values || values.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          {t('public.graph.empty')}
        </Typography>
      ) : (
        <ReactECharts style={{ width: '100%' }} option={options} />
      )}
    </>
  );
};

export { InstrumentChart };
