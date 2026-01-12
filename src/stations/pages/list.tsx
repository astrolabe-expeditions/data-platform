import { useMemo } from 'react';
import { EditButton, List, ShowButton, useDataGrid } from '@refinedev/mui';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import type { Station } from '@/shared/types/models';
import { Chip } from '@mui/material';

const ListStation = () => {
  const { dataGridProps } = useDataGrid();

  const columns = useMemo<GridColDef<Station>[]>(
    () => [
      { field: 'name', headerName: 'Name', minWidth: 200 },
      {
        field: 'is_mobile',
        headerName: 'Type',
        renderCell: (params) => (
          <Chip
            label={params.value ? 'Mobile' : 'Fixed'}
            color={params.value ? 'primary' : 'secondary'}
          />
        ),
        flex: 1
      },
      {
        field: 'actions',
        headerName: 'Actions',
        display: 'flex',
        renderCell: function render({ row }) {
          return (
            <div>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </div>
          );
        },
        align: 'center',
        headerAlign: 'center',
        minWidth: 80,
      },
    ],
    [],
  );

  return (
    <List resource="stations">
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};

export { ListStation };
