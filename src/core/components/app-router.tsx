import { Authenticated } from '@refinedev/core';
import { AuthPage } from '@refinedev/mui';
import { Navigate, Outlet, Route, Routes } from 'react-router';

import { AppLayout } from '@/core/components/app-layout';
import { DashboardPage } from '@/dashboard/pages';
import { CreateDataset } from '@/datasets/pages/create';
import { ListDataset } from '@/datasets/pages/list';
import { ShowDataset } from '@/datasets/pages/show';
import { ShowDatasetFiles } from '@/datasets/pages/show-files';
import { ListInstrument } from '@/instruments/pages/list';
import { ShowInstrument } from '@/instruments/pages/show';
import { ListModel } from '@/models/pages/list';
import { ListStation } from '@/stations/pages/list';
import { ShowStation } from '@/stations/pages/show';

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
          <Route path=":id/datasets/create" element={<CreateDataset />} />
        </Route>
        <Route path="instruments">
          <Route index element={<ListInstrument />} />
          <Route path=":id" element={<ShowInstrument />} />
        </Route>
        <Route path="datasets">
          <Route index element={<ListDataset />} />
          <Route path=":id" element={<ShowDataset />} />
          <Route path=":id/files" element={<ShowDatasetFiles />} />
          <Route path="new" element={<CreateDataset />} />
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
