import { useMemo } from 'react';
import { List, useDataGrid } from '@refinedev/mui';
import { DataGrid, type GridColDef, type GridEventListener } from '@mui/x-data-grid';

import type { Instrument } from '@/shared/types/models';
import { useGo } from '@refinedev/core';

const ListInstrument = () => {
  const go = useGo();
  const { dataGridProps } = useDataGrid();

  const columns = useMemo<GridColDef<Instrument>[]>(
    () => [
      { field: 'identifier', headerName: 'Identifier', minWidth: 200 },
      { field: 'model_id', headerName: 'Model ID', minWidth: 200, flex: 1 },
    ],
    [],
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
