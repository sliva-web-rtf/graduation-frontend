import {
    DefenceData,
    EditStudentRowDto,
    FormattingReviewData,
    StudentRowDto,
    StudentRowModel,
    StudentsTableDto,
    StudentsTableModel,
} from '../model';

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
        comment: dto.comment,
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
        studentComment: model.comment,
        studentStatus: model.status,
        topic: model.topic?.name,

        mark: (model.data as DefenceData).mark,
        result: (model.data as DefenceData).result,
        comment: (model.data as DefenceData).comment,
        isCommand: (model.data as DefenceData).isCommand,
        date: (model.data as DefenceData).date,
        time: (model.data as DefenceData).time,
        location: (model.data as DefenceData).location,
        documents: (model.data as FormattingReviewData).documents,
    };
};
