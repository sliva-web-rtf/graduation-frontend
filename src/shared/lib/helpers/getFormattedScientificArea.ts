import { ScientificAreas } from '@/features/catalog/Search/api/types';

export const getFormattedScientificArea = (sections: ScientificAreas | undefined) => {
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
