import { TabsProps } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { BaseTab, BaseTabs, TabLabel } from '@/shared/ui';
import { getUserRoles } from '@/entities/User/model/selectors/getUserRoles/getUserRoles';
import { getTabs } from '../model/const';

export const NavigationMenu = memo((props: TabsProps) => {
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const tabs = getTabs(userRoles?.[0]);

    return (
        <BaseTabs orientation="vertical" value={location.pathname} {...props}>
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
