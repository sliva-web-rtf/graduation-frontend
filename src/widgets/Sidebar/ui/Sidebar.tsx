import { getUserData, Role } from '@/entities/User';
import { LocalYearForm } from '@/features/year/set-local-year';
import { useSidebar } from '@/shared/lib/hooks/useSidebar';
import { Logo } from '@/shared/ui';
import { MenuBar } from '@/widgets/MenuBar';
import { NavigationMenu } from '@/widgets/NavigationMenu';

import { RoutePath } from '@/app/providers/Router';
import { ToggleSidebarButton } from '@/features/sidebar/collapse-sidebar';
import { Divider, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

export const Sidebar = memo(() => {
    const { user } = useSelector(getUserData);
    const { roles } = user ?? { roles: [] as Role[] };
    const { expanded, toggleSidebar } = useSidebar();

    const isYearVisible = expanded && roles.includes(Role.Secretary || roles.includes(Role.HeadSecretary));

    return (
        <Stack
            className={[styles.wrapper, expanded ? styles.expanded : ''].join(' ')}
            sx={{ py: 4, px: 2 }}
            justifyContent="space-between"
        >
            <Stack spacing={3} divider={<Divider />}>
                <Stack direction="row" justifyContent={expanded ? 'space-between' : 'center'} alignItems="center">
                    {expanded && <Logo />}
                    <ToggleSidebarButton expanded={expanded} onClick={toggleSidebar} />
                </Stack>
                <MenuBar expanded={expanded} />
                <NavigationMenu expanded={expanded.toString()} />
            </Stack>
            <Stack spacing={2}>
                {isYearVisible && <LocalYearForm />}
                <Typography
                    component={NavLink}
                    to={RoutePath.PrivacyPolicy}
                    color="secondary"
                    fontWeight={600}
                    fontSize={12}
                    sx={{ textDecoration: 'underline' }}
                >
                    Политика конфиденциальности
                </Typography>
            </Stack>
        </Stack>
    );
});
