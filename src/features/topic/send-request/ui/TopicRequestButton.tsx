import { BaseLoadingButton } from '@/shared/ui';
import { useTopicRequestMutation } from '../api';

type TopicRequestButtonProps = {
    id: string;
    name: string;
};

export const TopicRequestButton = (props: TopicRequestButtonProps) => {
    const { id, name } = props;
    const [requestTopic, { isLoading }] = useTopicRequestMutation();

    const handleClick = async () => {
        // eslint-disable-next-line no-restricted-globals
        const isConfirmed = confirm(`Вы действительно хотите оформить заявку на тему "${name}"?`);
        if (isConfirmed) {
            await requestTopic({ topicId: id });
        }
    };

    return (
        <BaseLoadingButton variant="contained" onClick={handleClick} loading={isLoading}>
            Оформить заявку
        </BaseLoadingButton>
    );
};
