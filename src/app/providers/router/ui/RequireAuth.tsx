import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ReactNode, FC } from 'react';

interface RequireAuthProps {
  children: ReactNode,
  isAuth: boolean,
}

export const RequireAuth: FC<RequireAuthProps> = ({ children, isAuth }) => {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();

  if (!auth && isAuth) {
    return <Navigate to={RoutePath.Login} state={{ from: location }} replace />;
  }

  if (auth && !isAuth) {
    return <Navigate to={RoutePath.Main} replace />;
  }

  return (
    <>
      { children }
    </>
  );
};
