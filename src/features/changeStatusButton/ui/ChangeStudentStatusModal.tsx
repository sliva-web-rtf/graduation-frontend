import { Checkbox, FormControlLabel, FormGroup, Modal, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import styles from './Modal.module.scss';

interface ChangeStatusModalProps {
    id: string;
    open: boolean;
    onClose: () => void;
}

export const ChangeStudentStatusModal = memo((props: ChangeStatusModalProps) => {
    const { id, open, onClose } = props;

    const onSubmitHandler = () => {};

    return (
        <Modal open={open} onClose={onClose} className={styles.backdrop}>
            <Stack className={styles.modal}>
                <form id={id} onSubmit={onSubmitHandler} className={styles.content}>
                    <Typography variant="h2" mb={3}>
                        Выберите статус поиска
                    </Typography>
                    <Stack spacing={2}>
                        <Stack justifyContent="space-between" spacing={1}>
                            <RadioGroup
                            // value={searchingType}
                            // onChange={(_, value) => setSearchingType(value as SearchingStatus)}
                            >
                                <FormControlLabel
                                    // value={SearchingStatus.Seaching}
                                    control={<Radio />}
                                    label="Активно ищу научную деятельность"
                                />
                                <Stack pl={2}>
                                    <FormGroup>
                                        <FormControlLabel
                                            label="Ищу научного руководителя"
                                            control={
                                                <Checkbox
                                                // checked={studentSearching.isProfessorSearching}
                                                // onChange={(_, value) =>
                                                //     setStudentSearching({
                                                //         ...studentSearching,
                                                //         isProfessorSearching: value,
                                                //     })
                                                // }
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            label="Ищу команду для исследований"
                                            control={
                                                <Checkbox
                                                // checked={studentSearching.isTeamSearching}
                                                // onChange={(_, value) =>
                                                //     setStudentSearching({
                                                //         ...studentSearching,
                                                //         isTeamSearching: value,
                                                //     })
                                                // }
                                                />
                                            }
                                        />
                                    </FormGroup>
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
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </Modal>
    );
});
