import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
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
    { label: 'Личный кабинет', path: RoutePath.Profile, startIcon: <PersonOutlinedIcon /> },
];
