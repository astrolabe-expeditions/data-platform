import { ThemedLayout } from '@refinedev/mui';
import type { FC, PropsWithChildren } from 'react';

import { AppTitle } from './app-title';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemedLayout Title={({ collapsed }) => <AppTitle collapsed={collapsed} />}>
      {children}
    </ThemedLayout>
  );
};

export { AppLayout };
