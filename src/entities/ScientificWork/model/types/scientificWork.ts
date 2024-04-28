import { WorkStatus } from 'entities/ScientificWork';

export interface ScientificWork {
    readonly id: string;
    readonly name: string;
    readonly title: string;
    readonly limit: number;
    readonly fullness: number;
    readonly scientificInterests: Array<string>;
    readonly workStatus: WorkStatus;
}
