import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GroupIcon from '@mui/icons-material/Group';
import HubIcon from '@mui/icons-material/Hub';
import InboxIcon from '@mui/icons-material/Inbox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Tab } from './types';

const myDiplom = { label: 'Мой диплом', path: RoutePath.MyDiplom, icon: <DescriptionOutlinedIcon /> };
const myTopics = { label: 'Мои темы', path: RoutePath.MyTopics, icon: <WorkOutlineIcon /> };
const myStudents = { label: 'Мои студенты', path: RoutePath.MyStudents, icon: <GroupIcon /> };
const catalog = { label: 'Выбор темы', path: RoutePath.Catalog, icon: <ManageSearchOutlinedIcon /> };
const requests = { label: 'Заявки', path: RoutePath.Requests, icon: <InboxIcon /> };

export const expertTabs: Tab[] = [myStudents];
export const clerkTabs: Tab[] = [...expertTabs, requests];
export const supervisorTabs: Tab[] = [myTopics, catalog, requests];
export const studentTabs: Tab[] = [myDiplom, ...supervisorTabs];
export const headClerkTabs: Tab[] = [
    {
        label: 'Комиссии',
        path: RoutePath.Commissions,
        icon: <HubIcon />,
    },
    ...clerkTabs,
    {
        label: 'Администриров...',
        path: RoutePath.Administration,
        icon: <ManageAccountsIcon />,
    },
];
