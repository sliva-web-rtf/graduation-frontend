import { useCreatePersonMutation } from '@/entities/Person';
import { UserRolesSelect } from '@/entities/Roles';
import { getFullName } from '@/shared/lib/helpers/getFullName';
import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { BaseButton, BaseField, BaseLoadingButton } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { createPersonFormSchema, CreatePersonFormSchema } from '../model';

const defaultValues: CreatePersonFormSchema = { firstName: '', lastName: '', patronymic: '', role: [] };

export const CreatePersonForm = () => {
    const [createPerson, { isLoading }] = useCreatePersonMutation();
    const { showSnackbar, Snackbar } = useSnackbar();

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreatePersonFormSchema>({
        resolver: zodResolver(createPersonFormSchema),
    });

    const handleReset = () => reset(defaultValues);

    const handleCreatePerson = (data: CreatePersonFormSchema) => {
        const { firstName, lastName, patronymic, role, academicGroup } = data;
        const fullName = getFullName(firstName, lastName, patronymic);

        createPerson({ fullName, role, academicGroup })
            .unwrap()
            .then(() => showSnackbar('success', 'Пользователь успешно создан'))
            .then(handleReset)
            .catch((error) => showSnackbar('error', error.message));
    };

    return (
        <Stack spacing={2} alignItems="flex-start" component="form" onSubmit={handleSubmit(handleCreatePerson)}>
            <Stack spacing={2} direction="row" width="100%">
                <BaseField
                    autoFocus
                    label="Фамилия"
                    {...register('lastName')}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                />
                <BaseField
                    label="Имя"
                    {...register('firstName')}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                />
                <BaseField
                    label="Отчество"
                    {...register('patronymic')}
                    error={Boolean(errors.patronymic)}
                    helperText={errors.patronymic?.message}
                />
            </Stack>
            <Stack spacing={2} direction="row" width="100%">
                <Controller
                    control={control}
                    name="role"
                    render={({ field }) => (
                        <UserRolesSelect
                            {...field}
                            error={Boolean(errors.role)}
                            helperText={errors.role?.message || 'Одна или несколько ролей'}
                        />
                    )}
                />

                <BaseField
                    label="Академическая группа"
                    {...register('academicGroup')}
                    error={Boolean(errors.academicGroup)}
                    helperText={errors.academicGroup?.message || 'Заполняется если роль студент'}
                />
            </Stack>
            <Stack spacing={2} direction="row" width="100%">
                <BaseLoadingButton
                    type="submit"
                    variant="contained"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    loading={isLoading}
                >
                    Создать пользователя
                </BaseLoadingButton>
                <BaseButton type="reset" startIcon={<BackspaceOutlinedIcon />} onClick={handleReset}>
                    Сбросить
                </BaseButton>
            </Stack>

            {Snackbar}
        </Stack>
    );
};
