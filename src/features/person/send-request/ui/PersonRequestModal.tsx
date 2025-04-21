import { useGetUsersTopicsQuery } from '@/entities/Topic';
import { getUserData } from '@/entities/User';
import { BaseAlert, BaseButton, BaseLoadingButton, BaseModal } from '@/shared/ui';
import { Divider, FormControl, RadioGroup, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSendRequestMutation } from '../api';
import { TopicsRadioButtons, TopicsRadioButtonsSkeleton } from './TopicsRadioButtons';

type PersonRequestModalProps = {
    id: string;
    name: string;
    open: boolean;
    onClose: () => void;
};

export const PersonRequestModal = (props: PersonRequestModalProps) => {
    const { id, name, open, onClose } = props;
    const { user } = useSelector(getUserData);
    const [sendRequest, { isLoading }] = useSendRequestMutation();
    const [topicId, setTopicId] = useState<string | null>(null);
    const { data: personTopics, isFetching: isPersonTopicsFetching } = useGetUsersTopicsQuery({ userId: id });
    const { data: usersTopics, isFetching: isUsersTopicsFetching } = useGetUsersTopicsQuery({ userId: user!.id });
    const handleRadioChange = (_: unknown, value: string) => {
        setTopicId(value);
    };

    const onSubmit = () => {
        if (topicId) {
            sendRequest({ id, topicId });
        }
    };

    return (
        <BaseModal
            size="medium"
            title="Оформления заявки"
            subtitle="Выберете тему пользователя или предложите одну из ваших тем"
            actionButton={
                <BaseLoadingButton variant="contained" onClick={onSubmit} loading={isLoading}>
                    Оформить заявку
                </BaseLoadingButton>
            }
            cancelButton={
                <BaseButton variant="text" onClick={onClose}>
                    Отменить
                </BaseButton>
            }
            open={open}
            onClose={onClose}
            onClick={(e) => e.stopPropagation()}
        >
            <Stack spacing={4}>
                <BaseAlert severity="info">Вы оформляете заявку {name}</BaseAlert>
                <FormControl>
                    <RadioGroup
                        name="topicId"
                        value={topicId}
                        onChange={handleRadioChange}
                        sx={{ maxHeight: 400, overflowY: 'scroll' }}
                    >
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <Typography variant="h3">Темы пользователя</Typography>
                                {isPersonTopicsFetching ? (
                                    <TopicsRadioButtonsSkeleton />
                                ) : (
                                    <TopicsRadioButtons items={personTopics} />
                                )}
                            </Stack>
                            <Divider />
                            <Stack spacing={2}>
                                <Typography variant="h3">Предложить из своих тем</Typography>
                                {isPersonTopicsFetching ? (
                                    <TopicsRadioButtonsSkeleton />
                                ) : (
                                    <TopicsRadioButtons items={usersTopics} />
                                )}
                            </Stack>
                        </Stack>
                    </RadioGroup>
                </FormControl>
            </Stack>
        </BaseModal>
    );
};
