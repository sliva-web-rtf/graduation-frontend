import { CatalogDto, CatalogModel } from '../../model';

export const mapCatalogDtoToModel = (dto: CatalogDto): CatalogModel => ({
    data: dto.supervisors || dto.topics || dto.students,
    pagesCount: dto.pagesCount,
});
