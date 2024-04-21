import { CatalogOptions } from 'shared/lib/types/catalogOptions';

enum Urls {
    Professors = '/api/professor/list-professor',
    ScientificWorks = '/api/scientificWork/list-scientific-works',
    Students = '/api/student/list-students',
}

const URL_MAP = {
    [CatalogOptions.Professors]: Urls.Professors,
    [CatalogOptions.Themes]: Urls.ScientificWorks,
    [CatalogOptions.Students]: Urls.Students,
};

export const getUrl = (option: CatalogOptions): Urls => URL_MAP[option];
