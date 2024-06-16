import { WorkStatus } from '@/entities/ScientificWork';
import { Professor } from '@/entities/Professor';
import { Student } from '@/entities/Student';
import { ScientificAreaDto } from '@/entities/ScientificAreas/api/types';

export interface ScientificWork {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly isFavorite: boolean;
    readonly canJoin: boolean;
    readonly result: string;
    readonly problem: string;
    readonly limit: number;
    readonly fullness: number;
    readonly scientificInterests: Array<string>;
    readonly scientificArea: ScientificAreaDto[];
    readonly workStatus: WorkStatus;
    readonly professor: Professor;
    readonly students: Array<Student>;
}
