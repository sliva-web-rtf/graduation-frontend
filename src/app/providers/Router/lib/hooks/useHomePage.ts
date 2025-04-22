import { getUserData } from '@/entities/User';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getHomePageByRole } from '../helpers/getHomePageByRole';

export const useHomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector(getUserData);
    const { roles } = user ?? { roles: [] };

    const homePage = useMemo(() => {
        return getHomePageByRole(roles[0]);
    }, [roles]);

    useEffect(() => {
        if (location.pathname === '/') {
            navigate(homePage, { replace: true });
        }
    }, [location.pathname, homePage, navigate]);
};
