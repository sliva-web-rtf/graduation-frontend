import { ScientificWorkDto, Topic } from '../model/types';

export const mapScientificWorkDtoToModel = (dto: ScientificWorkDto): Topic => ({
    id: dto.id,
    name: dto.name,
    description: dto.description,
    isFavorite: dto.isFavorite,
    canJoin: dto.canJoin,
    result: dto.result,
    problem: dto.problem,
    limit: dto.limit,
    fullness: dto.fullness,
    workStatus: dto.workStatus,
    professor: dto.professor,
    students: dto.studentDtos,
});
