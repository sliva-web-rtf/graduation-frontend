import { Components, Theme } from '@mui/material';
import { shadows } from './shadows';

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
                    backgroundColor: 'white',
                    boxShadow: shadows['1'],
                },
            },
        ],
    },
};
