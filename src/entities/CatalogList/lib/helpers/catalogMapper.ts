import { CatalogDto } from '../../model/types/CatalogDto';
import { CatalogModel } from '../../model/types/CatalogModel';

export const mapCatalogDtoToModel = (dto: CatalogDto): CatalogModel => ({
    data: dto.professors || dto.scientificWorks || dto.students,
    length: dto.length,
});
