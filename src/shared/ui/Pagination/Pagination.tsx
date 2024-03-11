import {
  styled,
  Pagination,
  PaginationProps, Box, PaginationItem,
} from '@mui/material';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { ReactNode } from 'react';

interface NavigationButtonProps {
  children: ReactNode;
}

const NavigationButton = ({ children }: NavigationButtonProps) => (
  <Box sx={{ display: 'flex', columnGap: '9px' }}>{children}</Box>
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
    renderItem={(item) => (
      <PaginationItem
        slots={{ previous: PrevSlot, next: NextSlot }}
        {...item}
      />
    )}
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
}));

export const BasePagination = (props: PaginationProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}><StyledPagination {...props} /></Box>
);
