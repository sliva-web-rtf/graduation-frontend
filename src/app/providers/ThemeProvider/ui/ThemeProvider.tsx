import { ThemeProvider as Theme } from '@mui/material';
import { FC, ReactNode } from 'react';
import { theme } from 'shared/theme';

interface ThemeProviderProps {
  children?: ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => (
  <Theme theme={theme}>
    {children}
  </Theme>
);

export default ThemeProvider;
