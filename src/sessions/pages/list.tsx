import { useMemo } from 'react';
import { List, useDataGrid } from '@refinedev/mui';
import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
} from '@mui/x-data-grid';
import { useGo, useTranslate } from '@refinedev/core';

import type { Session } from '@/shared/types/models';

const ListSession = () => {
  const go = useGo();
  const t = useTranslate();
  const { dataGridProps } = useDataGrid();

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    go({ to: `/sessions/${params.row.id}` });
  };

  const columns = useMemo<GridColDef<Session>[]>(
    () => [
      {
        field: 'id',
        headerName: t('sessions.fields.id'),
      },
      {
        field: 'station',
        headerName: t('sessions.fields.station'),
      },
      {
        field: 'dateRange',
        headerName: t('sessions.fields.dateRange'),
      },
    ],
    [t],
  );

  return (
    <List resource="sessions" canCreate>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        onRowClick={handleRowClick}
        rowSelection={false}
      />
    </List>
  );
};

export { ListSession };
