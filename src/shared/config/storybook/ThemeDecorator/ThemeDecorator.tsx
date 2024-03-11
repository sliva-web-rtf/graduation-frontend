import { CssBaseline, ThemeProvider } from '@mui/material';
import { Story } from '@storybook/react';

import { theme } from 'shared/theme';

export const ThemeDecorator = (story: () => Story) => (
  <div>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      {story()}
    </ThemeProvider>
  </div>
);
