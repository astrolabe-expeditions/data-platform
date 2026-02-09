import { type HttpError, useList, useMany, useOne } from '@refinedev/core';

import type { Instrument, Station } from '@/shared/types/models';

const useOneStation = ({ id }: { id: string | undefined }) => {
  const {
    result: station,
    query: { isLoading, isError },
  } = useOne<Station, HttpError>({
    resource: 'stations',
    id: id,
    queryOptions: {
      enabled: !!id,
    },
  });

  const { result: stationInstruments } = useList({
    resource: 'station_has_instruments',
    filters: [
      {
        field: 'station_id',
        operator: 'eq',
        value: id,
      },
    ],
    pagination: { pageSize: 100 },
    queryOptions: {
      enabled: !!id,
    },
  });

  // Get instruments associated with the station
  const instrumentIds =
    stationInstruments?.data?.map((rel) => rel.instrument_id) || [];
  const {
    result: { data: instruments },
    query: { isLoading: isInstrumentsLoading, isError: isInstrumentsError },
  } = useMany<Instrument>({
    resource: 'instruments',
    ids: instrumentIds,
    queryOptions: { enabled: instrumentIds.length > 0 },
  });

  return {
    station: station,
    instruments,
    isLoading: isLoading || !id,
    isError,
    isInstrumentsLoading: isInstrumentsLoading || !id,
    isInstrumentsError,
  };
};

export { useOneStation };
