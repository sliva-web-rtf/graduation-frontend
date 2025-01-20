import { ScientificAreaDto } from '../api/types';
import { ScientificArea } from '../model/types';

export const transformScientificAreaFromDto = (options?: ScientificAreaDto[]): ScientificArea[] =>
    options?.flatMap((current) =>
        current?.subsections.map((subsection) => ({
            section: current.section,
            label: subsection,
        })),
    ) ?? [];
