import { GroupsFormSchema } from '@/features/comission/create-comission/model';
import { ChangeEvent } from 'react';

export const getDefaultGroupsFormValues = (data?: GroupsFormSchema | null): GroupsFormSchema => {
    return {
        academicGroups: data?.academicGroups || [],
    };
};

export const getGroupsChangeHandler =
    (field: any) => (item: { id: string; name: string }) => (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        const current = field.value || [];
        if (checked) {
            if (!current.some((group: any) => group.id === item.id)) {
                field.onChange([...current, { id: item.id, name: item.name }]);
            }
        } else {
            field.onChange(current.filter((group: any) => group.id !== item.id));
        }
    };
