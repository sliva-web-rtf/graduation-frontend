import {
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from '@mui/material';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { completeRegistration, updateProfessorStatusSearching } from '../../api/onboardingApi';
import { SearchingStatus } from '@/shared/lib/types/searchingStatus';
import { refreshToken } from '@/entities/User/api/userApi';
import { UserSecretStorageService } from '@/shared/lib/helpers/userSecretStorage';
import { userActions } from '@/entities/User';
import { ProfessorSearchingStatus } from '../../model/types/professorStatus';
import { StyledSelect } from '@/shared/ui';

interface ProfessorSearchStatusFormProps {
    id: string;
    onSuccess?: () => void;
    onRequestStart?: () => void;
    onError?: () => void;
    initialValues?: ProfessorSearchingStatus;
}

export const ProfessorSearchStatusForm = memo(
    ({ onError, onSuccess, onRequestStart, id, initialValues }: ProfessorSearchStatusFormProps) => {
        const dispatch = useAppDispatch();

        const [searchingType, setSearchingType] = useState<SearchingStatus>(
            initialValues?.status ?? SearchingStatus.DoNotSearch,
        );
        const [studentsCount, setStudentsCount] = useState(initialValues?.studentsCount ?? 0);

        const [updatedSearchingStatus, { error }] = updateProfessorStatusSearching();
        const [completeStudentRegistration] = completeRegistration();
        const [refreshAccessToken] = refreshToken();

        const onSubmitHandler = useCallback(
            async (event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                onRequestStart?.();
                const values: ProfessorSearchingStatus = {
                    studentsCount,
                    status: searchingType,
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
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [updatedSearchingStatus],
        );

        useEffect(() => {
            if (error) {
                toast.error('Что-то пошло не так. Попробуйте еще раз');
                onError?.();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [error]);

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
                                <FormControl fullWidth>
                                    <InputLabel id="students-count">
                                        Лимит студентов, которых можете взять под руководство *
                                    </InputLabel>
                                    <StyledSelect
                                        disabled={searchingType !== SearchingStatus.Seaching}
                                        value={studentsCount}
                                        onChange={(e) => setStudentsCount(e.target.value as number)}
                                        label="Лимит студентов, которых можете взять под руководство *"
                                        labelId="students-count"
                                    >
                                        {Array.from(Array(10).keys()).map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </StyledSelect>
                                </FormControl>
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
