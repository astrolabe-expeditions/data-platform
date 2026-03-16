import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useTranslate } from '@refinedev/core';
import { List, useDataGrid } from '@refinedev/mui';
import { useMemo } from 'react';

import type { Campaign } from '@/shared/types/models';

const ListCampaign = () => {
  const t = useTranslate();
  const { dataGridProps } = useDataGrid();

  const columns = useMemo<GridColDef<Campaign>[]>(
    () => [
      {
        field: 'name',
        headerName: t('campaigns.fields.name'),
      },
      {
        field: 'description',
        headerName: t('campaigns.fields.description'),
        flex: 1,
      },
    ],
    [t],
  );

  return (
    <List resource="campaigns">
      <DataGrid {...dataGridProps} columns={columns} rowSelection={false} />
    </List>
  );
};

export { ListCampaign };
