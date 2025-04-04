import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseCheckbox, BaseSearch } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, Stack } from '@mui/material';
import { memo, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getCheckboxChangeHandler } from '../../../lib';
import { commissionFormActions, getCommissionGroupsForm, groupsFormSchema, GroupsFormSchema } from '../../../model';

const items = [
    { id: '1', name: 'РИ-410940', academicProgram: 'Программная инженерия' },
    { id: '2', name: 'РИ-410941', academicProgram: 'Программная инженерия' },
    { id: '3', name: 'РИ-410942', academicProgram: 'Программная инженерия' },
    { id: '4', name: 'РИ-410943', academicProgram: 'Программная инженерия' },
    { id: '5', name: 'РИ-410944', academicProgram: 'Программная инженерия' },
    { id: '6', name: 'РИ-410945', academicProgram: 'Программная инженерия' },
    { id: '7', name: 'РИ-410946', academicProgram: 'Прикладная информатика' },
    { id: '8', name: 'РИ-410947', academicProgram: 'Прикладная информатика' },
    { id: '9', name: 'РИ-410948', academicProgram: 'Прикладная информатика' },
    { id: '10', name: 'РИ-410949', academicProgram: 'Прикладная информатика' },
    { id: '11', name: 'РИ-410950', academicProgram: 'Прикладная информатика' },
    { id: '12', name: 'РИ-410950', academicProgram: 'Прикладная информатика' },
    { id: '13', name: 'РИ-410950', academicProgram: 'Прикладная информатика' },
    { id: '14', name: 'РИ-410951', academicProgram: 'Инфоматика и вычислительная техника' },
    { id: '15', name: 'РИ-410952', academicProgram: 'Инфоматика и вычислительная техника' },
    { id: '16', name: 'РИ-410953', academicProgram: 'Инфоматика и вычислительная техника' },
    { id: '17', name: 'РИ-410954', academicProgram: 'Инфоматика и вычислительная техника' },
    { id: '18', name: 'РИ-410954', academicProgram: 'Инфоматика и вычислительная техника' },
    { id: '19', name: 'РИ-410954', academicProgram: 'Инфоматика и вычислительная техника' },
    { id: '20', name: 'РИ-410954', academicProgram: 'Инфоматика и вычислительная техника' },
];

export const CommissionGroupsForm = memo(() => {
    const dispatch = useAppDispatch();
    const { data } = useSelector(getCommissionGroupsForm);
    const { control, getValues } = useForm<GroupsFormSchema>({
        defaultValues: data || { groups: [] },
        resolver: zodResolver(groupsFormSchema),
    });

    useEffect(() => {
        return () => {
            dispatch(commissionFormActions.updateGroupsForm(getValues()));
        };
    }, [dispatch, getValues]);

    return (
        <Stack spacing={2}>
            <BaseSearch />
            <FormControl>
                <Controller
                    name="groups"
                    control={control}
                    render={({ field }) => (
                        <Stack spacing={1}>
                            {items.map((item) => {
                                const handleChange = getCheckboxChangeHandler(field)(item.id);

                                return (
                                    <BaseCheckbox
                                        key={item.id}
                                        label={item.name}
                                        value={item.id}
                                        description={item.academicProgram}
                                        checked={field.value.includes(item.id)}
                                        onChange={handleChange}
                                    />
                                );
                            })}
                        </Stack>
                    )}
                />
            </FormControl>
        </Stack>
    );
});
