import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';

export const TABS = [
    { label: 'Личный кабинет', path: RoutePath.Profile, startIcon: <PersonOutlineIcon /> },
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
