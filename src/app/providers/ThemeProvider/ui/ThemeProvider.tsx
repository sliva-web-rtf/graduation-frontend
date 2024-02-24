import { FC } from 'react';
import { theme } from 'shared/theme';
import { ThemeProvider as Theme } from '@mui/material';

const ThemeProvider: FC = ({ children }) => (
  <Theme theme={theme}>
    {children}
  </Theme>
);

export default ThemeProvider;
