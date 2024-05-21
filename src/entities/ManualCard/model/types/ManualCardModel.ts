import { ReactNode } from 'react';

export interface ManualCardModel {
    readonly id: string;
    readonly icon: ReactNode;
    readonly title: string;
    readonly description: string;
}
