import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/shared/ui';
import { Layout } from '@/widgets/Layout';
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

        // return <Route key={route.path} path={route.path} element={element} />;
    }, []);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>{' '}
        </Suspense>
    );
};

export default memo(AppRouter);
