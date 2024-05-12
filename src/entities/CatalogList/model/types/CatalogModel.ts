import { Professor } from 'entities/Professor';
import { ScientificWork } from 'entities/ScientificWork';
import { Student } from 'entities/Student';

export interface CatalogModel {
    readonly data?: Array<Professor | ScientificWork | Student>;
    readonly length: number;
}
