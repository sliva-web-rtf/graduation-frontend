import { AcademicProgramsSelect } from '@/entities/AcademicPrograms';
import { TopicRolesSelect } from '@/entities/Roles';
import { isUserStudent } from '@/entities/User';
import { BaseField, BaseSwitch } from '@/shared/ui';
import { BaseLoadingButton } from '@/shared/ui/Button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useCreateTopicMutation } from '../api/topicApi';
import { CreateTopicFormSchema, createTopicFormSchema } from '../models/types/addScientificWorkSchema';

export const CreateTopicForm = memo(() => {
    const isStudent = useSelector(isUserStudent);
    const [createTopic, { isLoading: isCreating }] = useCreateTopicMutation();
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
    const [requiresСompany, requiresSupervisor] = watch(['requiresСompany', 'requiresSupervisor']);

    const onSubmit = async (data: CreateTopicFormSchema) => {
        const transformedData = isStudent ? { ...data, requestedRoles: undefined, role: data.requestedRoles } : data;

        try {
            /* Хак, из-за requestedRoles и role */
            await createTopic(transformedData as never);
            reset();
        } catch (err) {
            /* empty */
        }
    };

    return (
        <Stack component="form" spacing={4} onSubmit={handleSubmit(onSubmit)} width="70vw" maxWidth={900}>
            <Stack spacing={4} direction="row">
                <Stack spacing={2} width="100%" maxWidth={400}>
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
                    <TopicRolesSelect
                        multiple={!isStudent}
                        name="requestedRoles"
                        control={control}
                        label="Роль"
                        defaultValue={[]}
                        error={Boolean(errors.requestedRoles)}
                        helperText={errors.requestedRoles?.message}
                    />
                    <AcademicProgramsSelect
                        multiple
                        name="academicPrograms"
                        control={control}
                        label="Направление подготовки"
                        defaultValue={[]}
                        error={Boolean(errors.academicPrograms)}
                        helperText={errors.academicPrograms?.message}
                    />
                    <Stack spacing={1}>
                        <BaseSwitch {...register('requiresСompany')} label="Тема от предприятия" />
                        {requiresСompany && (
                            <BaseField
                                {...register('companyName')}
                                label="Введите название предприятия"
                                placeholder="ООО Название предприятия"
                                error={Boolean(errors.companyName)}
                                helperText={errors.companyName?.message}
                            />
                        )}
                    </Stack>
                    {requiresСompany && (
                        <Stack spacing={1}>
                            <BaseSwitch {...register('requiresSupervisor')} label="Руководитель от предприятия" />
                            {requiresSupervisor && (
                                <BaseField
                                    {...register('companySupervisorName')}
                                    label="Руководитель/куратор от предприятия"
                                    placeholder="Иванов Иван Иванович"
                                    error={Boolean(errors.companySupervisorName)}
                                    helperText={errors.companySupervisorName?.message}
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
                        {...register('result')}
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
