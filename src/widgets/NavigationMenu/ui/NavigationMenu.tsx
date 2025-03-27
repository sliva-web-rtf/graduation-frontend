import { NavLink, useLocation } from 'react-router-dom';
import { memo } from 'react';
import { TabsProps } from '@mui/material';
import { useSelector } from 'react-redux';
import { BaseTabs, BaseTab, TabLabel } from '@/shared/ui/Tabs/Tabs';
import { getTabs } from '../model/const';
import { getUserRoles } from '@/entities/User/model/selectors/getUserRoles/getUserRoles';

export const NavigationMenu = memo((props: TabsProps) => {
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const tabs = getTabs(userRoles?.[0]);

    return (
        <BaseTabs orientation="vertical" indicatorColor="primary" value={location.pathname} {...props}>
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
