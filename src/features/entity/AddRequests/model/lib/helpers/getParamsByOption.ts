import { CatalogOptions } from 'entities/CatalogList';

export const getParamsByOption = (option: CatalogOptions) => {
    let endpoint = 'student';
    let param = 'studentId';

    switch (option) {
        case CatalogOptions.Professors:
            endpoint = 'professor';
            param = 'professorId';
            break;
        case CatalogOptions.Themes:
            endpoint = 'scientific-work';
            param = 'scientificWorkId';
            break;
        default:
            break;
    }

    return {
        endpoint: `add-${endpoint}-to-favorites`,
        param,
    };
};
