import AddIcon from '@mui/icons-material/Add';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupIcon from '@mui/icons-material/Group';
import HubIcon from '@mui/icons-material/Hub';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import { Role } from '@/entities/User';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { Tab } from './types';

const studentTabs: Tab[] = [
    {
        label: 'Мой диплом',
        path: RoutePath.MyDiplom,
        icon: <DescriptionOutlinedIcon />,
    },
    {
        label: 'Выбор темы',
        path: RoutePath.Catalog,
        icon: <ManageSearchOutlinedIcon />,
    },
    {
        label: 'Заявки',
        path: RoutePath.Requests,
        icon: <FormatListBulletedIcon />,
    },
    {
        label: 'Создание темы',
        path: RoutePath.CreateTopic,
        icon: <AddIcon />,
    },
];

const managerTabs: Tab[] = [
    {
        label: 'Мои руководства',
        path: RoutePath.MyGuides,
        icon: <GroupIcon />,
    },
    {
        label: 'Выбор темы',
        path: RoutePath.Catalog,
        icon: <ManageSearchOutlinedIcon />,
    },
    {
        label: 'Заявки',
        path: RoutePath.Requests,
        icon: <FormatListBulletedIcon />,
    },
    {
        label: 'Создание темы',
        path: RoutePath.CreateTopic,
        icon: <AddIcon />,
    },
];

const expertTabs: Tab[] = [
    {
        label: 'Мои студенты',
        path: RoutePath.MyStudents,
        icon: <GroupIcon />,
    },
];

const clerkTabs: Tab[] = [
    ...expertTabs,
    {
        label: 'Заявки',
        path: RoutePath.Requests,
        icon: <FormatListBulletedIcon />,
    },
];

const headClerkTabs: Tab[] = [
    {
        label: 'Комиссии',
        path: RoutePath.Commissions,
        icon: <HubIcon />,
    },
    ...clerkTabs,
];

export const getTabs = (role?: Role) => {
    switch (role) {
        case Role.Student:
            return studentTabs;
        case Role.Supervisor:
            return managerTabs;
        case Role.Expert:
            return expertTabs;
        case Role.Clerk:
            return clerkTabs;
        case Role.HeadClerk:
            return headClerkTabs;
        default:
            return [];
    }
};
