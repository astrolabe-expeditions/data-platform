import { useGo, useTranslate } from '@refinedev/core';
import { List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import type { Dataset } from '@/shared/types/models';
import { MoreMenu } from '@/shared/components/more-menu';

type DatasetListProps = {
  isLoading?: boolean;
  datasets?: Dataset[];
};

export const DatasetList: React.FC<DatasetListProps> = ({
  isLoading,
  datasets,
}) => {
  const t = useTranslate();
  const go = useGo();

  if (isLoading) {
    return <Typography>{t('stations.loading')}</Typography>;
  }

  if (!datasets?.length) {
    return (
      <Box textAlign="center" mt={2}>
        <Typography variant="h6">
          {t('stations.show.datasets.empty')}
        </Typography>
      </Box>
    );
  }

  const menuItems = [
    {
      id: 'view-dataset',
      label: t('stations.show.datasets.actions.view'),
      onClick: (dataset?: Dataset) => {
        if (dataset) {
          go({ to: `/datasets/${dataset.id}` });
        }
      },
      icon: <VisibilityIcon />,
    },
  ];

  return (
    <List>
      {datasets.map((dataset) => (
        <ListItem
          key={dataset.id}
          disableGutters
          secondaryAction={<MoreMenu items={menuItems} current={dataset} />}
        >

          <ListItemText
            primary={t('stations.show.datasets.listItem.primary', {
          start: new Date(dataset.start_at),
          end: new Date(dataset.end_at),
          interpolation: { escapeValue: false }
        })}
          />
        </ListItem>
      ))}
    </List>
  );
};
