import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserData } from '@/entities/User';
import { type Role } from '@/entities/User/model/types/role';
import { FC, ReactNode, useMemo } from 'react';
import { RoutePath } from '../config/routeConfig';

interface RequireAuthProps {
    children: ReactNode;
    isAuth: boolean;
    roles?: Role[];
}

export const RequireAuth: FC<RequireAuthProps> = (props) => {
    const { children, isAuth, roles } = props;
    const { user } = useSelector(getUserData);
    const location = useLocation();
    const { roles: userRoles } = user ?? { roles: [] as Role[] };

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    if (!user && isAuth) {
        return <Navigate to={RoutePath.Login} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.Forbidden} state={{ from: location }} replace />;
    }

    if (user && !isAuth) {
        return <Navigate to={location.state?.from ?? RoutePath.Catalog} replace />;
    }

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );
};
