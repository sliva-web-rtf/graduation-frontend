import { Box, FormControl, Modal, Paper, RadioGroup, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { ChangeEvent, memo } from 'react';
import { BaseButton, BaseLoadingButton } from '@/shared/ui/Button/Button';
import { ScientificWork, ScientificWorkRadio, useGetUsersScientificWorksQuery } from '@/entities/ScientificWork';
import { CreateTopicButton } from '@/features/topic/create-topic';
import styles from './Modal.module.scss';
import { BaseModal } from '@/shared/ui';

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
        return <Typography variant="body1">Темы отсутсвуют</Typography>;
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
        <BaseModal
            title="Оформление заявки"
            subtitle="Выберите тему ВКР для отправки запроса"
            actionButton={
                <BaseLoadingButton
                    loading={!scientificWorkId || disabled}
                    variant="contained"
                    sx={{ alignSelf: 'flex-end' }}
                    onClick={onSubmit}
                >
                    Оформить заявку
                </BaseLoadingButton>
            }
            open={open}
            onClose={onClose}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <form>
                <FormControl>
                    <RadioGroup name="scientificWorkId" value={scientificWorkId} onChange={handleRadioChange}>
                        <Stack spacing={4}>
                            <Stack spacing={2} width="100%">
                                <Typography variant="h3">Выбрать из тем пользователя</Typography>
                                <RadioList items={otherScientificWorks} />
                            </Stack>
                            <Stack spacing={2}>
                                <Typography variant="h3">Предложить из своих тем</Typography>
                                <RadioList items={usersScientificWorks} />
                            </Stack>
                        </Stack>
                    </RadioGroup>
                </FormControl>
            </form>
        </BaseModal>
    );
});
