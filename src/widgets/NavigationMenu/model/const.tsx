import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';

export const TABS = [
    {
        label: 'Справочник',
        path: RoutePath.Manual,
        startIcon: <BookmarkBorderOutlinedIcon />,
    },
    {
        label: 'Каталог',
        path: RoutePath.Catalog,
        startIcon: <AutoAwesomeMotionOutlinedIcon />,
    },
];
