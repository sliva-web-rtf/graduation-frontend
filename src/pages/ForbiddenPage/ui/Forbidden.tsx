import { Box, Typography } from '@mui/material';
import { memo } from 'react';

const ForbiddenPage = memo(() => (
  <Box display="flex" sx={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <Typography variant="h2">У вас нет прав</Typography>
  </Box>
));

export default ForbiddenPage;
