import { CatalogDto, CatalogModel } from '../../api/types';

export const mapCatalogDtoToModel = (dto: CatalogDto): CatalogModel => ({
    data: dto.professors || dto.scientificWorks || dto.students,
    length: dto.length,
});
