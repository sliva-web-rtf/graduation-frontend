import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Sidebar } from 'widgets/Sidebar';

const Layout: FC = () => (
  <Box className="page-wrapper">
    <Sidebar />
    <Box component="main" py={6}><Outlet /></Box>
  </Box>
);

export default Layout;
