import { AcademicGroup } from '@/entities/AcademicGroup';
import { CommissionModel } from '@/entities/Comission';

export type StudentRequest = {
    query: string;
    page: number;
    size: number;
    stage: string;
};

export type StudentDto = {
    id: string;
    fullName: string;
    academicGroup: Pick<AcademicGroup, 'id' | 'name'>;
    commission: Pick<CommissionModel, 'id' | 'name'>;
};

export type StudentsDto = {
    students: StudentDto[];
    pagesCount: number;
};
