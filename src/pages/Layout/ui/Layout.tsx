import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Sidebar } from 'widgets/Sidebar';

const Layout: FC = () => (
  <Box className="page-wrapper">
    <Sidebar />
    <main className="page-main"><Outlet /></main>
  </Box>
);

export default Layout;
