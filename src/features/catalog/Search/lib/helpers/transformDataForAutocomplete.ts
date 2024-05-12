import { ScientificAreas, ScientificAreasModel } from '../../api/types';

export const transformDtoForAutocomplete = (options: ScientificAreas): ScientificAreasModel =>
    options.flatMap((current) =>
        current.subsections.map((subsection) => ({
            section: current.section,
            label: subsection,
        })),
    );
