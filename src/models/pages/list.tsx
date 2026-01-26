import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
} from '@mui/x-data-grid';
import { useGo, useTranslate } from '@refinedev/core';
import { List, useDataGrid } from '@refinedev/mui';
import { useMemo } from 'react';

import type { Model } from '@/shared/types/models';

const ListModel = () => {
  const go = useGo();
  const t = useTranslate();
  const { dataGridProps } = useDataGrid();

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    go({ to: `/models/${params.row.id}` });
  };

  const columns = useMemo<GridColDef<Model>[]>(
    () => [
      {
        field: 'name',
        headerName: t('models.fields.name'),
        valueGetter: (value, row) => {
          return `${value} (${row.code})`;
        },
        flex: 1,
      },
    ],
    [t],
  );

  return (
    <List resource="models">
      <DataGrid
        {...dataGridProps}
        columns={columns}
        onRowClick={handleRowClick}
        rowSelection={false}
      />
    </List>
  );
};

export { ListModel };
