import { getUserData, Role } from '@/entities/User';
import { LocalYearForm } from '@/features/year/set-local-year';
import { useSidebar } from '@/shared/lib/hooks/useAppDispatch/useSidebar';
import Logo from '@/shared/ui/Logo/Logo';
import { MenuBar } from '@/widgets/MenuBar';
import { NavigationMenu } from '@/widgets/NavigationMenu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Divider, IconButton, Stack } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
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
                <Logo expanded={expanded} />
                <MenuBar expanded={expanded} />
                <NavigationMenu expanded={expanded} />
            </Stack>
            {isYearVisible && <LocalYearForm />}
            <IconButton
                sx={(theme) => ({
                    position: 'absolute',
                    top: 32,
                    right: -16,
                    background: theme.palette.background.default,
                    width: 32,
                    height: 32,
                })}
                onClick={toggleSidebar}
            >
                {expanded ? <KeyboardArrowLeftIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
            </IconButton>
        </Stack>
    );
});
