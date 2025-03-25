import { ScientificAreaDto } from '@/entities/Directions/api/types';

export const getFormattedScientificArea = (sections: ScientificAreaDto[] | undefined) => {
    if (!sections?.length) {
        return 'Пусто';
    }
    let result = '';
    sections.forEach((section, index) => {
        result += `${index + 1}. ${section.section}\n`;
        section.subsections.forEach((subsection, subIndex) => {
            result += `       ${index + 1}.${subIndex + 1} ${subsection}\n`;
        });
    });
    return result;
};
