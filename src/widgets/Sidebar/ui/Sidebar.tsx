import { getUserData, Role } from '@/entities/User';
import { LocalYearForm } from '@/features/year/set-local-year';
import Logo from '@/shared/ui/Logo/Logo';
import { MenuBar } from '@/widgets/MenuBar';
import { NavigationMenu } from '@/widgets/NavigationMenu';
import { Stack } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import styles from './Sidebar.module.scss';

export const Sidebar = memo(() => {
    const { user } = useSelector(getUserData);
    const { roles } = user ?? { roles: [] as Role[] };

    const isYearVisible = roles.includes(Role.Clerk) || roles.includes(Role.HeadClerk) || true;

    return (
        <Stack className={styles.wrapper} sx={{ py: 4, px: 2 }} justifyContent="space-between">
            <Stack spacing={4}>
                <Logo />
                <MenuBar />
                <NavigationMenu />
            </Stack>
            {isYearVisible && <LocalYearForm />}
        </Stack>
    );
});
