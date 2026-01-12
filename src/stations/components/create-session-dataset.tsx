import type { Instrument } from '@/shared/types/models';
import { Box, Typography, Button } from '@mui/material';
import type { FC } from 'react';
import { useTranslate } from "@refinedev/core";



const CreateSessionDataset: FC<{ instrument: Instrument }> = ({ instrument }) => {

    const t = useTranslate();

  return (
    <Box>
      <Typography variant="body1" fontWeight="bold">
        { instrument.identifier}
      </Typography>
      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          {t('stations.datasets')}
        </Typography>
        {/* Liste des datasets pour cet instrument et cette session */}
        {/* À remplacer par un vrai fetch des datasets */}
        <Box mb={2}>
          {/* Exemple statique */}
          <Typography variant="body2" color="text.secondary">
            {t('stations.noDatasets')}
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" component="label">
            {t('stations.addDataset')}
            <input type="file" hidden />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { CreateSessionDataset };
