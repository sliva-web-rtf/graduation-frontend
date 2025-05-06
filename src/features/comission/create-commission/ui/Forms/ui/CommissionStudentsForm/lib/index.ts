import { StudentDto } from '@/entities/Student/model/types';
import { StudentsFormSchema } from '@/features/comission/create-commission/model';
import { ChangeEvent } from 'react';

export type CommissionChangePayload = {
    commissionId: string | null;
    commissionName?: string | null;
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
                    commissionName: null,
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

type FieldValue = StudentsFormSchema['string'];

export const getStudentsCurrentCommission = (field: any, student: StudentDto) => {
    const { id, commission } = student;
    const find = (field.value as FieldValue)?.find((item) => item.id === id);

    return {
        commissionId: find?.commissionId || commission?.id || null,
        commissionName: find?.commissionName || commission?.name || null,
    };
};

export const getStudentIsDefaultChecked = (
    student: StudentDto,
    commissionId?: string | null,
    editCommissionId?: string | null,
    academicGroups?: string[],
) => {
    const isFromSelectedGroup = fromSelectedGroup(student, academicGroups);
    const isFromEditCommission = Boolean(commissionId) && commissionId === editCommissionId;

    return isFromSelectedGroup || isFromEditCommission;
};

export const getStudentIsChecked = (field: any, student: StudentDto) => {
    const isSelected = (field.value as FieldValue)?.some((item) => item.id === student.id);

    return isSelected;
};

const getIsStudentMoved = (student: StudentDto) => {
    return Boolean(student.commission?.id);
};

export const getStudentDescription = (student: StudentDto) => {
    const isStudentMoved = getIsStudentMoved(student);

    if (!isStudentMoved) {
        return [student.academicGroup?.name];
    }

    return [student.academicGroup?.name, student.prevCommission?.name].filter(Boolean) as string[];
};
