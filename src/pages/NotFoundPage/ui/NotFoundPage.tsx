import { Box, Typography } from '@mui/material';
import { memo } from 'react';

const NotFoundPage = memo(() => (
  <Box display="flex" sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
    <Typography variant="h2">Страница не найдена</Typography>
  </Box>
));

export default NotFoundPage;
