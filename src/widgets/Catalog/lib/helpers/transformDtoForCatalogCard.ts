import { ICatalogCard } from '@/entities/CatalogCard/model/types/ICatalogCard';
import { Professor } from '@/entities/Professor';
import { Student } from '@/entities/Student';
import { TopicCardModel } from '@/entities/Topic';

type CatalogCardDto = Professor | TopicCardModel | Student;
type TransformedCatalogCard = Omit<ICatalogCard, 'option'>;

export const transformDtoForCatalogCard = (dto: CatalogCardDto): TransformedCatalogCard => ({
    id: dto.id,
    // eslint-disable-next-line no-nested-ternary
    subtitle: 'owner' in dto ? `от ${dto.owner.name}` : 'degree' in dto ? `${dto.degree}` : '',
    title: 'name' in dto ? dto.name : '',
    description: 'description' in dto ? dto.description : '',
    limit: 'limit' in dto ? dto.limit : undefined,
    fullness: 'fullness' in dto ? dto.fullness : undefined,
});
