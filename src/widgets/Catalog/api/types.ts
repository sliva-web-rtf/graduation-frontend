import { Professor } from 'entities/Professor';
import { Student } from 'entities/Student';
import { ScientificWork } from 'entities/ScientificWork';
import { CatalogOptions } from 'shared/lib/types/catalogOptions';

export interface CatalogRequest {
    option: CatalogOptions;
    params: {
        page: number;
        pageSize: number;
        scientificAreaSubsections?: string[];
        scientificInterests?: string[];
    };
}

export interface CatalogDto {
    readonly professors?: Professor[];
    readonly scientificWorks?: ScientificWork[];
    readonly students?: Student[];
    readonly length: number;
}

export interface CatalogModel {
    readonly data?: Professor[] | ScientificWork[] | Student[];
    readonly length: number;
}
