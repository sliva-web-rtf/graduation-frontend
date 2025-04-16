import { getUserData } from '@/entities/User';
import { BaseTab, BaseTabs, TabLabel } from '@/shared/ui';
import { TabsProps } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { getTabsForRoles } from '../lib';

export const NavigationMenu = memo((props: TabsProps) => {
    const location = useLocation();
    const { user } = useSelector(getUserData);
    const { roles } = user ?? { roles: [] };

    const tabs = getTabsForRoles(roles);
    // const tabs = getTabsForRoles([Role.Admin]);
    const value =
        location.pathname.startsWith('/topics') ||
        location.pathname.startsWith('/students') ||
        location.pathname.startsWith('/supervisors')
            ? '/'
            : `/${location.pathname.split('/')[1]}`;

    return (
        <BaseTabs orientation="vertical" value={value} {...props}>
            {tabs.map((item) => (
                <BaseTab
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    label={<TabLabel label={item.label} startIcon={item.icon} />}
                    value={item.path}
                />
            ))}
        </BaseTabs>
    );
});
