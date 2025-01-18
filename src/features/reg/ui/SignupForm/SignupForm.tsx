import { memo, useCallback, useState } from 'react';
import { Box, IconButton, InputAdornment, Link, MenuItem, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CancelIcon from '@mui/icons-material/Cancel';
import { BaseAccordion, BaseField, BaseLoadingButton, BaseSelect, HelperText } from '@/shared/ui';
import { signupFormSchema, SignupFormSchema } from '../../model/types/signupFormSchema';
import { useSignupUserMutation } from '@/entities/User/api/userApi';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getCookie } from '@/shared/lib/helpers/getCookie';
import { waitForCookie } from '@/shared/lib/helpers/waitForCookie';

export interface SignupProps {
    className?: string;
}

const SignupForm = memo((props: SignupProps) => {
    const { className } = props;
    const navigate = useNavigate();
    const SignupRoles = {
        student: 'Студент',
        professor: 'Научный руководитель',
    };
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

    const {
        formState: { errors },
        control,
        handleSubmit,
        register,
        setError,
    } = useForm<SignupFormSchema>({
        resolver: zodResolver(signupFormSchema),
    });

    const [signupUser, { isLoading, error }] = useSignupUserMutation();

    const onSubmitHandler = async (data: SignupFormSchema) => {
        const role = data.role === SignupRoles.student ? 'student' : 'professor';
        try {
            const response = await signupUser({ ...data, role }).unwrap();
            document.cookie = `userData=${encodeURIComponent(
                JSON.stringify({ userId: response.userId, email: data.email, role }),
            )}; path=/signup; expires=Fri, 31 Dec 2025 23:59:59 GMT`;
            await waitForCookie('userData');
            navigate('/signup/confirm-email');
        } catch (err: any) {
            if (err?.status === 400 && (err.data as any)?.code === '409') {
                setError('email', {
                    type: 'server',
                    message: 'Этот адрес электронной почты уже зарегистрирован.',
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className={classNames(className)}>
            <Stack spacing={3}>
                <Stack spacing={2} width="100%">
                    <BaseField
                        autoFocus
                        label="Почта"
                        fullWidth
                        autoComplete="false"
                        {...register('email')}
                        error={Boolean(errors.email)}
                        helperText={<HelperText error={errors.email} />}
                    />
                    <BaseField
                        label="Пароль"
                        fullWidth
                        autoComplete="false"
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        error={Boolean(errors.password)}
                        helperText={<HelperText error={errors.password} />}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <BaseSelect
                        options={Object.values(SignupRoles)}
                        name="role"
                        control={control}
                        defaultValue="Студент"
                    />
                </Stack>
                <Stack spacing={1} justifyContent="center" alignItems="center">
                    <BaseLoadingButton
                        disabled={isLoading}
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={(theme) => ({ padding: theme.spacing(1.5) })}
                    >
                        Зарегистрироваться
                    </BaseLoadingButton>
                    <Link
                        component={RouterLink}
                        to="/login"
                        underline="none"
                        sx={{ '&:hover': { textDecoration: 'none' } }}
                    >
                        Я уже зарегистрирован
                    </Link>
                </Stack>
            </Stack>
        </form>
    );
});

export default SignupForm;
