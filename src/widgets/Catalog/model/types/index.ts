import { Professor } from '@/entities/Professor';
import { Student } from '@/entities/Student';
import { ScientificWork } from '@/entities/Topic';
import { SortDirection } from '@/shared/lib/const';

export enum CatalogOption {
    Supervisors = 'Руководители ВКР',
    Topics = 'Темы',
    Students = 'Студенты',
}

export type CatalogSchema = {
    search: string;
    option: CatalogOption;
    options: CatalogOption[];
    direction: string;
    directions: string[];
    page: number;
    pageSize: number;
    pagesCount: Record<CatalogOption, number>;
    order: SortDirection;
    includeOwnedTopics: boolean;
};

export interface CatalogDto {
    readonly length: number;
    readonly professors?: Professor[];
    readonly scientificWorks?: ScientificWork[];
    readonly students?: Student[];
}

export interface CatalogModel {
    readonly data?: Array<Professor | ScientificWork | Student>;
    readonly length: number;
}

export interface CatalogRequest {
    option: CatalogOption;
    params: {
        search: string;
        page: number;
        pageSize: number;
        includeOwnedTopics: boolean;
        order: SortDirection;
    };
}
