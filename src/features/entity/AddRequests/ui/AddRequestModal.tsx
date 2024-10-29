import { Box, FormControl, Modal, Paper, RadioGroup, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { ChangeEvent, memo } from 'react';
import { BaseButton } from '@/shared/ui/Button/Button';
import { ScientificWork, ScientificWorkRadio, useGetUsersScientificWorksQuery } from '@/entities/ScientificWork';
import { CreateScientificWorkModal } from '@/features/scientificWork/CreateScientificWork';
import styles from './Modal.module.scss';

interface AddRequestModalProps {
    readonly id: string;
    readonly userId: string;
    readonly open: boolean;
    readonly scientificWorkId: string;
    readonly setScientificWorkId: (value: string) => void;
    readonly onClose: () => void;
    readonly onSubmit: () => void;
    readonly disabled: boolean;
}

const RadioList = memo(({ items }: { items?: Array<ScientificWork> }) => {
    if (!items?.length) {
        return <Typography variant="body1">Исследований нет</Typography>;
    }

    return (
        <>
            {items.map((item: ScientificWork) => (
                <ScientificWorkRadio key={item.id} {...item} />
            ))}
        </>
    );
});

export const AddRequestModal = memo((props: AddRequestModalProps) => {
    const { id, userId, scientificWorkId, setScientificWorkId, open, onClose, onSubmit, disabled } = props;

    const { isFetching: isOtherWorksFetching, data: otherScientificWorks } = useGetUsersScientificWorksQuery(
        { userId: id },
        { skip: !open },
    );
    const { isFetching: isUsersWorksFetching, data: usersScientificWorks } = useGetUsersScientificWorksQuery(
        { userId: userId! },
        { skip: !open },
    );

    if (isOtherWorksFetching || isUsersWorksFetching) {
        return null;
    }

    const handleRadioChange = (_: ChangeEvent<HTMLInputElement>, value: string) => {
        setScientificWorkId(value);
    };

    return (
        <Modal open={open} onClose={onClose} className={styles.backdrop}>
            <Stack direction="row" spacing={3} alignItems="flex-start" className={styles.modal}>
                <BaseButton variant="contained" sx={{ p: 1 }} onClick={onClose}>
                    <CloseRoundedIcon />
                </BaseButton>
                <form>
                    <FormControl>
                        <RadioGroup name="scientificWorkId" value={scientificWorkId} onChange={handleRadioChange}>
                            <Stack
                                component={Paper}
                                className={styles.content}
                                spacing={4}
                                elevation={0}
                                sx={{ borderRadius: 4 }}
                            >
                                <Stack spacing={2}>
                                    <Typography variant="h2">Оформление заявки</Typography>
                                    <Typography variant="body1">
                                        Выберите тему исследования для отправки запроса
                                    </Typography>
                                </Stack>
                                <Stack spacing={2} width="100%">
                                    <Typography variant="h3">Выбрать из тем пользователя</Typography>
                                    <RadioList items={otherScientificWorks} />
                                </Stack>
                                <Stack spacing={2}>
                                    <Typography variant="h3">Предложить из своих тем</Typography>
                                    <RadioList items={usersScientificWorks} />
                                    <Box alignSelf="flex-start">
                                        <CreateScientificWorkModal />
                                    </Box>
                                </Stack>
                                <BaseButton
                                    disabled={!scientificWorkId || disabled}
                                    variant="contained"
                                    sx={{ alignSelf: 'flex-end' }}
                                    onClick={onSubmit}
                                >
                                    Оформить заявку
                                </BaseButton>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </form>
            </Stack>
        </Modal>
    );
});
