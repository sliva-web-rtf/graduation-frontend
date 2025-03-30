import { CatalogDto, CatalogModel } from '../../model';

export const mapCatalogDtoToModel = (dto: CatalogDto): CatalogModel => ({
    data: dto.professors || dto.scientificWorks || dto.students,
    length: dto.length,
});
