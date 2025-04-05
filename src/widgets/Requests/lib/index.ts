import { Role } from '@/entities/User';
import { RequestsOption } from '../model/types';

export const getRequestsOptionsForRoles = (roles: Role[]): RequestsOption[] => {
    const optionsSet = new Set<RequestsOption>();

    roles.forEach((role) => {
        switch (role) {
            case Role.Student:
            case Role.Supervisor:
                optionsSet.add(RequestsOption.Incoming);
                optionsSet.add(RequestsOption.Outgoing);
                optionsSet.add(RequestsOption.History);
                break;
            case Role.Clerk:
                optionsSet.add(RequestsOption.Incoming);
                optionsSet.add(RequestsOption.History);
                break;
            default:
                break;
        }
    });

    return Array.from(optionsSet);
};
