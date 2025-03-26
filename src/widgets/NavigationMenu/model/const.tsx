import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HubIcon from '@mui/icons-material/Hub';
import GroupIcon from '@mui/icons-material/Group';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { Role } from '@/entities/User';
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
        case Role.Professor:
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
