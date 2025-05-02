import { handleCheckboxGroupChange } from '@/shared/lib/helpers/handleCheckboxGroupChange';
import { LocalStorageService } from '@/shared/lib/helpers/localStorage';
import { ChangeEvent } from 'react';
import { CommissionFormSchema, CommissionFormStep } from '../model';

export namespace CommissionStorageService {
    const COMMISSION_STORAGE_KEYS = [
        'COMISSION_INFO',
        'COMMISSION_EXPERTS',
        'COMMISSION_GROUPS',
        'COMMISSION_STUDENTS',
        'CREATE_COMMISSION_STEP',
    ] as const;

    type Key = (typeof COMMISSION_STORAGE_KEYS)[number];
    type Schema = CommissionFormSchema['forms'];

    export function save(key: Key, data: Schema['info' | 'groups' | 'students' | 'experts'] | CommissionFormStep) {
        LocalStorageService.save(key, data);
    }

    export function get(key?: Key): Partial<Schema> {
        if (key) {
            return LocalStorageService.get(key) as any;
        }

        const info = LocalStorageService.get<Schema['info']>('COMISSION_INFO');
        const experts = LocalStorageService.get<Schema['info']>('COMMISSION_EXPERTS');
        const groups = LocalStorageService.get<Schema['groups']>('COMMISSION_GROUPS');
        const students = LocalStorageService.get<Schema['students']>('COMMISSION_STUDENTS');

        return { info, experts, groups, students } as Partial<Schema>;
    }

    export function clear() {
        COMMISSION_STORAGE_KEYS.forEach((key) => LocalStorageService.remove(key));
    }
}

export const getStepFromSearchParams = (searchParams: URLSearchParams): CommissionFormStep => {
    const stepParam = searchParams.get('step');

    return Number(stepParam);
};

const hasError = (isValid: boolean, isTouched: boolean): boolean => {
    return isTouched && !isValid;
};
const hasCompleted = (isValid: boolean, isTouched: boolean): boolean => {
    return isTouched && isValid;
};

export const getStepErrorStatus = (
    step: CommissionFormStep,
    forms: {
        info: { isValid: boolean; isTouched: boolean };
        groups: { isValid: boolean; isTouched: boolean };
        students: { isValid: boolean; isTouched: boolean };
        experts: { isValid: boolean; isTouched: boolean };
    },
): boolean => {
    switch (step) {
        case CommissionFormStep.Info:
            return hasError(forms.info.isValid, forms.info.isTouched);
        case CommissionFormStep.Experts:
            return hasError(forms.experts.isValid, forms.experts.isTouched);
        case CommissionFormStep.Groups:
            return hasError(forms.groups.isValid, forms.groups.isTouched);
        case CommissionFormStep.Students:
            return hasError(forms.students.isValid, forms.students.isTouched);
        default:
            return false;
    }
};

export const getStepCompletedStatus = (
    step: CommissionFormStep,
    forms: {
        info: { isValid: boolean; isTouched: boolean };
        groups: { isValid: boolean; isTouched: boolean };
        students: { isValid: boolean; isTouched: boolean };
        experts: { isValid: boolean; isTouched: boolean };
    },
): boolean => {
    switch (step) {
        case CommissionFormStep.Info:
            return hasCompleted(forms.info.isValid, forms.info.isTouched);
        case CommissionFormStep.Experts:
            return hasCompleted(forms.experts.isValid, forms.experts.isTouched);
        case CommissionFormStep.Groups:
            return hasCompleted(forms.groups.isValid, forms.groups.isTouched);
        case CommissionFormStep.Students:
            return hasCompleted(forms.students.isValid, forms.students.isTouched);
        default:
            return false;
    }
};

export const getCheckboxChangeHandler = (field: any) => (itemId: string) => (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(handleCheckboxGroupChange(e, field.value, itemId));
};
