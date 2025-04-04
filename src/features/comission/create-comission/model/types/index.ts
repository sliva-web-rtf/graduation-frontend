import { z } from 'zod';

export enum CommissionFormStep {
    Info,
    Experts,
    Groups,
    Students,
    Submit,
}

export const infoFormSchema = z.object({
    number: z.number({ required_error: 'Введите порядковый номер комисии' }).min(1, 'Введите порядковый номер комисии'),
    name: z.string().min(3, 'Введите название комиссии'),
    clerk: z.string({
        required_error: 'Выберите ответственного секретаря',
    }),
});

export const expertsFormSchema = z.object({
    experts: z.array(z.string()).min(1),
});

export const groupsFormSchema = z.object({
    groups: z.array(z.string()).min(1),
});

export const studentsFormSchema = z.object({
    students: z.array(z.string()).min(1),
});

export const fullFormSchema = infoFormSchema.merge(groupsFormSchema).merge(studentsFormSchema);

export type InfoFormSchema = z.infer<typeof infoFormSchema>;
export type ExpertsFormSchema = z.infer<typeof expertsFormSchema>;
export type GroupsFormSchema = z.infer<typeof groupsFormSchema>;
export type StudentsFormSchema = z.infer<typeof studentsFormSchema>;

export type CommissionFormSchema = {
    step: CommissionFormStep;
    steps: CommissionFormStep[];
    forms: {
        info: {
            data: InfoFormSchema | null;
            isValid: boolean;
            isTouched: boolean;
        };
        experts: {
            data: ExpertsFormSchema | null;
            isValid: boolean;
            isTouched: boolean;
        };
        groups: {
            data: GroupsFormSchema | null;
            isValid: boolean;
            isTouched: boolean;
        };
        students: {
            data: StudentsFormSchema | null;
            isValid: boolean;
            isTouched: boolean;
        };
    };
};
