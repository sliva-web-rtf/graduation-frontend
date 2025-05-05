import { AcademicGroup } from '@/entities/AcademicGroup';
import { CommissionModel } from '@/entities/Comission';

export type StudentsRequest = {
    page: number;
    size: number;
    stage: string;

    query?: string;
    sortByAcademicGroups?: string[];
    commissionId?: string | null;
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
