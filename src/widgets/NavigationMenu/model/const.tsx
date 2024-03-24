import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';

export const TABS = [
  {
    label: 'Каталог',
    path: routeConfig?.Catalog.path ?? '',
    startIcon: <AutoAwesomeMotionOutlinedIcon />,
  },
  {
    label: 'Об исследовании',
    path: routeConfig?.About.path ?? '',
    startIcon: <AppsOutlinedIcon />,
  },
  {
    label: 'Задачи',
    path: routeConfig?.Tasks.path ?? '',
    startIcon: <ChecklistOutlinedIcon />,
  },
];
