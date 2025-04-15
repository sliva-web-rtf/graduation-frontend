import { StudentRowDto } from '../model';
import { StudentRowModel, StudentsTableDto, StudentsTableModel } from '../model/types';

const mapStudentRowDtoToModel = (dto: StudentRowDto, index: number, page: number, size: number): StudentRowModel => {
    return {
        id: dto.id,
        number: page * size + (index + 1),
        student: {
            id: dto.id,
            fullName: dto.fullName,
        },
        academicGroup: dto.academicGroup,
        role: dto.role,
        topic: {
            id: dto.qualificationWork?.id,
            name: dto.qualificationWork?.topic,
        },
        topicStatus: dto.qualificationWork?.status,
        companyName: dto.qualificationWork?.companyName,
        companySupervisorName: dto.qualificationWork?.companySupervisorName,

        supervisor: dto.supervisor
            ? {
                  id: dto.supervisor.id,
                  fullName: dto.supervisor.fullName,
              }
            : undefined,

        status: dto.status,
        data: dto.data,
    };
};

export const mapStudentsTableDtoToModel = (dto: StudentsTableDto, page: number, size: number): StudentsTableModel => {
    return {
        ...dto,
        students: dto.students.map((dto, index) => mapStudentRowDtoToModel(dto, index, page, size)),
    };
};
