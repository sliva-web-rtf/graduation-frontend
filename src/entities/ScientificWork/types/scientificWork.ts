import { WorkStatus } from 'shared/lib/types/workStatus';

export interface ScientificWork {
    readonly id: string;
    readonly name: string;
    readonly title: string;
    readonly limit: number;
    readonly fullness: number;
    readonly scientificInterests: string[];
    readonly workStatus: WorkStatus;
}
