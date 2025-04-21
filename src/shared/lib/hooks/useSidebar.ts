import { LocalStorageService } from '@/shared/lib/helpers/localStorage';
import { useCallback, useEffect, useMemo, useState } from 'react';

const SIDEBAR_KEY = 'SIDEBAR_EXPANDED';

export const useSidebar = () => {
    const [expanded, setExpanded] = useState<boolean>(() => {
        const savedValue = LocalStorageService.get(SIDEBAR_KEY);

        return savedValue !== 'false';
    });

    useEffect(() => {
        LocalStorageService.save(SIDEBAR_KEY, expanded.toString());
    }, [expanded]);

    const toggleSidebar = useCallback(() => {
        setExpanded((prev) => !prev);
    }, []);

    const value = useMemo(() => ({ expanded, toggleSidebar }), [expanded, toggleSidebar]);

    return value;
};
