import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseCheckbox, BaseSearch } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, Stack } from '@mui/material';
import { memo, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getCheckboxChangeHandler } from '../../../lib';
import {
    commissionFormActions,
    getCommissionStudentsForm,
    studentsFormSchema,
    StudentsFormSchema,
} from '../../../model';

const items = [
    { id: '1', group: 'РИ-410940', name: 'Иванов Иван Иванович' },
    { id: '2', group: 'РИ-410940', name: 'Петров Петр Петрович' },
    { id: '3', group: 'РИ-410940', name: 'Сидоров Алексей Владимирович' },
    { id: '4', group: 'РИ-410940', name: 'Кузнецова Анна Сергеевна' },
    { id: '5', group: 'РИ-410940', name: 'Смирнов Дмитрий Игоревич' },
    { id: '6', group: 'РИ-410941', name: 'Васильева Екатерина Андреевна' },
    { id: '7', group: 'РИ-410941', name: 'Николаев Максим Олегович' },
    { id: '8', group: 'РИ-410941', name: 'Павлова Ольга Дмитриевна' },
    { id: '9', group: 'РИ-410941', name: 'Федоров Артем Викторович' },
    { id: '10', group: 'РИ-410941', name: 'Григорьева Татьяна Павловна' },
    { id: '11', group: 'РИ-410942', name: 'Белов Александр Сергеевич' },
    { id: '12', group: 'РИ-410942', name: 'Козлова Марина Игоревна' },
    { id: '13', group: 'РИ-410942', name: 'Орлов Иван Николаевич' },
    { id: '14', group: 'РИ-410942', name: 'Андреева Светлана Владимировна' },
    { id: '15', group: 'РИ-410942', name: 'Тихонов Павел Андреевич' },
    { id: '16', group: 'РИ-410943', name: 'Захарова Елена Михайловна' },
    { id: '17', group: 'РИ-410943', name: 'Виноградов Сергей Александрович' },
    { id: '18', group: 'РИ-410943', name: 'Соколова Анастасия Денисовна' },
    { id: '19', group: 'РИ-410943', name: 'Лебедев Артем Витальевич' },
    { id: '20', group: 'РИ-410943', name: 'Егорова Виктория Сергеевна' },
    { id: '21', group: 'РИ-410944', name: 'Морозов Кирилл Олегович' },
    { id: '22', group: 'РИ-410944', name: 'Алексеева Дарья Павловна' },
    { id: '23', group: 'РИ-410944', name: 'Гусев Денис Игоревич' },
    { id: '24', group: 'РИ-410944', name: 'Ковалева Анна Владимировна' },
    { id: '25', group: 'РИ-410944', name: 'Семенов Илья Дмитриевич' },
    { id: '26', group: 'РИ-410945', name: 'Ильина Наталья Алексеевна' },
    { id: '27', group: 'РИ-410945', name: 'Тарасов Владислав Сергеевич' },
    { id: '28', group: 'РИ-410945', name: 'Фомина Елизавета Андреевна' },
    { id: '29', group: 'РИ-410945', name: 'Данилов Антон Павлович' },
    { id: '30', group: 'РИ-410945', name: 'Савельева Ольга Игоревна' },
    { id: '31', group: 'РИ-410946', name: 'Жуков Станислав Викторович' },
    { id: '32', group: 'РИ-410946', name: 'Новикова Ксения Денисовна' },
    { id: '33', group: 'РИ-410946', name: 'Максимов Артур Олегович' },
];

export const CommissionStudentsForm = memo(() => {
    const dispatch = useAppDispatch();
    const { data, isTouched } = useSelector(getCommissionStudentsForm);
    const { control, getValues } = useForm<StudentsFormSchema>({
        defaultValues: data || { students: [] },
        resolver: zodResolver(studentsFormSchema),
    });

    useEffect(() => {
        return () => {
            dispatch(commissionFormActions.updateStudentsForm(getValues()));
        };
    }, [dispatch, getValues, isTouched]);

    return (
        <Stack spacing={2}>
            <BaseSearch />
            <FormControl>
                <Controller
                    name="students"
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
                                        description={item.group}
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
