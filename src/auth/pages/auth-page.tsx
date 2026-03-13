import { Box, Link, Typography } from '@mui/material';
import { useTranslate } from '@refinedev/core';
import { AuthPage as RefineAuthPage } from '@refinedev/mui';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router';

interface AuthPageProps {
  type?: 'register' | 'forgotPassword' | 'updatePassword';
}

const AuthPage: FC<AuthPageProps> = ({ type }) => {
  const t = useTranslate();

  return (
    <RefineAuthPage
      type={type}
      loginLink={
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            mt: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" component="span" fontSize="12px">
            {t('pages.register.buttons.haveAccount')}
          </Typography>
          <Link
            ml="4px"
            variant="body2"
            color="primary"
            component={RouterLink}
            underline="none"
            to="/admin/login"
            fontSize="12px"
            fontWeight="bold"
          >
            {t('pages.login.signin')}
          </Link>
        </Box>
      }
      registerLink={
        <Box
          sx={{
            mt: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            textAlign="center"
            variant="body2"
            component="span"
            fontSize="12px"
          >
            {t('pages.login.buttons.noAccount')}
          </Typography>
          <Link
            ml="4px"
            fontSize="12px"
            variant="body2"
            color="primary"
            component={RouterLink}
            underline="none"
            to="/admin/register"
            fontWeight="bold"
          >
            {t('pages.login.signup')}
          </Link>
        </Box>
      }
      forgotPasswordLink={
        <Link
          variant="body2"
          color="primary"
          fontSize="12px"
          component={RouterLink}
          underline="none"
          to="/admin/forgot-password"
        >
          {t('pages.login.buttons.forgotPassword')}
        </Link>
      }
    />
  );
};

export { AuthPage };
