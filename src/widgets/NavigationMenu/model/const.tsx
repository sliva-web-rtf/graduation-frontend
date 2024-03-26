import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { RoutePath } from 'app/providers/router/config/routeConfig';

export const TABS = [
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
        startIcon: <ChecklistOutlinedIcon />,
    },
];
