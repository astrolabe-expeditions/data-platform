import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
} from '@mui/x-data-grid';
import { useGo, useTranslate } from '@refinedev/core';
import { List, useDataGrid } from '@refinedev/mui';
import { useMemo } from 'react';

import type { Dataset, Station } from '@/shared/types/models';

type DatasetWithRelations = Dataset & {
  stations: Station;
};

const ListDataset = () => {
  const go = useGo();
  const t = useTranslate();
  const { dataGridProps } = useDataGrid<DatasetWithRelations>({
    meta: {
      select: '*, stations(*)',
    },
  });

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    go({ to: `/datasets/${params.row.id}` });
  };

  const columns = useMemo<GridColDef<DatasetWithRelations>[]>(
    () => [
      {
        field: 'station',
        headerName: t('datasets.list.station'),
        valueGetter: (_, row) => row.stations?.name || '',
      },
      {
        field: 'period',
        headerName: t('datasets.list.period'),
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
    <List resource="datasets" canCreate>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        onRowClick={handleRowClick}
        rowSelection={false}
      />
    </List>
  );
};

export { ListDataset };
