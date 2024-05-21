import { Pagination, PaginationItem, PaginationProps, Stack, styled } from '@mui/material';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { ReactNode } from 'react';

interface NavigationButtonProps {
    children: ReactNode;
}

const NavigationButton = ({ children }: NavigationButtonProps) => (
    <Stack direction="row" spacing={1}>
        {children}
    </Stack>
);

const PrevSlot = () => (
    <NavigationButton>
        <NavigateBeforeRoundedIcon />
        Назад
    </NavigationButton>
);

const NextSlot = () => (
    <NavigationButton>
        Вперед
        <NavigateNextRoundedIcon />
    </NavigationButton>
);

export const StyledPagination = styled((props: PaginationProps) => (
    <Pagination
        shape="rounded"
        renderItem={(item) => <PaginationItem slots={{ previous: PrevSlot, next: NextSlot }} {...item} />}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaginationItem-page, .MuiPaginationItem-previousNext': {
        color: theme.palette.primary.light,
        fontWeight: 600,
    },
    '& .Mui-selected': {
        color: theme.palette.primary.main,
    },
    '& .Mui-disabled': {
        color: 'unset',
    },
    '& .MuiPagination-ul': {
        columnGap: theme.spacing(1),
    },
}));

export const BasePagination = (props: PaginationProps) => (
    <Stack direction="row" justifyContent="center">
        <StyledPagination {...props} />
    </Stack>
);
