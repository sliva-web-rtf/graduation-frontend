import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { BaseLoadingButton } from '@/shared/ui/Button/Button';
import { BaseField, BaseSelect, BaseSwitch } from '@/shared/ui';
import { topicRoles } from '@/shared/lib/const';
import { useAddNewScientificWorkMutation } from '../api/newScientificWorkApi';
import { CreateTopicFormSchema, createTopicFormSchema } from '../models/types/addScientificWorkSchema';

export const CreateTopicForm = memo(() => {
    const [addNewScientificWork, { isLoading: isCreating }] = useAddNewScientificWorkMutation();
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
        reset,
        watch,
    } = useForm<CreateTopicFormSchema>({
        resolver: zodResolver(createTopicFormSchema),
    });
    const [isEnterpriseTopic, isEnterpriseManager] = watch(['isEnterpriseTopic', 'isEnterpriseManager']);

    const onSubmit = async (data: CreateTopicFormSchema) => {
        alert('@todo');

        // try {
        //     await addNewScientificWork({
        //         ...data,
        //         isEducator: true,
        //     });
        //     reset();
        // } catch (err) {
        //     /* empty */
        // }
    };

    return (
        <Stack component="form" spacing={4} onSubmit={handleSubmit(onSubmit)} width="100%" maxWidth={900}>
            <Stack spacing={4} direction="row">
                <Stack spacing={2} width="100%">
                    <BaseField
                        autoFocus
                        {...register('name')}
                        label="Название темы"
                        placeholder="Разработка клиентской части плафтормы по сопровождению защит ВКР"
                        multiline
                        rows={2}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                    />
                    <BaseSelect
                        name="role"
                        control={control}
                        label="Роль"
                        options={topicRoles}
                        error={Boolean(errors.role)}
                        helperText={errors.role?.message}
                    />
                    <Stack spacing={1}>
                        <BaseSwitch {...register('isEnterpriseTopic')} label="Тема от предприятия" />
                        {isEnterpriseTopic && (
                            <BaseField
                                {...register('enterprise')}
                                label="Введите название предприятия"
                                placeholder="ООО Название предприятия"
                                error={Boolean(errors.enterprise)}
                                helperText={errors.enterprise?.message}
                            />
                        )}
                    </Stack>
                    {isEnterpriseTopic && (
                        <Stack spacing={1}>
                            <BaseSwitch {...register('isEnterpriseManager')} label="Руководитель от предприятия" />
                            {isEnterpriseManager && (
                                <BaseField
                                    {...register('enterpriseManager')}
                                    label="Руководитель/куратор от предприятия"
                                    placeholder="Иванов Иван Иванович"
                                    error={Boolean(errors.enterpriseManager)}
                                    helperText={errors.enterpriseManager?.message}
                                />
                            )}
                        </Stack>
                    )}
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
                        error={Boolean(errors.result)}
                        helperText={errors.result?.message}
                    />
                </Stack>
            </Stack>
            <BaseLoadingButton type="submit" variant="contained" sx={{ alignSelf: 'end' }} loading={isCreating}>
                Создать тему
            </BaseLoadingButton>
        </Stack>
    );
});
