import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateStudentScientificInfo } from '../../api/onboardingApi';
import { onboardingActions } from '@/widgets/Onboarding/model/slice/onboardingSlice';
import { getStudentScientificInfo } from '../../model/selectors/getStudentScientificInfo';
import { SearchingStatus } from '@/shared/lib/types/searchingStatus';
import { StudentSearchingStatus } from '../../model/types/studentStatus';

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
        const studentScientificPortfolio = useSelector(getStudentScientificInfo);
        const dispatch = useAppDispatch();
        const [studentSearching, setStudentSearching] = useState<StudentSearching>({
            isTeamSearching: initialValues?.isTeamSearching ?? false,
            isProfessorSearching: initialValues?.isTeamSearching ?? false,
        });
        const [searchingType, setSearchingType] = useState<SearchingStatus>(
            initialValues?.status ?? SearchingStatus.DoNotSearch,
        );

        const [updatedProfileInfo, { error }] = updateStudentScientificInfo();

        const onSubmitHandler = useCallback(
            async (values: any) => {
                onRequestStart?.();
                if (isEqual(values, studentScientificPortfolio)) {
                    onSuccess?.();
                } else {
                    await updatedProfileInfo(values).then((response) => {
                        if ('error' in response) {
                            onError?.();
                        } else {
                            dispatch(onboardingActions.setStudentScientificInfo(values));
                            onSuccess?.();
                        }
                    });
                }
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [studentScientificPortfolio, updatedProfileInfo],
        );

        useEffect(() => {
            if (error) {
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
            <form id={id} onSubmit={() => onSubmitHandler('')}>
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
