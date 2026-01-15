import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/react-router';
import { dataProvider } from '@refinedev/supabase';
import type { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router';
import {
  RefineThemes,
  RefineSnackbarProvider,
  useNotificationProvider,
} from '@refinedev/mui';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';

import { authProvider } from '@/auth/providers/auth-provider';
import { supabaseClient } from '@/core/utils/supabase-client';

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: string) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={RefineThemes.Blue}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerProvider}
            i18nProvider={i18nProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: 'stations',
                list: '/stations',
                show: '/stations/:id',
                edit: '/stations/:id/edit',
                create: '/stations/new',
              },
              {
                name: 'instruments',
                list: '/instruments',
                show: '/instruments/:id',
                edit: '/instruments/:id/edit',
                create: '/instruments/new',
              },
              {
                name: 'sessions',
                list: '/sessions',
                show: '/sessions/:id',
                create: '/sessions/new',
              }
            ]}
          >
            {children}
          </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export { AppProvider };
