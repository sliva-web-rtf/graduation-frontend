import { RoutePath } from '@/app/providers/Router';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocalStorageService } from '../helpers/localStorage';

const KEY = 'LAST_VISITED_PATH';
const excludePaths = [RoutePath.Login, RoutePath.NotFound, RoutePath.Forbidden];

export const useRestoreLastPath = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const lastPath = LocalStorageService.get<string>(KEY);

        if (
            lastPath &&
            lastPath !== location.pathname &&
            location.pathname === '/' &&
            !excludePaths.includes(lastPath)
        ) {
            navigate(lastPath, { replace: true });
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        if (!excludePaths.includes(location.pathname)) {
            LocalStorageService.save(KEY, location.pathname);
        }
    }, [location.pathname]);
};
