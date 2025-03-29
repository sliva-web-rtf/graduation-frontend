import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { BaseLoadingButton } from '@/shared/ui/Button/Button';
import { BaseField, BaseSwitch } from '@/shared/ui';
import { useAddNewScientificWorkMutation } from '../api/newScientificWorkApi';
import { AddScientificWorkFormSchema, addScientificWorkFormSchema } from '../models/types/addScientificWorkSchema';

export const CreateTopicForm = memo(() => {
    const [addNewScientificWork, { isLoading: isCreating }] = useAddNewScientificWorkMutation();

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
    } = useForm<AddScientificWorkFormSchema>({
        resolver: zodResolver(addScientificWorkFormSchema),
    });

    const onSubmit = async (data: AddScientificWorkFormSchema) => {
        try {
            await addNewScientificWork({
                ...data,
                isEducator: true,
            });
            reset();
        } catch (err) {
            /* empty */
        }
    };

    return (
        <Stack component="form" spacing={4} onSubmit={handleSubmit(onSubmit)} width={800}>
            <Stack spacing={4} direction="row" width="100%">
                <Stack spacing={2} width="100%">
                    <BaseField
                        autoFocus
                        {...register('name')}
                        label="Название темы"
                        placeholder="Введите название темы ВКР"
                        multiline
                        rows={2}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                    />
                    <BaseField
                        {...register('description')}
                        label="Направление"
                        placeholder="Введите направление подготовки"
                        error={Boolean(errors.description)}
                        helperText={errors.description?.message}
                    />
                    <BaseField
                        {...register('result')}
                        label="Роль"
                        placeholder="Аналитик"
                        error={Boolean(errors.result)}
                        helperText={errors.result?.message}
                    />
                    <Stack spacing={1}>
                        <BaseSwitch label="Тема от предприятия" />
                        <BaseField
                            {...register('result')}
                            label="Введите название предприятия"
                            placeholder="ООО Рога и копыта"
                            error={Boolean(errors.result)}
                            helperText={errors.result?.message}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <BaseSwitch label="Руководитель от предприятия" />
                        <BaseField
                            {...register('result')}
                            label="Руководитель/куратор от предприятия"
                            placeholder="Иванов Иван Иванович"
                            error={Boolean(errors.result)}
                            helperText={errors.result?.message}
                        />
                    </Stack>
                </Stack>
                <Stack spacing={2} width="100%">
                    <BaseField
                        {...register('description')}
                        label="Описание темы"
                        placeholder="Кратко изложите о чем будет работа"
                        multiline
                        rows={5}
                        error={Boolean(errors.description)}
                        helperText={errors.description?.message}
                    />
                    <BaseField
                        {...register('description')}
                        label="Ожидаемые результаты"
                        placeholder="Опишите результаты, которые предполагается достичь в ходе работы"
                        multiline
                        rows={5}
                        error={Boolean(errors.description)}
                        helperText={errors.description?.message}
                    />
                </Stack>
            </Stack>
            <BaseLoadingButton type="submit" variant="contained" sx={{ alignSelf: 'end' }} loading={isCreating}>
                Создать тему
            </BaseLoadingButton>
        </Stack>
    );
});
