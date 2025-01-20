import { Professor } from '@/entities/Professor';
import { ScientificWork } from '@/entities/ScientificWork';
import { Student } from '@/entities/Student';
import { ICatalogCard } from '@/entities/CatalogCard/model/types/ICatalogCard';
import { CatalogOption } from '@/widgets/Catalog';

const getCatalogOption = (dto: Professor | ScientificWork | Student) => {
    if ('workStatus' in dto) {
        return CatalogOption.Themes;
    }
    if ('fullness' in dto) {
        return CatalogOption.Professors;
    }
    return CatalogOption.Students;
};

export const transformDtoForCatalogCard = (dto: Professor | ScientificWork | Student): ICatalogCard => ({
    id: dto.id,
    title: 'name' in dto ? dto.name : `${dto.lastName} ${dto.firstName} ${dto.patronymic}`,
    chips: dto.scientificInterests,
    isFavorite: dto.isFavorite,
    canJoin: 'canJoin' in dto ? dto.canJoin : undefined,
    commandSearching: 'commandSearching' in dto ? dto.commandSearching : undefined,
    professorSearching: 'professorSearching' in dto ? dto.professorSearching : undefined,
    option: getCatalogOption(dto),
    avatarImagePath: 'avatarImagePath' in dto ? dto.avatarImagePath : undefined,
    subtitle: 'degree' in dto ? `${dto.degree}` : undefined,
    status: 'status' in dto ? dto.status : undefined,
    limit: 'limit' in dto ? dto.limit : undefined,
    fullness: 'fullness' in dto ? dto.fullness : undefined,
    workStatus: 'workStatus' in dto ? dto.workStatus : undefined,
});
