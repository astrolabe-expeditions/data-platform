import type { Instrument } from '@/shared/types/models';
import { Box, Typography, Button, Stack, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { type FC, useState } from 'react';
import { useTranslate } from '@refinedev/core';

const CreateSessionDataset: FC<{ instrument: Instrument }> = ({
  instrument,
}) => {
  const t = useTranslate();
  const [showFields, setShowFields] = useState(false);

  return (
    <Box mt={2}>
      <Stack direction="row" alignItems="center">
        <IconButton
          onClick={() => setShowFields((prev) => !prev)}
          aria-label={showFields ? t('stations.hideFields') : t('stations.showFields')}
          size="small"
        >
          {showFields ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Typography variant="body1" fontWeight="bold">
          {instrument.identifier}
        </Typography>
      </Stack>
      <Box mt={2}>
        {showFields && (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
};

export { CreateSessionDataset };
