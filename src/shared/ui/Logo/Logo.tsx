import { Typography } from '@mui/material';
import React from 'react';
import { theme } from 'shared/theme';

const Logo = () => (
  <Typography
    sx={{ paddingLeft: theme.spacing(1) }}
    variant="h1"
    fontWeight={300}
  >
    SCI
    <Typography
      variant="h1"
      component="span"
      color={(theme) => theme.palette.primary.main}
    >
      Join
    </Typography>
  </Typography>
);

export default Logo;
