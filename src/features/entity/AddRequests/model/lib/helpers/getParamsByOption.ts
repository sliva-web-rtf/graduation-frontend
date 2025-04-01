import { CatalogOption } from '@/widgets/Catalog';

export const getParamsByOption = (option: CatalogOption) => {
    let endpoint = 'student';
    let param = 'studentId';

    switch (option) {
        case CatalogOption.Supervisors:
            endpoint = 'professor';
            param = 'professorId';
            break;
        case CatalogOption.Topics:
            endpoint = 'scientific-work';
            param = 'scientificWorksId';
            break;
        default:
            break;
    }

    return {
        endpoint: `add-${endpoint}-to-favorites`,
        param,
    };
};
