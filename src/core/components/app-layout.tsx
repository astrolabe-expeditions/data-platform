import type { PropsWithChildren, FC } from 'react';
import { ThemedLayout } from '@refinedev/mui';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return <ThemedLayout>{children}</ThemedLayout>;
};

export { AppLayout };
