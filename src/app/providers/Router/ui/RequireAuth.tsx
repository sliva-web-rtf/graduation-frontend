import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { FC, ReactNode, useMemo } from 'react';
import { getUserAuthData } from '@/entities/User';
import { type Role } from '@/entities/User/model/types/role';
import { getUserRoles } from '@/entities/User/model/selectors/getUserRoles/getUserRoles';
import { RoutePath } from '../config/routeConfig';

interface RequireAuthProps {
    children: ReactNode;
    isAuth: boolean;
    roles?: Role[];
}

export const RequireAuth: FC<RequireAuthProps> = (props) => {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const { children, isAuth, roles } = props;

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);
    if (!auth && isAuth) {
        return <Navigate to={RoutePath.Login} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.Forbidden} state={{ from: location }} replace />;
    }

    if (auth && !isAuth) {
        return <Navigate to={location.state?.from ?? RoutePath.Catalog} replace />;
    }

    if (auth && !auth?.isRegistrationComplete && !location.pathname.includes(RoutePath.Onboarding)) {
        return <Navigate to={RoutePath.Onboarding} replace />;
    }

    if (auth && auth.isRegistrationComplete && location.pathname.includes(RoutePath.Onboarding)) {
        return <Navigate to={RoutePath.Catalog} replace />;
    }
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );
};
