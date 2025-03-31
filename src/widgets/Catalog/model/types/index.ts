import { Professor } from '@/entities/Professor';
import { Student } from '@/entities/Student';
import { TopicCardModel } from '@/entities/Topic';
import { SortDirection } from '@/shared/lib/const';

export enum CatalogOption {
    Supervisors = 'Руководители ВКР',
    Topics = 'Темы',
    Students = 'Студенты',
}

export type CatalogSchema = {
    option: CatalogOption;
    options: CatalogOption[];
    academicProgram: string;
    page: number;
    size: number;
    pagesCount: Record<CatalogOption, number>;
    order: SortDirection;

    query?: string;
    includeOwnedTopics?: boolean;
};

export interface CatalogDto {
    pagesCount: number;
    supervisors?: Professor[];
    topics?: TopicCardModel[];
    students?: Student[];
}

export interface CatalogModel {
    data?: Array<Professor | TopicCardModel | Student>;
    pagesCount: number;
}

export interface CatalogRequest {
    option: CatalogOption;
    params: {
        page: number;
        size: number;
        includeOwnedTopics?: boolean;
        query?: string;
        order?: SortDirection;
    };
}
