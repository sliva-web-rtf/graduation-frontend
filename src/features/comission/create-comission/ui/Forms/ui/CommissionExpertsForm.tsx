import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseCheckbox, BaseSearch } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, Stack } from '@mui/material';
import { memo, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getCheckboxChangeHandler } from '../../../lib';
import { commissionFormActions, expertsFormSchema, ExpertsFormSchema } from '../../../model';
import { getCommissionExpertsForm } from '../../../model/selectors';

const items = [
    { id: '1', name: 'Иванов Иван Иванович' },
    { id: '2', name: 'Петров Петр Петрович' },
    { id: '3', name: 'Сидоров Алексей Владимирович' },
    { id: '4', name: 'Кузнецова Анна Сергеевна' },
    { id: '5', name: 'Смирнов Дмитрий Игоревич' },
    { id: '6', name: 'Васильева Екатерина Андреевна' },
    { id: '7', name: 'Николаев Максим Олегович' },
    { id: '8', name: 'Павлова Ольга Дмитриевна' },
    { id: '9', name: 'Федоров Артем Викторович' },
    { id: '10', name: 'Григорьева Татьяна Павловна' },
    { id: '11', name: 'Белов Александр Сергеевич' },
    { id: '12', name: 'Козлова Марина Игоревна' },
    { id: '13', name: 'Орлов Иван Николаевич' },
    { id: '14', name: 'Андреева Светлана Владимировна' },
    { id: '15', name: 'Тихонов Павел Андреевич' },
    { id: '16', name: 'Захарова Елена Михайловна' },
    { id: '17', name: 'Виноградов Сергей Александрович' },
    { id: '18', name: 'Соколова Анастасия Денисовна' },
    { id: '19', name: 'Лебедев Артем Витальевич' },
    { id: '20', name: 'Егорова Виктория Сергеевна' },
    { id: '21', name: 'Морозов Кирилл Олегович' },
    { id: '22', name: 'Алексеева Дарья Павловна' },
    { id: '23', name: 'Гусев Денис Игоревич' },
    { id: '24', name: 'Ковалева Анна Владимировна' },
    { id: '25', name: 'Семенов Илья Дмитриевич' },
    { id: '26', name: 'Ильина Наталья Алексеевна' },
    { id: '27', name: 'Тарасов Владислав Сергеевич' },
    { id: '28', name: 'Фомина Елизавета Андреевна' },
    { id: '29', name: 'Данилов Антон Павлович' },
    { id: '30', name: 'Савельева Ольга Игоревна' },
    { id: '31', name: 'Жуков Станислав Викторович' },
    { id: '32', name: 'Новикова Ксения Денисовна' },
    { id: '33', name: 'Максимов Артур Олегович' },
];

export const CommissionExpertsForm = memo(() => {
    const dispatch = useAppDispatch();
    const { data } = useSelector(getCommissionExpertsForm);
    const { control, getValues } = useForm<ExpertsFormSchema>({
        defaultValues: data || { experts: [] },
        resolver: zodResolver(expertsFormSchema),
    });

    useEffect(() => {
        return () => {
            dispatch(commissionFormActions.updateExpertsForm(getValues()));
        };
    }, [dispatch, getValues]);

    return (
        <Stack spacing={2}>
            <BaseSearch />
            <FormControl>
                <Controller
                    name="experts"
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
