import { useMemo } from 'react';
import { List, useDataGrid } from '@refinedev/mui';
import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
} from '@mui/x-data-grid';
import { useGo, useTranslate } from '@refinedev/core';

import type { Session, Station } from '@/shared/types/models';

type SessionWithRelations = Session & {
  stations: Station;
};

const ListSession = () => {
  const go = useGo();
  const t = useTranslate();
  const { dataGridProps } = useDataGrid<SessionWithRelations>({
    meta: {
      'select': '*, stations(*)',
    }
  });

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    go({ to: `/sessions/${params.row.id}` });
  };

  const columns = useMemo<GridColDef<SessionWithRelations>[]>(
    () => [
      {
        field: 'station',
        headerName: t('sessions.list.station'),
        valueGetter: (_, row) => row.stations?.name || '',
      },
      {
        field: 'period',
        headerName: t('sessions.list.period'),
        valueGetter: (_, row) => {
          const start = new Date(row.start_at).toLocaleString();
          const end = new Date(row.end_at).toLocaleString();
          return `${start} - ${end}`;
        },
        flex: 1,
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
