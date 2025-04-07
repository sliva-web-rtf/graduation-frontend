import { StudentRowDto } from '../model';
import {
    DefenceData,
    FormattingReviewData,
    StudentRowModel,
    StudentsTableDto,
    StudentsTableModel,
} from '../model/types';

const checkFormattingReviewData = (data: DefenceData | FormattingReviewData): data is FormattingReviewData =>
    'documents' in data;

const mapStudentData = (data: DefenceData | FormattingReviewData): DefenceData | FormattingReviewData => {
    if (checkFormattingReviewData(data)) {
        return data;
    }

    return data;
};

const mapStudentRowDtoToModel = (dto: StudentRowDto, index: number): StudentRowModel => {
    return {
        id: index + 1,
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
        data: mapStudentData(dto.data),
    };
};

export const mapStudentsTableDtoToModel = (dto: StudentsTableDto): StudentsTableModel => {
    return {
        ...dto,
        students: dto.students.map((dto, index) => mapStudentRowDtoToModel(dto, index)),
    };
};
