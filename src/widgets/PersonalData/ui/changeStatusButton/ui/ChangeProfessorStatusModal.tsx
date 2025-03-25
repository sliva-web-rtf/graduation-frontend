import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from '@mui/material';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import { BaseButton, BaseLoadingButton, StyledSelect } from '@/shared/ui';
import {
    getProfessorSearchingStatus,
    updateProfessorStatusSearchingPD,
} from '@/widgets/PersonalData/api/personalDataApi';
import { SearchingStatus } from '@/shared/lib/types/searchingStatus';
import { ProfessorSearchingStatus } from '@/widgets/PersonalData/model/types/professorSearchingStatus';

interface ChangeStatusModalProps {
    open: boolean;
    onClose: () => void;
}

export const ChangeProfessorStatusModal = memo((props: ChangeStatusModalProps) => {
    const { open, onClose } = props;

    const { data } = getProfessorSearchingStatus();
    const [updatedProfessorSearchingStatus, { error, isLoading }] = updateProfessorStatusSearchingPD();

    const [searchingType, setSearchingType] = useState<SearchingStatus>(data?.status ?? SearchingStatus.DoNotSearch);
    const [studentsCount, setStudentsCount] = useState<number>(data?.limit ?? 0);

    const onSubmitHandler = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const values: ProfessorSearchingStatus = {
                status: searchingType,
                limit: studentsCount,
            };
            await updatedProfessorSearchingStatus(values);
            onClose();
        },
        [onClose, searchingType, studentsCount, updatedProfessorSearchingStatus],
    );

    useEffect(() => {
        if (data) {
            setSearchingType(data.status);
            setStudentsCount(data.limit);
        }
    }, [data]);

    return (
        <Modal open={open} onClose={onClose} className={styles.backdrop}>
            <Stack className={styles.modal}>
                <form onSubmit={onSubmitHandler} className={styles.content}>
                    <Typography variant="h2" mb={3}>
                        Выберите статус поиска
                    </Typography>
                    <RadioGroup
                        value={searchingType}
                        onChange={(_, value) => setSearchingType(value as SearchingStatus)}
                    >
                        <FormControlLabel
                            value={SearchingStatus.Seaching}
                            control={<Radio />}
                            label="Активно ищу научную деятельность"
                        />
                        <Stack mt={1} mb={1}>
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
                    <BaseLoadingButton
                        sx={{ alignSelf: 'center', mt: 2 }}
                        variant="contained"
                        type="submit"
                        loading={isLoading}
                    >
                        Применить
                    </BaseLoadingButton>
                </form>
            </Stack>
        </Modal>
    );
});
