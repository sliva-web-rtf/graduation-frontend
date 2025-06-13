import { AcademicGroupSelect } from '@/entities/AcademicGroup';
import { useCreatePersonMutation } from '@/entities/Person';
import { UserRolesSelect } from '@/entities/Roles';
import { Role } from '@/entities/User';
import { getAcademicYear } from '@/entities/Year';
import { generatePassword } from '@/shared/lib/helpers/passwordGenerator';
import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { BaseButton, BaseField, BaseLoadingButton } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { capitalize, IconButton, InputAdornment, Stack, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createPersonFormSchema, CreatePersonFormSchema } from '../model';
import { CreatePersonModal } from './CreatePersonModal';

const defaultValues: CreatePersonFormSchema = {
    firstName: '',
    lastName: '',
    patronymic: '',
    password: '',
    roles: [],
};

export const CreatePersonForm = () => {
    const year = useSelector(getAcademicYear);
    const [modalOpen, setModalOpen] = useState(false);

    const [createPerson, { isLoading }] = useCreatePersonMutation();
    const { showSnackbar, Snackbar } = useSnackbar();

    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm<CreatePersonFormSchema>({
        resolver: zodResolver(createPersonFormSchema),
    });
    const { roles } = useWatch({ control });
    const isStudentRole = roles?.includes(Role.Student);
    const isSupervisorRole = roles?.includes(Role.Supervisor);

    const handleGeneratePassword = async () => {
        setValue('password', generatePassword());
    };
    const handleReset = () => reset(defaultValues);

    const handleCreatePerson = (data: CreatePersonFormSchema) => {
        const { firstName, lastName, patronymic, academicGroup, ...otherData } = data;

        createPerson({
            ...otherData,
            academicGroupId: academicGroup?.value,
            firstName: capitalize(firstName.trim()),
            lastName: capitalize(lastName.trim()),
            patronymic: patronymic ? capitalize(patronymic.trim()) : undefined,
            year,
        })
            .unwrap()
            .then(() => showSnackbar('success', 'Пользователь успешно создан'))
            .then(() => setModalOpen(true))
            .then(handleReset)
            .catch((error) => showSnackbar('error', error.message));
    };

    useEffect(() => {
        if (!isStudentRole) {
            setValue('academicGroup', undefined);
        }

        if (!isSupervisorRole) {
            setValue('supervisorLimits', undefined);
        }
    }, [isStudentRole, isSupervisorRole, setValue]);

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
                    name="roles"
                    render={({ field }) => (
                        <UserRolesSelect
                            {...field}
                            error={Boolean(errors.roles)}
                            helperText={errors.roles?.message || 'Одна или несколько ролей'}
                        />
                    )}
                />
                <BaseField
                    InputLabelProps={{ shrink: true }}
                    label="Пароль"
                    placeholder="Сгенерируйте пароль или придумайте свой"
                    {...register('password')}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message || 'Пример хорошего пароля: S9Scap$iDPRZ'}
                    InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip title="Сгенерировать пароль">
                                    <IconButton onClick={handleGeneratePassword}>
                                        <AutoAwesomeIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        ),
                    }}
                />
                {isStudentRole && (
                    <Controller
                        name="academicGroup"
                        control={control}
                        render={({ field, fieldState }) => (
                            <AcademicGroupSelect
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
                                {...field}
                            />
                        )}
                    />
                )}
                {isSupervisorRole && (
                    <BaseField
                        type="number"
                        label="Лимиты дипломников"
                        {...register('supervisorLimits', { valueAsNumber: true })}
                        error={Boolean(errors.supervisorLimits)}
                        helperText={errors.supervisorLimits?.message}
                    />
                )}
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
                <BaseButton variant="text" type="reset" onClick={handleReset}>
                    Сбросить
                </BaseButton>
            </Stack>
            <CreatePersonModal open={modalOpen} onClose={() => setModalOpen(false)} {...getValues()} />
            {Snackbar}
        </Stack>
    );
};
