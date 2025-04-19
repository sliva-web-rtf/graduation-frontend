import { RoutePathType } from '@/app/providers/Router';
import { ReactElement } from 'react';

export type Tab = {
    label: string;
    path: RoutePathType;
    icon: ReactElement<any, any>;
};
