import { FC, ReactNode } from 'react';
import { GlobalStyles, ThemeProvider as Theme } from '@mui/material';
import { theme } from '@/shared/theme';

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => (
    <Theme theme={theme}>
        <GlobalStyles styles={{ body: { backgroundColor: 'var(--bg-color)' } }} />
        {children}
    </Theme>
);

export default ThemeProvider;
