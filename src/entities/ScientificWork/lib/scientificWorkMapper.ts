import { ScientificWork } from '../model/types/scientificWork';
import { ScientificWorkDto } from '../model/types/scientificWorkDto';

export const mapScientificWorkDtoToModel = (dto: ScientificWorkDto): ScientificWork => ({
    id: dto.id,
    name: dto.name,
    description: dto.description,
    isFavorite: dto.isFavorite,
    canJoin: dto.canJoin,
    result: dto.result,
    problem: dto.problem,
    limit: dto.limit,
    fullness: dto.fullness,
    scientificInterests: dto.scientificInterests,
    scientificArea: dto.scientificArea,
    workStatus: dto.workStatus,
    professor: dto.professor,
    students: dto.studentDtos,
});
