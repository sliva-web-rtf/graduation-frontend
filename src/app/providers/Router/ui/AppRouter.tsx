import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from 'app/providers/Router/ui/RequireAuth';
import { Layout } from 'widgets/Layout';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';
import { AppRoutesProps, routeConfig } from '../config/routeConfig';

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
            <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>{' '}
        </Suspense>
    );
};

export default memo(AppRouter);
