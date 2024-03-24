import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { Sidebar } from 'widgets/Sidebar';

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <Box className="page-wrapper">
    <Sidebar />
    <Box component="main" py={6}>{children}</Box>
  </Box>
);

export default Layout;
