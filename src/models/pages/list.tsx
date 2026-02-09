import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useTranslate } from '@refinedev/core';
import { List, useDataGrid } from '@refinedev/mui';
import { useMemo } from 'react';

import type { Model } from '@/shared/types/models';

const ListModel = () => {
  const t = useTranslate();
  const { dataGridProps } = useDataGrid();

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
      <DataGrid {...dataGridProps} columns={columns} rowSelection={false} />
    </List>
  );
};

export { ListModel };
