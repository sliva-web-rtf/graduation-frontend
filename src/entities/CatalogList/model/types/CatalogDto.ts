import { ScientificWork } from 'entities/ScientificWork';
import { Student } from 'entities/Student';
import { Professor } from 'entities/Professor';

export interface CatalogDto {
    readonly length: number;
    readonly professors?: Array<Professor>;
    readonly scientificWorks?: Array<ScientificWork>;
    readonly students?: Array<Student>;
}
