import { BaseAlert, BaseButton, BaseLoadingButton, BaseModal } from '@/shared/ui';
import { useTopicRequestMutation } from '../api';

type TopicRequestModalProps = {
    id: string;
    name: string;
    open: boolean;
    onClose: () => void;
};

export const TopicRequestModal = (props: TopicRequestModalProps) => {
    const { id, name, open, onClose } = props;
    const [requestTopic, { isLoading }] = useTopicRequestMutation();

    const onSubmit = () => {
        requestTopic({ topicId: id });
    };

    return (
        <BaseModal
            size="small"
            title="Оформления заявки"
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
            <BaseAlert severity="info">Вы оформляете заявку на тему &quot;{name}&quot;</BaseAlert>
        </BaseModal>
    );
};
