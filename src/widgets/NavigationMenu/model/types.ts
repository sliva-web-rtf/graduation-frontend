import { ReactNode } from 'react';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';

export type Tab = {
    label: string;
    path: (typeof RoutePath)[keyof typeof RoutePath];
    icon: ReactNode;
};
