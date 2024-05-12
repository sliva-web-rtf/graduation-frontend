import { Professor } from 'entities/Professor';
import { ScientificWork } from 'entities/ScientificWork';
import { Student } from 'entities/Student';

export interface CatalogDto {
    readonly length: number;
    readonly professors?: Array<Professor>;
    readonly scientificWorks?: Array<ScientificWork>;
    readonly students?: Array<Student>;
}
