import { Checkbox, FormControlLabel, FormGroup, Modal, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Modal.module.scss';
import { getUserAuthData } from '@/entities/User';
import { useGetStudentQuery } from '@/entities/Student';
import { SearchingStatus } from '@/shared/lib/types/searchingStatus';
import { StudentSearchingStatus } from '../model/types/studentSearchingStatus';
import { BaseButton } from '@/shared/ui';
import { getStudent } from '@/widgets/Onboarding/model/selectors/getStudent';
import { getLazyStudentProfile } from '@/widgets/Onboarding/api/onboardingApi';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getStudentSearchingStatus, updateStudentStatusSearching } from '@/widgets/PersonalData/api/personalDataApi';
import { personalDataActions } from '@/widgets/PersonalData/model/slice/personalDataSlice';

interface ChangeStatusModalProps {
    open: boolean;
    onClose: () => void;
}

type StudentSearching = {
    commandSearching: boolean;
    professorSearching: boolean;
};

export const ChangeStudentStatusModal = memo((props: ChangeStatusModalProps) => {
    const { open, onClose } = props;

    const { data } = getStudentSearchingStatus();
    const [studentSearching, setStudentSearching] = useState<StudentSearching>({
        commandSearching: data?.commandSearching ?? false,
        professorSearching: data?.professorSearching ?? false,
    });
    const [searchingType, setSearchingType] = useState<SearchingStatus>(data?.status ?? SearchingStatus.DoNotSearch);
    useEffect(() => {
        if (data && !studentSearching.commandSearching && !studentSearching.professorSearching) {
            setStudentSearching({
                commandSearching: data.commandSearching,
                professorSearching: data.professorSearching,
            });
            setSearchingType(data.status);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const [updatedSearchingStatus, { error }] = updateStudentStatusSearching();
    const onSubmitHandler = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const values: StudentSearchingStatus = {
                status: searchingType,
                commandSearching: studentSearching.commandSearching,
                professorSearching: studentSearching.professorSearching,
            };
            await updatedSearchingStatus(values);
        },
        [searchingType, studentSearching.commandSearching, studentSearching.professorSearching, updatedSearchingStatus],
    );

    useEffect(() => {
        if (
            searchingType === SearchingStatus.Seaching &&
            !studentSearching.commandSearching &&
            !studentSearching.professorSearching
        ) {
            setStudentSearching({
                commandSearching: true,
                professorSearching: true,
            });
        } else if (searchingType !== SearchingStatus.Seaching) {
            setStudentSearching({
                commandSearching: false,
                professorSearching: false,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchingType]);

    useEffect(() => {
        if (studentSearching.professorSearching || studentSearching.commandSearching) {
            setSearchingType(SearchingStatus.Seaching);
        }
    }, [studentSearching]);

    return (
        <Modal open={open} onClose={onClose} className={styles.backdrop}>
            <Stack className={styles.modal}>
                <form onSubmit={onSubmitHandler} className={styles.content}>
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
                                                    checked={studentSearching.professorSearching}
                                                    onChange={(_, value) =>
                                                        setStudentSearching({
                                                            ...studentSearching,
                                                            professorSearching: value,
                                                        })
                                                    }
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Ищу команду для исследований"
                                            control={
                                                <Checkbox
                                                    checked={studentSearching.commandSearching}
                                                    onChange={(_, value) =>
                                                        setStudentSearching({
                                                            ...studentSearching,
                                                            commandSearching: value,
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
                    <BaseButton sx={{ alignSelf: 'center', mt: 2 }} variant="contained" type="submit">
                        Применить
                    </BaseButton>
                </form>
            </Stack>
        </Modal>
    );
});
