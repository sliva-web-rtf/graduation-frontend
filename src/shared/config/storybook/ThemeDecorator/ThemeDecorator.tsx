import { CssBaseline } from '@mui/material';
import { Story } from '@storybook/react';

import ThemeProvider from 'app/providers/ThemeProvider/ui/ThemeProvider';

export const ThemeDecorator = () => (StoryComponent: Story) => (
  <div>
    <CssBaseline />
    <ThemeProvider>
      <StoryComponent />
    </ThemeProvider>
  </div>

);
