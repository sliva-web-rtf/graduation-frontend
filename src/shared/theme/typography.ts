import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Palette } from '@mui/material';

export const typography: TypographyOptions | ((palette: Palette) => TypographyOptions) | undefined = {
  fontFamily: [
    'Manrope',
    'Geologica',
    'sans-serif',
  ].join(','),
  h1: {
    fontSize: '32px',
    fontWeight: '600',
    lineHeight: '110%',
    letterSpacing: '0',
  },
  h2: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '110%',
    letterSpacing: '0',
  },
  h3: {
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '110%',
    letterSpacing: '1%',
  },
  h4: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '110%',
    letterSpacing: '1%',
  },
  subtitle1: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '110%',
    letterSpacing: '0',
  },
  subtitle2: {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '110%',
    letterSpacing: '0',
  },
  body2: {
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '140%',
    letterSpacing: '0',
  },
  body1: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '140%',
    letterSpacing: '0',
  },
};
