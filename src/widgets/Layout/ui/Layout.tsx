import { Sidebar } from '@/widgets/Sidebar';
import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
    <Box className="page-wrapper">
        <Sidebar />
        <Box component="main" py={4}>
            {children}
        </Box>
    </Box>
);

export default Layout;
