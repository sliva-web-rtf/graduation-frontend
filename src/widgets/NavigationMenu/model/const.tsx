import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GroupIcon from '@mui/icons-material/Group';
import InboxIcon from '@mui/icons-material/Inbox';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { Tab } from './types';

const stages = { label: 'Этапы ВКР', path: RoutePath.Stages, icon: <ClearAllIcon /> };
const myDiplom = { label: 'Мой диплом', path: RoutePath.MyDiplom, icon: <DescriptionOutlinedIcon /> };
const myTopics = { label: 'Мои темы', path: RoutePath.MyTopics, icon: <WorkOutlineIcon /> };
const myStudents = { label: 'Мои студенты', path: RoutePath.MyStudents, icon: <GroupIcon /> };
const catalog = { label: 'Выбор темы', path: RoutePath.Catalog, icon: <ManageSearchOutlinedIcon /> };
const requests = { label: 'Заявки', path: RoutePath.Requests, icon: <InboxIcon /> };
const commissions = { label: 'Комиссии', path: RoutePath.Commissions, icon: <WorkspacesIcon /> };
const administration = { label: 'Администрир...', path: RoutePath.Administration, icon: <SettingsIcon /> };

export const expertTabs: Tab[] = [stages];
export const clerkTabs: Tab[] = [...expertTabs, requests, commissions];
export const supervisorTabs: Tab[] = [myStudents, myTopics, catalog, requests];
export const studentTabs: Tab[] = [myDiplom, myTopics, catalog, requests];
export const headClerkTabs: Tab[] = [...clerkTabs, administration];
