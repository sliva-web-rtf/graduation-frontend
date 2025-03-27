import { Professor } from '@/entities/Professor';
import { ScientificWork } from '@/entities/ScientificWork';
import { Student } from '@/entities/Student';
import { ICatalogCard } from '@/entities/CatalogCard/model/types/ICatalogCard';
import { CatalogOption } from '@/widgets/Catalog';

const getCatalogOption = (dto: Professor | ScientificWork | Student) => {
    if ('workStatus' in dto) {
        return CatalogOption.Topics;
    }
    if ('fullness' in dto) {
        return CatalogOption.Managers;
    }

    return CatalogOption.Students;
};

export const transformDtoForCatalogCard = (dto: Professor | ScientificWork | Student): ICatalogCard => ({
    id: dto.id,
    title: 'name' in dto ? dto.name : `${dto.lastName} ${dto.firstName} ${dto.patronymic}`,
    canJoin: 'canJoin' in dto ? dto.canJoin : true,
    commandSearching: 'commandSearching' in dto ? dto.commandSearching : undefined,
    professorSearching: 'professorSearching' in dto ? dto.professorSearching : undefined,
    option: getCatalogOption(dto),
    subtitle: 'degree' in dto ? `${dto.degree}` : '',
    limit: 'limit' in dto ? dto.limit : undefined,
    fullness: 'fullness' in dto ? dto.fullness : undefined,
    description: 'description' in dto ? dto.description : '',
});
