import { Box, Typography } from '@mui/material';

const Logo = () => {
  const fontFamily = 'Geologica';
  const variant = 'h1';

  return (
    <Box sx={{ paddingLeft: (theme) => theme.spacing(1) }}>
      <Typography
        fontFamily={fontFamily}
        variant={variant}
        fontWeight={300}
      >
        SCI
        <Typography
          fontFamily={fontFamily}
          variant={variant}
          component="span"
          color={(theme) => theme.palette.primary.main}
        >
          Join
        </Typography>
      </Typography>
    </Box>
  );
};

export default Logo;
