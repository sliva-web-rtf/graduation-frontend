import { ReactNode } from 'react';

export interface ManualCardModel {
    readonly id: number;
    readonly icon: ReactNode;
    readonly title: string;
    readonly url: string;
}
