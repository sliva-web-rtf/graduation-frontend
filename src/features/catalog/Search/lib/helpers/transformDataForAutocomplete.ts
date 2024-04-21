import { ScientificAreasDto, ScientificAreasModel } from '../../api/types';

export const transformDtoForAutocomplete = (options: ScientificAreasDto): ScientificAreasModel =>
    options.reduce((acc: ScientificAreasModel, current) => {
        const subsections = current.subsections.map((subsection) => ({
            section: current.section,
            label: subsection,
        }));
        return [...acc, ...subsections];
    }, [] as ScientificAreasModel);
