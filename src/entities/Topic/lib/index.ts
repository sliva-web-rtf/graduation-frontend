import { ScientificWorkDto, Topic } from '../model/types';

export const mapScientificWorkDtoToModel = (dto: ScientificWorkDto): Topic => ({
    id: dto.id,
    name: dto.topic,
    description: dto.description,
    result: dto.result,
    // workStatus: dto.workStatus,
    supervisor: dto.supervisor,
    student: dto.student,
    owner: dto.owner,
    requestedRole: dto.requestedRole,
});
