import { RoutePathType } from '@/app/providers/Router';
import { ReactNode } from 'react';

export type Tab = {
    label: string;
    path: RoutePathType;
    icon: ReactNode;
};
