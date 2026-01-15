import { Authenticated } from '@refinedev/core';
import { Navigate, Outlet, Route, Routes } from 'react-router';
import { AuthPage } from '@refinedev/mui';

import { ListStation } from '@/stations/pages/list';
import { ListInstrument } from '@/instruments/pages/list';
import { AppLayout } from '@/core/components/app-layout';
import { DashboardPage } from '@/dashboard/pages';
import { ShowStation } from '@/stations/pages/show';
import { ShowInstrument } from '@/instruments/pages/show';
import { CreateSession } from '@/sessions/pages/create';
import { ListSession } from '@/sessions/pages/list';
import { ShowSession } from '@/sessions/pages/show';
import { ListModel } from '@/models/pages/list';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated key="authenticated-routes" redirectOnFail="/login">
            <AppLayout>
              <Outlet />
            </AppLayout>
          </Authenticated>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="stations">
          <Route index element={<ListStation />} />
          <Route path=":id" element={<ShowStation />} />
          <Route path=":id/sessions/create" element={<CreateSession />} />
        </Route>
        <Route path="instruments">
          <Route index element={<ListInstrument />} />
          <Route path=":id" element={<ShowInstrument />} />
        </Route>
        <Route path="sessions">
          <Route index element={<ListSession />} />
          <Route path=":id" element={<ShowSession />} />
          <Route path="new" element={<CreateSession />} />
        </Route>
        <Route path="models">
          <Route index element={<ListModel />} />
        </Route>
      </Route>
      <Route
        element={
          <Authenticated key="auth-pages" fallback={<Outlet />}>
            <Navigate to="/" />
          </Authenticated>
        }
      >
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route
          path="/forgot-password"
          element={<AuthPage type="forgotPassword" />}
        />
        <Route
          path="/update-password"
          element={<AuthPage type="updatePassword" />}
        />
      </Route>
    </Routes>
  );
};

export { AppRouter };
