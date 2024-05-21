import { styled, Tab, TabProps, Tabs, TabsProps, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface BaseTabsProps extends TabsProps {
    children?: ReactNode;
}

interface BaseTabProps extends TabProps {
    to: string;
}

interface TabLabelProps {
    label: string;
    startIcon: ReactNode;
}

const BaseTabs = styled(Tabs)<BaseTabsProps>(() => ({
    '& .MuiTabs-indicator': {
        width: '4px',
    },
}));

const BaseTab = styled(Tab)<BaseTabProps>(({ theme }) => ({
    '&': {
        textTransform: 'none',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopLeftRadius: theme.spacing(1),
        borderBottomLeftRadius: theme.spacing(1),
    },
    '&.Mui-selected': {
        background: theme.palette.secondary.light,
    },
}));

const TabLabel = ({ label, startIcon }: TabLabelProps) => (
    <Typography
        sx={{ display: 'flex', columnGap: (theme) => theme.spacing(1), alignItems: 'center' }}
        variant="body1"
        fontWeight={600}
    >
        {startIcon} {label}
    </Typography>
);

export { BaseTabs, BaseTab, TabLabel };
