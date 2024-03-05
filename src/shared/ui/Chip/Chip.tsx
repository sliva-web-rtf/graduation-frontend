import { Chip, ChipProps, styled } from '@mui/material';

export const BaseChip = styled(Chip)<ChipProps>(({ theme }) => ({
  '&': {
    ...theme.typography.subtitle2,
    padding: '4px 14px',
  },
  '&.MuiChip-outlined': {
    borderColor: '#FFC000',
  },
}));
