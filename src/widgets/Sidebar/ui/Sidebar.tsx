import { getUserData, Role } from '@/entities/User';
import { LocalYearForm } from '@/features/year/set-local-year';
import { useSidebar } from '@/shared/lib/hooks/useAppDispatch/useSidebar';
import Logo from '@/shared/ui/Logo/Logo';
import { MenuBar } from '@/widgets/MenuBar';
import { NavigationMenu } from '@/widgets/NavigationMenu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Divider, IconButton, Stack, Tooltip } from '@mui/material';
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
                <NavigationMenu expanded={expanded.toString()} />
            </Stack>
            {isYearVisible && <LocalYearForm />}

            <Tooltip title={expanded ? 'Свернуть меню' : 'Развернуть меню'} placement="right-end">
                <IconButton
                    sx={(theme) => ({
                        position: 'absolute',
                        bottom: theme.spacing(4),
                        right: `-${theme.spacing(2)}`,
                        background: theme.palette.background.default,
                        width: 32,
                        height: 32,
                    })}
                    onClick={toggleSidebar}
                >
                    {expanded ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
                </IconButton>
            </Tooltip>
        </Stack>
    );
});
