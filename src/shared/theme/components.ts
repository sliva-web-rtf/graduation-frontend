import { Components, Theme } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import shadows from '@mui/material/styles/shadows';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    shadowed: true;
  }
}

export const components: Components<Omit<Theme, 'components'>> | undefined = {
  MuiButton: {
    variants: [
      {
        props: { variant: 'shadowed' },
        style: {
          boxShadow: shadows['4'],
        },
      },

    ],
  },
};
