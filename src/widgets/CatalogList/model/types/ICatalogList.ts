import { Professor } from 'entities/Professor';
import { ScientificWork } from 'entities/ScientificWork';
import { Student } from 'entities/Student/types/student';

export interface ICatalogList {
    readonly items: Professor[] | ScientificWork[] | Student[];
}
