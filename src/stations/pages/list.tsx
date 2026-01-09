import { useMemo } from 'react';
import { EditButton, List, ShowButton, useDataGrid } from '@refinedev/mui';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

const ListStation = () => {
  const { dataGridProps } = useDataGrid();

  const columns = useMemo<GridColDef<IStation>[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        type: 'string',
        width: 50,
      },
      { field: 'name', headerName: 'Name', minWidth: 300, flex: 1 },
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

interface IStation {
  id: string;
  name: string;
}
