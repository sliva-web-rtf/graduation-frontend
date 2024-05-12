import { Professor } from 'entities/Professor';
import { ScientificWork } from 'entities/ScientificWork';
import { Student } from 'entities/Student';
import { ICatalogCard } from 'entities/CatalogCard/model/types/ICatalogCard';
import { CatalogOptions } from 'entities/CatalogList';

export const transformDtoForCatalogCard = (dto: Professor | ScientificWork | Student): ICatalogCard => ({
    id: dto.id,
    title: 'name' in dto ? dto.name : `${dto.lastName} ${dto.firstName} ${dto.patronymic}`,
    chips: dto.scientificInterests,
    isFavorite: dto.isFavorite,
    canJoin: dto.canJoin,
    option:
        // eslint-disable-next-line no-nested-ternary
        'workStatus' in dto
            ? CatalogOptions.Themes
            : 'fullness' in dto
              ? CatalogOptions.Professors
              : CatalogOptions.Students,
    image: undefined,
    subtitle: 'degree' in dto ? `${dto.degree} ${'post' in dto ? dto.post : ''}` : undefined,
    status: 'status' in dto ? dto.status : undefined,
    limit: 'limit' in dto ? dto.limit : undefined,
    fullness: 'fullness' in dto ? dto.fullness : undefined,
    workStatus: 'workStatus' in dto ? dto.workStatus : undefined,
});
