import { styled, Tab, TabProps, Tabs, TabsProps, Tooltip, Typography } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface BaseTabsProps extends TabsProps {
    children?: ReactNode;
}

interface BaseTabProps extends TabProps {
    to: string;
    expanded?: boolean;
}

interface TabLabelProps {
    label: string;
    startIcon: ReactElement<any, any>;
    expanded?: boolean;
}

const BaseTabs = styled(Tabs)<BaseTabsProps>(() => ({
    '& .MuiTabs-indicator': {
        width: 0,
    },
}));

const BaseTab = styled(Tab)<BaseTabProps>(({ theme, expanded }) => ({
    '&': {
        minWidth: 0,
        textTransform: 'none',
        alignItems: expanded ? 'flex-start' : 'center',
        justifyContent: 'center',
        borderRadius: theme.spacing(1.5),
    },
    '&:hover, &.Mui-selected': {
        background: theme.palette.background.default,
    },
}));

const TabLabel = ({ label, startIcon, expanded }: TabLabelProps) =>
    expanded ? (
        <Typography
            sx={{ display: 'flex', columnGap: (theme) => theme.spacing(1), alignItems: 'center' }}
            fontWeight={600}
        >
            {startIcon} {label}
        </Typography>
    ) : (
        <Tooltip title={label} placement="right-end">
            {startIcon}
        </Tooltip>
    );

export { BaseTab, BaseTabs, TabLabel };
