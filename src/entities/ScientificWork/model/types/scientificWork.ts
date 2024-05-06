import { WorkStatus } from 'entities/ScientificWork';
import { Professor } from 'entities/Professor';

export interface ScientificWork {
    readonly id: string;
    readonly name: string;
    readonly title: string;
    readonly description: string;
    readonly result: string;
    readonly problem: string;
    readonly limit: number;
    readonly fullness: number;
    readonly scientificInterests: Array<string>;
    readonly scientificArea: Array<string>;
    readonly workStatus: WorkStatus;
    readonly professor: Professor;
}
