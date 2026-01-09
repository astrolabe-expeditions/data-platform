import { useMemo } from 'react';
import { EditButton, List, ShowButton, useDataGrid } from '@refinedev/mui';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import type { Instrument } from '@/shared/types/models';

const ListInstrument = () => {
	const { dataGridProps } = useDataGrid();

	const columns = useMemo<GridColDef<Instrument>[]>(
		() => [
			{
				field: 'id',
				headerName: 'ID',
				type: 'string',
				width: 50,
			},
			{ field: 'identifier', headerName: 'Identifier', minWidth: 200, flex: 1 },
			{ field: 'model_id', headerName: 'Model ID', minWidth: 200, flex: 1 },
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
		<List resource="instruments">
			<DataGrid {...dataGridProps} columns={columns} />
		</List>
	);
};

export { ListInstrument };
