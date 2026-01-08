import { Authenticated } from '@refinedev/core';
import { Navigate, Outlet, Route, Routes } from 'react-router';
import { AuthPage } from '@refinedev/mui';

import { ListStation } from '@/stations/pages/list';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated key="authenticated-routes" redirectOnFail="/login">
            <Outlet />
          </Authenticated>
        }
      >
        <Route index element={<ListStation />} />
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
