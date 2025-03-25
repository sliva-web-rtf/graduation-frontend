import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isUserProfessor } from '@/entities/User';
import {
    useConfirmEmailMutation,
    useRepeatConfirmEmailProfessorMutation,
    useRepeatConfirmEmailStudentMutation,
} from '@/entities/User/api/userApi';
import { CookieService } from '@/shared/lib/helpers/cookieService';
import { getCookie } from '@/shared/lib/helpers/getCookie';
import { BaseButton, BaseField, BaseLoadingButton, HelperText } from '@/shared/ui';
import { oneTimeCodeFormSchema, OneTimeCodeFormSchema } from '../model/types/oneTimeCodeFormSchema';

export const OneTimeCodeForm = () => {
    const [userData, setUserData] = useState(getCookie('userData'));

    useEffect(() => {
        const intervalId = setInterval(() => {
            const updatedData = getCookie('userData');
            if (JSON.stringify(updatedData) !== JSON.stringify(userData)) {
                setUserData(updatedData);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [userData]);

    const { userId, email, role: dataRole } = userData ?? {};

    const navigate = useNavigate();

    const isProfessor = useSelector(isUserProfessor) || dataRole === 'professor';
    const role = isProfessor ? 'professor' : 'student';

    const [confirmEmail, { isLoading }] = useConfirmEmailMutation();

    const useRepeatMutation = isProfessor
        ? useRepeatConfirmEmailProfessorMutation
        : useRepeatConfirmEmailStudentMutation;
    const [repeatConfirmEmail, { isLoading: isRepeatConfirmLoading }] = useRepeatMutation();

    const {
        formState: { errors },
        setError,
        register,
        handleSubmit,
        reset,
    } = useForm<OneTimeCodeFormSchema>({
        resolver: zodResolver(oneTimeCodeFormSchema),
    });

    const onClickRepeatConfirm = async () => {
        if (!userId || !email) {
            setError('code', {
                type: 'server',
                message: 'Не удалось найти идентификатор пользователя или обнаружить почту. Просим обновить страницу.',
            });
            return;
        }

        const curData = isProfessor ? { professorId: userId, email } : { studentId: userId, email };

        try {
            const response = await repeatConfirmEmail(curData).unwrap();
            if (response.succeeded) {
                reset();
            } else {
                setError('code', {
                    type: 'server',
                    message: 'Попробуйте отправить код позже...',
                });
            }
        } catch (err: any) {
            if (err?.status === 500) {
                setError('code', {
                    type: 'server',
                    message: 'Не удалось запросить новый код',
                });
            }
        }
    };

    const onSubmitHandler = async (data: OneTimeCodeFormSchema) => {
        if (!userId) {
            setError('code', {
                type: 'server',
                message: 'Не удалось найти идентификатор пользователя. Просим обновить страницу.',
            });
            return;
        }

        try {
            const response = await confirmEmail({
                confirmCode: data.code,
                role,
                userId,
            }).unwrap();
            if (response.succeeded) {
                CookieService.clear();

                navigate('/login');
            } else {
                setError('code', {
                    type: 'server',
                    message: 'Введен неверный код подтверждения',
                });
            }
        } catch (err: any) {
            if (err?.status === 500) {
                setError('code', {
                    type: 'server',
                    message: 'Что-то не так с вашим кодом',
                });
            }
        }
    };

    return (
        <Stack spacing={3}>
            <Stack spacing={1}>
                <Typography variant="h3" textAlign="center">
                    Введите код подтверждения
                </Typography>
                <Typography textAlign="center">Отправили на почту </Typography>
            </Stack>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Stack spacing={3}>
                    <Stack>
                        <BaseField
                            label="Код"
                            {...register('code')}
                            error={Boolean(errors.code)}
                            helperText={<HelperText error={errors.code} />}
                            inputProps={{
                                maxLength: 6,
                                onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                },
                            }}
                        />
                    </Stack>
                    <Stack justifyContent="space-between">
                        <BaseLoadingButton type="submit" variant="contained" disabled={isLoading}>
                            Продолжить
                        </BaseLoadingButton>
                        <BaseButton onClick={onClickRepeatConfirm} disabled={isRepeatConfirmLoading}>
                            Отправить код повторно
                        </BaseButton>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
};
