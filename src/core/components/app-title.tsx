import { Link, Typography } from '@mui/material';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router';

import Logo from '@/core/components/logo.svg?react';

interface AppTitleProps {
  collapsed?: boolean;
}

const AppTitle: FC<AppTitleProps> = ({ collapsed = false }) => {
  return (
    <Link
      component={RouterLink}
      to="/"
      underline="none"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <Logo height="32px" width="32px" />
      {!collapsed && (
        <Typography
          variant="h6"
          fontWeight={700}
          color="text.primary"
          fontSize="inherit"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {import.meta.env.VITE_APP_ORGANIZATION}
        </Typography>
      )}
    </Link>
  );
};

export { AppTitle };
