import { StudentDto } from '@/entities/Student/model/types';
import { StudentsFormSchema } from '@/features/comission/create-comission/model';
import { ChangeEvent } from 'react';

export type CommissionChangePayload = {
    commissionId: string | null;
    commissionName: string | null;
};

export const fromSelectedGroup = (student: StudentDto, selectedGroups?: string[]) => {
    return selectedGroups?.includes(student.academicGroup.name) ?? false;
};

export const getStudentsChangeHandler = (field: any) => (studentId: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const current = field.value || [];
    if (checked) {
        if (!current.some((student: any) => student.id === studentId)) {
            field.onChange([
                ...current,
                {
                    id: studentId,
                    commissionId: null,
                },
            ]);
        }
    } else {
        field.onChange(current.filter((student: any) => student.id !== studentId));
    }
};

export const getStudentCommissionChangeHandler =
    (field: any) => (studentId: string) => (payload: CommissionChangePayload) => {
        const { commissionId, commissionName } = payload;
        const current = field.value || [];
        if (commissionId === 'null') {
            field.onChange(current.filter((student: any) => student.id !== studentId));
        } else if (!current.some((student: any) => student.id === studentId)) {
            field.onChange([...current, { id: studentId, commissionId, commissionName }]);
        } else {
            field.onChange(
                current.map((student: any) =>
                    student.id === studentId ? { ...student, commissionId, commissionName } : student,
                ),
            );
        }
    };

export const getDefaultStudentsFormValues = (
    stages?: string[],
    data?: StudentsFormSchema | null,
): StudentsFormSchema => {
    return (
        stages?.reduce((acc, st) => {
            const value = data?.[st];
            if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && 'id' in value[0]) {
                acc[st] = value;
            } else {
                acc[st] = [];
            }

            return acc;
        }, {} as StudentsFormSchema) ?? {}
    );
};
