import { ThemedLayout, ThemedTitle } from '@refinedev/mui';
import type { FC, PropsWithChildren } from 'react';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemedLayout
      Title={({ collapsed }) => (
        <ThemedTitle
          collapsed={collapsed}
          text={import.meta.env.VITE_APP_ORGANIZATION}
        />
      )}
    >
      {children}
    </ThemedLayout>
  );
};

export { AppLayout };
