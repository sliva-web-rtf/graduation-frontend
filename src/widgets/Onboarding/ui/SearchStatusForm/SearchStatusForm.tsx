import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { completeRegistration, updateStudentStatusSearching } from '../../api/onboardingApi';
import { SearchingStatus } from '@/shared/lib/types/searchingStatus';
import { StudentSearchingStatus } from '../../model/types/studentStatus';
import { refreshToken } from '@/entities/User/api/userApi';
import { UserSecretStorageService } from '@/shared/lib/helpers/userSecretStorage';
import { userActions } from '@/entities/User';

type StudentSearching = {
    isTeamSearching: boolean;
    isProfessorSearching: boolean;
};

interface StudentSearchStatusFormProps {
    id: string;
    onSuccess?: () => void;
    onRequestStart?: () => void;
    onError?: () => void;
    initialValues?: StudentSearchingStatus;
}

export const StudentSearchStatusForm = memo(
    ({ onError, onSuccess, onRequestStart, id, initialValues }: StudentSearchStatusFormProps) => {
        const dispatch = useAppDispatch();

        const [studentSearching, setStudentSearching] = useState<StudentSearching>({
            isTeamSearching: initialValues?.isTeamSearching ?? false,
            isProfessorSearching: initialValues?.isTeamSearching ?? false,
        });
        const [searchingType, setSearchingType] = useState<SearchingStatus>(
            initialValues?.status ?? SearchingStatus.DoNotSearch,
        );

        const [updatedSearchingStatus, { error }] = updateStudentStatusSearching();
        const [completeStudentRegistration] = completeRegistration();
        const [refreshAccessToken] = refreshToken();

        const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onRequestStart?.();
            const values: StudentSearchingStatus = {
                status: searchingType,
                isProfessorSearching: studentSearching.isProfessorSearching,
                isTeamSearching: studentSearching.isTeamSearching,
            };
            const updateSearchingStatusResponse = await updatedSearchingStatus(values);
            // TODO: переделать в отдельный action всю пачку запросов
            if ('error' in updateSearchingStatusResponse) {
                onError?.();
            } else {
                const registrationCompeteResponse = await completeStudentRegistration();
                if ('error' in registrationCompeteResponse) {
                    onError?.();
                } else {
                    const token = await UserSecretStorageService.get();
                    if (token) {
                        const refreshResponse = await refreshAccessToken(token);
                        if ('error' in refreshResponse) {
                            onError?.();
                        } else {
                            dispatch(userActions.changeRegistration(true));
                            onSuccess?.();
                        }
                    } else {
                        onError?.();
                    }
                }
            }
        };

        useEffect(() => {
            if (error) {
                toast.error('Что-то пошло не так. Попробуйте еще раз');
                onError?.();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [error]);

        useEffect(() => {
            if (
                searchingType === SearchingStatus.Seaching &&
                !studentSearching.isProfessorSearching &&
                !studentSearching.isTeamSearching
            ) {
                setStudentSearching({
                    isTeamSearching: true,
                    isProfessorSearching: true,
                });
            } else if (searchingType !== SearchingStatus.Seaching) {
                setStudentSearching({
                    isTeamSearching: false,
                    isProfessorSearching: false,
                });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchingType]);

        useEffect(() => {
            if (studentSearching.isProfessorSearching || studentSearching.isTeamSearching) {
                setSearchingType(SearchingStatus.Seaching);
            }
        }, [studentSearching]);

        return (
            <form id={id} onSubmit={onSubmitHandler}>
                <Typography variant="h2" mb={3}>
                    Выберите статус поиска
                </Typography>
                <Stack spacing={2}>
                    <Stack justifyContent="space-between" spacing={1}>
                        <RadioGroup
                            value={searchingType}
                            onChange={(_, value) => setSearchingType(value as SearchingStatus)}
                        >
                            <FormControlLabel
                                value={SearchingStatus.Seaching}
                                control={<Radio />}
                                label="Активно ищу научную деятельность"
                            />
                            <Stack pl={2}>
                                <FormGroup>
                                    <FormControlLabel
                                        label="Ищу научного руководителя"
                                        control={
                                            <Checkbox
                                                checked={studentSearching.isProfessorSearching}
                                                onChange={(_, value) =>
                                                    setStudentSearching({
                                                        ...studentSearching,
                                                        isProfessorSearching: value,
                                                    })
                                                }
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        label="Ищу команду для исследований"
                                        control={
                                            <Checkbox
                                                checked={studentSearching.isTeamSearching}
                                                onChange={(_, value) =>
                                                    setStudentSearching({
                                                        ...studentSearching,
                                                        isTeamSearching: value,
                                                    })
                                                }
                                            />
                                        }
                                    />
                                </FormGroup>
                            </Stack>
                            <FormControlLabel
                                value={SearchingStatus.ConsideringIncomingOffers}
                                control={<Radio />}
                                label="Рассматриваю предложения"
                            />
                            <FormControlLabel
                                value={SearchingStatus.DoNotSearch}
                                control={<Radio />}
                                label="Не ищу научную деятельность"
                            />
                        </RadioGroup>
                    </Stack>
                </Stack>
            </form>
        );
    },
);
