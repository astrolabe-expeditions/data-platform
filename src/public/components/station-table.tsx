import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTranslate } from '@refinedev/core';
import { type FC, useState } from 'react';
import type { MapRef } from 'react-map-gl/maplibre';

import type { StationWithCoordinates } from '@/shared/types/models';

interface StationTableProps {
  stations: StationWithCoordinates[];
  isLoading?: boolean;
  mapRef: React.RefObject<MapRef | null>;
}

const rowsPerPage = 100;

const StationTable: FC<StationTableProps> = ({
  stations = [],
  isLoading,
  mapRef,
}) => {
  const t = useTranslate();
  const [page, setPage] = useState(0);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleClickRow = (station: StationWithCoordinates) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [station.long, station.lat],
        zoom: 6,
        essential: true,
      });
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>{t(`stations.fields.name`)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && stations.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography
                    variant="body2"
                    sx={(theme) => ({
                      color: theme.palette.grey[500],
                    })}
                  >
                    {t('public.list.empty')}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {stations
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((station) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={station.id}
                    onClick={() => handleClickRow(station)}
                  >
                    <TableCell align="left">{station.name}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={stations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export { StationTable };
