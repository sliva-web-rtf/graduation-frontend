import Logo from '@/shared/ui/Logo/Logo';
import { MenuBar } from '@/widgets/MenuBar';
import { NavigationMenu } from '@/widgets/NavigationMenu';
import { Stack } from '@mui/material';
import { memo } from 'react';
import styles from './Sidebar.module.scss';

export const Sidebar = memo(() => (
    <Stack className={styles.wrapper} sx={{ py: 4, px: 2 }} justifyContent="space-between">
        <Stack spacing={4}>
            <Logo />
            <MenuBar />
            <NavigationMenu />
        </Stack>
    </Stack>
));
