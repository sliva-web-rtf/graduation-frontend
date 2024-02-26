import { Box, TextField } from '@mui/material';
import { BaseButton } from 'shared/ui/Button/Button';
import { BaseField } from 'shared/ui/Field/Field';

const MainPage = () => (
  <Box sx={{ padding: '8px' }}>
    <BaseField multiline />
    <BaseButton variant="shadowed">123</BaseButton>
    Main
  </Box>
);

export default MainPage;
