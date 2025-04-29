import { z } from 'zod';

export enum CommissionFormStep {
    Info,
    Experts,
    Groups,
    Students,
    Submit,
}

export const infoFormSchema = z.object({
    name: z.string().min(3, 'Введите название комиссии'),
    secretary: z.object({ id: z.string(), name: z.string() }, { required_error: 'Выберите ответственного секретаря' }),
    chairperson: z.object({ id: z.string(), name: z.string() }, { required_error: 'Выберите председателя комиссии' }),
});

export const expertsFormSchema = z.record(z.string(), z.array(z.string())).refine(
    (obj) => {
        const values = Object.values(obj);
        // Проверяем, что первый этап (если есть) содержит хотя бы одного эксперта
        if (values.length === 0) return false;
        return Array.isArray(values[0]) && values[0].length > 0;
    },
    {
        message: 'В первом этапе должен быть выбран хотя бы один эксперт',
    },
);

export const groupsFormSchema = z.object({
    academicGroups: z.array(z.string()).min(1),
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
