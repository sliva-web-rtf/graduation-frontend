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
    secretary: z
        .object({
            id: z.string(),
            name: z.string(),
        })
        .refine((secretary) => secretary.id, {
            message: 'Выберите ответственного секретаря',
        }),
    chairperson: z
        .object({
            id: z.string(),
            name: z.string(),
        })
        .nullable(),
});

export const expertsFormSchema = z.record(
    z.string(),
    z.array(
        z.object({
            id: z.string(),
            isInvited: z.boolean(),
        }),
    ),
);

export const groupsFormSchema = z.object({
    academicGroups: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
            }),
        )
        .min(1),
});

export const studentsFormSchema = z.record(
    z.string(),
    z.array(
        z.object({
            id: z.string(),
            commissionId: z.string().nullable(),
            commissionName: z.string().nullable().nullish(),
        }),
    ),
);

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
    isEditMode: boolean;
};

export type CreateCommissionRequest = {
    name: InfoFormSchema['name'];
    secretaryId: string | null;
    chairpersonId: string | null;
    academicGroups: GroupsFormSchema['academicGroups'][number]['id'][];
    stages: {
        stage: string;
        experts: ExpertsFormSchema[string];
        movedStudents: StudentsFormSchema[string];
    }[];
};

export type CreateCommissionResponse = {
    commissionId: string;
};
