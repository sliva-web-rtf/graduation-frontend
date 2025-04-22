import { PageLoader } from '@/shared/ui';
import { Layout } from '@/widgets/Layout';
import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from '../config/routeConfig';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = route.hasLayout ? <Layout>{route.element}</Layout> : route.element;

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly !== undefined ? (
                        <RequireAuth isAuth={route.authOnly} roles={route.roles}>
                            {element}
                        </RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    }, []);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
        </Suspense>
    );
};

export default AppRouter;
