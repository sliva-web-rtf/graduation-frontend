import { ICatalogCard } from '@/entities/CatalogCard/model/types/ICatalogCard';
import { Student } from '@/entities/Student';
import { Professor } from '@/entities/Supervisor';
import { TopicCardModel } from '@/entities/Topic';

type CatalogCardDto = Professor | TopicCardModel | Student;
type TransformedCatalogCard = Omit<ICatalogCard, 'option'>;

const getTitle = (dto: CatalogCardDto): string => {
    if ('fullName' in dto) {
        return dto.fullName;
    }

    if ('name' in dto) {
        return dto.name;
    }

    return '';
};

const getSubtitle = (dto: CatalogCardDto): string => {
    if ('owner' in dto) {
        // @ts-expect-error Бекенд сделал неверное поле name(вместо fullName)
        return `от ${dto.owner.name}`;
    }

    const parts = [];

    if ('academicGroup' in dto && dto.academicGroup) {
        parts.push(dto.academicGroup);
    }

    if ('academicProgram' in dto && dto.academicProgram) {
        parts.push(dto.academicProgram);
    }

    return parts.join(', ');
};

export const transformDtoForCatalogCard = (dto: CatalogCardDto): TransformedCatalogCard => ({
    id: dto.id,
    title: getTitle(dto),
    subtitle: getSubtitle(dto),
    description: 'about' in dto ? dto.about : '',
    limit: 'limit' in dto ? dto.limit : undefined,
    fullness: 'fullness' in dto ? dto.fullness : undefined,
});
