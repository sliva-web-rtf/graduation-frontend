import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
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
    {
        label: 'Об исследовании',
        path: RoutePath.About,
        startIcon: <AppsOutlinedIcon />,
    },
    {
        label: 'Задачи',
        path: RoutePath.Tasks,
        startIcon: <AssignmentOutlinedIcon />,
    },
];
