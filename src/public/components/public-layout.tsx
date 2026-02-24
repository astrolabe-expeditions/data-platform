import { Container } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

import { NavBar } from '@/public/components/nav-bar';

interface PublicLayoutProps extends PropsWithChildren {
  isFluid?: boolean;
}

const PublicLayout: FC<PublicLayoutProps> = ({ children, isFluid = false }) => {
  return (
    <>
      <NavBar />
      <Container maxWidth={isFluid ? false : 'lg'} disableGutters={isFluid}>
        {children}
      </Container>
    </>
  );
};

export { PublicLayout };
