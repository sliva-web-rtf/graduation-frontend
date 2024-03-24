import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { RequireAuth } from 'app/providers/router/ui/RequireAuth';
import { Layout } from 'pages/Layout';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<div>Loading...</div>}>
        {route.element}
      </Suspense>
    );
    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
      />
    );
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {Object.values(routeConfig).map(renderWithWrapper)}
      </Route>
    </Routes>
  );
};

export default memo(AppRouter);
