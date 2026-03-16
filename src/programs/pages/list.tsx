import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useTranslate } from '@refinedev/core';
import { List, useDataGrid } from '@refinedev/mui';
import { useMemo } from 'react';

import type { Program } from '@/shared/types/models';

const ListProgram = () => {
  const t = useTranslate();
  const { dataGridProps } = useDataGrid();

  const columns = useMemo<GridColDef<Program>[]>(
    () => [
      {
        field: 'name',
        headerName: t('programs.fields.name'),
      },
      {
        field: 'description',
        headerName: t('programs.fields.description'),
        flex: 1,
      },
    ],
    [t],
  );

  return (
    <List resource="programs">
      <DataGrid {...dataGridProps} columns={columns} rowSelection={false} />
    </List>
  );
};

export { ListProgram };
