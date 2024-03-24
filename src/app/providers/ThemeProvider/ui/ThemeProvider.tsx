import { FC } from 'react';
import { theme } from 'shared/theme';
import { GlobalStyles, ThemeProvider as Theme } from '@mui/material';

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => (
  <Theme theme={theme}>
    <GlobalStyles styles={{ body: { backgroundColor: 'var(--bg-color)' } }} />
    {children}
  </Theme>
);

export default ThemeProvider;
