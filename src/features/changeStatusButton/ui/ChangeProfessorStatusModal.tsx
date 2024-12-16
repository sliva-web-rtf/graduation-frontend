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
import { memo } from 'react';
import styles from './Modal.module.scss';
import { StyledSelect } from '@/shared/ui';

interface ChangeStatusModalProps {
    id: string;
    open: boolean;
    onClose: () => void;
}

export const ChangeProfessorStatusModal = memo((props: ChangeStatusModalProps) => {
    const { id, open, onClose } = props;

    const onSubmitHandler = () => {};

    return (
        <Modal open={open} onClose={onClose} className={styles.backdrop}>
            <Stack className={styles.modal}>
                <form id={id} onSubmit={onSubmitHandler} className={styles.content}>
                    <Typography variant="h2" mb={3}>
                        Выберите статус поиска
                    </Typography>
                    <RadioGroup
                    // value={searchingType}
                    // onChange={(_, value) => setSearchingType(value as SearchingStatus)}
                    >
                        <FormControlLabel
                            // value={SearchingStatus.Seaching}
                            control={<Radio />}
                            label="Активно ищу научную деятельность"
                        />
                        <Stack mt={1} mb={1}>
                            <FormControl fullWidth>
                                <InputLabel id="students-count">
                                    Лимит студентов, которых можете взять под руководство *
                                </InputLabel>
                                <StyledSelect
                                    // disabled={searchingType !== SearchingStatus.Seaching}
                                    // value={studentsCount}
                                    // onChange={(e) => setStudentsCount(e.target.value as number)}
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
                            // value={SearchingStatus.ConsideringIncomingOffers}
                            control={<Radio />}
                            label="Рассматриваю предложения"
                        />
                        <FormControlLabel
                            // value={SearchingStatus.DoNotSearch}
                            control={<Radio />}
                            label="Не ищу научную деятельность"
                        />
                    </RadioGroup>
                </form>
            </Stack>
        </Modal>
    );
});
