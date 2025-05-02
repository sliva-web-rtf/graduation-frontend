import { ChangeEvent } from 'react';
import { ExpertsFormSchema } from '../../../../../model';

export const getExpertChangeHandler =
    (field: any) => (itemId: string, flag?: 'isInvited') => (e: ChangeEvent<HTMLInputElement>) => {
        const current = field.value as { id: string; isInvited: boolean }[];
        if (flag === 'isInvited') {
            field.onChange(
                current.map((item) => (item.id === itemId ? { ...item, isInvited: e.target.checked } : item)),
            );

            return;
        }

        field.onChange(
            e.target.checked
                ? [...current, { id: itemId, isInvited: false }]
                : current.filter((item) => item.id !== itemId),
        );
    };

export const getDefaultExpertsFormValues = (stages?: string[], data?: ExpertsFormSchema | null): ExpertsFormSchema => {
    return (
        stages?.reduce((acc, st) => {
            const value = data?.[st];
            if (
                Array.isArray(value) &&
                value.length > 0 &&
                typeof value[0] === 'object' &&
                'id' in value[0] &&
                'isInvited' in value[0]
            ) {
                acc[st] = value;
            } else {
                acc[st] = [];
            }

            return acc;
        }, {} as ExpertsFormSchema) ?? {}
    );
};
