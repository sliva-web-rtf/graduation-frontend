import { CatalogDto } from '../../model';

type MappedCatalog = Omit<CatalogDto, 'supervisors' | 'topics' | 'students'> & {
    data: CatalogDto['supervisors'] | CatalogDto['topics'] | CatalogDto['students'];
};

export const mapCatalogDtoToModel = (dto: CatalogDto): MappedCatalog => ({
    data: dto.supervisors || dto.topics || dto.students,
    pagesCount: dto.pagesCount,
});
