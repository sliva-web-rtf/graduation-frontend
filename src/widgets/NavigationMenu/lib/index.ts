import { Role } from '@/entities/User';
import { clerkTabs, expertTabs, headClerkTabs, studentTabs, supervisorTabs, Tab } from '../model';

export const getTabsForRoles = (roles: Role[]): Tab[] => {
    const tabsSet = new Set<Tab>();

    roles.forEach((role) => {
        switch (role) {
            case Role.Expert:
                expertTabs.forEach((tab) => tabsSet.add(tab));
                break;
            case Role.Secretary:
                clerkTabs.forEach((tab) => tabsSet.add(tab));
                break;
            case Role.HeadSecretary:
                headClerkTabs.forEach((tab) => tabsSet.add(tab));
                break;
            case Role.Supervisor:
                supervisorTabs.forEach((tab) => tabsSet.add(tab));
                break;
            case Role.Student:
                studentTabs.forEach((tab) => tabsSet.add(tab));
                break;
            case Role.Admin:
                headClerkTabs.forEach((tab) => tabsSet.add(tab));
                studentTabs.forEach((tab) => tabsSet.add(tab));
                break;
            default:
                break;
        }
    });

    return Array.from(tabsSet);
};
