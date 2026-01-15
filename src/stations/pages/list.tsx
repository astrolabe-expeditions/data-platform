import { useMemo } from 'react';
import { List, useDataGrid } from '@refinedev/mui';
import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
} from '@mui/x-data-grid';
import { useGo, useTranslate } from '@refinedev/core';

import type { Station } from '@/shared/types/models';
import { Chip } from '@mui/material';

const ListStation = () => {
  const go = useGo();
  const t = useTranslate();
  const { dataGridProps } = useDataGrid();

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    go({ to: `/stations/${params.row.id}` });
  };

  const columns = useMemo<GridColDef<Station>[]>(
    () => [
      { field: 'name', headerName: t('stations.fields.name'), minWidth: 200 },
      {
        field: 'is_mobile',
        headerName: t('stations.fields.type.title'),
        renderCell: (params) => (
          <Chip
            label={
              params.value
                ? t('stations.fields.type.mobile')
                : t('stations.fields.type.fixed')
            }
            color={params.value ? 'primary' : 'secondary'}
          />
        ),
      },
    ],
    [t],
  );

  return (
    <List resource="stations" canCreate={false}>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        onRowClick={handleRowClick}
        rowSelection={false}
      />
    </List>
  );
};

export { ListStation };
