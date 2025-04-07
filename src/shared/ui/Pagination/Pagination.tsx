import { Pagination, PaginationItem, PaginationProps, Stack, styled } from '@mui/material';

export const StyledPagination = styled((props: PaginationProps) => (
    <Pagination shape="rounded" renderItem={(item) => <PaginationItem {...item} />} {...props} />
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
    <Stack direction="row" justifyContent="center" width="100%">
        <StyledPagination {...props} size="small" />
    </Stack>
);
