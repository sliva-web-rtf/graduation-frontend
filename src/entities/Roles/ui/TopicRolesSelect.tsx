import { BaseSelect, BaseSelectProps } from '@/shared/ui';
import { useGetTopicRolesQuery } from '../api';

type Props = Omit<BaseSelectProps, 'options'>;

export const TopicRolesSelect = (props: Props) => {
    const { isFetching, data } = useGetTopicRolesQuery();

    return <BaseSelect disabled={isFetching} options={data ?? []} {...props} />;
};
