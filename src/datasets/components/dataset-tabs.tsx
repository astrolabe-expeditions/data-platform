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
  const routeMatch = useRouteMatch([
    '/admin/datasets/:id',
    '/admin/datasets/:id/files',
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab
        label={t('datasets.tabs.metadata')}
        value="/admin/datasets/:id"
        to={`/admin/datasets/${datasetId}`}
        component={Link}
      />
      <Tab
        label={t('datasets.tabs.files')}
        value="/admin/datasets/:id/files"
        to={`/admin/datasets/${datasetId}/files`}
        component={Link}
      />
    </Tabs>
  );
};

export { DatasetTabs };
