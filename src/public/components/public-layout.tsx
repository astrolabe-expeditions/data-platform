import { Container } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

import { PublicNavBar } from '@/public/components/public-nav-bar';

interface PublicLayoutProps extends PropsWithChildren {
  isFluid?: boolean;
}

const PublicLayout: FC<PublicLayoutProps> = ({ children, isFluid = false }) => {
  return (
    <>
      <PublicNavBar />
      <Container maxWidth={isFluid ? false : 'lg'} disableGutters={isFluid}>
        {children}
      </Container>
    </>
  );
};

export { PublicLayout };
