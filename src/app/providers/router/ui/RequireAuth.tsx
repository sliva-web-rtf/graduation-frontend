import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserAuthData } from 'entities/User';
import { ReactNode, FC, useMemo } from 'react';
import { Role } from 'entities/User/model/types/roles';
import { getUserRoles } from 'entities/User/model/selectors/getUserRoles/getUserRoles';
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

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );
};
