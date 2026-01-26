import { Tab, Tabs } from '@mui/material';
import { useTranslate } from '@refinedev/core';
import type { FC } from 'react';
import { Link } from 'react-router';

import { useRouteMatch } from '@/shared/hooks/use-route-match';

interface DatasetTabsProps {
  datasetId: string;
}

const DatasetTabs: FC<DatasetTabsProps> = ({ datasetId }) => {
  const t = useTranslate();
  const routeMatch = useRouteMatch(['/datasets/:id', '/datasets/:id/files']);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab
        label={t('datasets.tabs.metadata')}
        value="/datasets/:id"
        to={`/datasets/${datasetId}`}
        component={Link}
      />
      <Tab
        label={t('datasets.tabs.files')}
        value="/datasets/:id/files"
        to={`/datasets/${datasetId}/files`}
        component={Link}
      />
    </Tabs>
  );
};

export { DatasetTabs };
