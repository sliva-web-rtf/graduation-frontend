import { Professor } from 'entities/Professor';
import { ScientificWork } from 'entities/ScientificWork';
import { Student } from 'entities/Student';

export interface CatalogDto {
    readonly length: number;
    readonly professors?: Professor[];
    readonly scientificWorks?: ScientificWork[];
    readonly students?: Student[];
}
