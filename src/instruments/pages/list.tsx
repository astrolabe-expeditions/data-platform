import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
} from '@mui/x-data-grid';
import { useGo, useTranslate } from '@refinedev/core';
import { List, useDataGrid } from '@refinedev/mui';
import { useMemo } from 'react';

import type { Instrument, Model } from '@/shared/types/models';

type InstrumentWithRelations = Instrument & {
  models: Model;
};

const ListInstrument = () => {
  const t = useTranslate();
  const go = useGo();
  const { dataGridProps } = useDataGrid({
    meta: {
      select: '*, models(*)',
    },
  });

  const columns = useMemo<GridColDef<InstrumentWithRelations>[]>(
    () => [
      {
        field: 'serial_number',
        headerName: t('instruments.list.serial_number'),
        minWidth: 200,
      },
      {
        field: 'models',
        headerName: t('instruments.list.model'),
        valueGetter: (_, row) => `${row.models.name} (${row.models.code})`,
        flex: 1,
      },
    ],
    [t],
  );

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    go({ to: `/instruments/${params.row.id}` });
  };

  return (
    <List resource="instruments" canCreate={false}>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        onRowClick={handleRowClick}
        rowSelection={false}
      />
    </List>
  );
};

export { ListInstrument };
