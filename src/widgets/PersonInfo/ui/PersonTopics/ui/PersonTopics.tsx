import { CatalogCard, ICatalogCard } from '@/entities/CatalogCard';
import { useGetUsersTopicsQuery } from '@/entities/Topic';
import { EmptyMessage } from '@/shared/ui';
import { BaseList } from '@/shared/ui/List/List';
import { CatalogOption } from '@/widgets/Catalog';
import { Stack } from '@mui/material';
import { useCallback } from 'react';
import styles from './PersonTopics.module.scss';
import { PersonTopicsSkeleton } from './PersonTopics.skeleton';

type PersonTopicsProps = {
    userId: string;
};

export const PersonTopics = (props: PersonTopicsProps) => {
    const { userId } = props;
    const { isFetching, data } = useGetUsersTopicsQuery({ userId });

    const render = useCallback((item: Omit<ICatalogCard, 'option'>) => {
        return <CatalogCard key={item.id} option={CatalogOption.Topics} {...item} />;
    }, []);

    if (isFetching) {
        return <PersonTopicsSkeleton className={styles.list} count={3} />;
    }

    if (!data?.length) {
        return (
            <Stack width="100%" height="100%">
                <EmptyMessage message="Пользователь не создал ни одной темы" />
            </Stack>
        );
    }

    return <BaseList className={styles.list} items={data} render={render} />;
};
