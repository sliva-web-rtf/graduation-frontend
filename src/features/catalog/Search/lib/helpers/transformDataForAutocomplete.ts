import { ScientificAreasDto, ScientificAreasModel } from '../../api/types';

export const transformDtoForAutocomplete = (options: ScientificAreasDto): ScientificAreasModel =>
    options.flatMap((current) =>
        current.subsections.map((subsection) => ({
            section: current.section,
            label: subsection,
        })),
    );
