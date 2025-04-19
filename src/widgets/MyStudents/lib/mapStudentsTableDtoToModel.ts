import dayjs from 'dayjs';
import { EditStudentRowDto, StudentRowDto, StudentRowModel, StudentsTableDto, StudentsTableModel } from '../model';

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
        studentComment: dto.comment,
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

export const mapStudentRowToDto = (model: StudentRowModel, stage: string): EditStudentRowDto => {
    return {
        stage,
        studentId: model.id,
        role: model.role,
        qualificationWorkStatus: model.topicStatus,
        companyName: model.companyName,
        companySupervisorName: model.companySupervisorName,
        supervisorId: model.supervisor?.id,
        studentComment: model.studentComment,
        studentStatus: model.status,

        // @ts-expect-error
        location: model.location,
        // @ts-expect-error
        date: dayjs(model.date).format('DD-MM-YYYY'),
        // @ts-expect-error
        time: dayjs(model.time).format('HH:mm'),
        // @ts-expect-error
        mark: model.mark,
        // @ts-expect-error
        result: model.result,
        // @ts-expect-error
        comment: model.comment,
        // @ts-expect-error
        isCommand: model.isCommand,
    };
};
