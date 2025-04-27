import { CatalogCard, ICatalogCard } from '@/entities/CatalogCard';
import { useGetUsersTopicsQuery } from '@/entities/Topic';
import { getUserData } from '@/entities/User';
import { CreateTopicButton } from '@/features/topic/create-topic';
import { BaseList } from '@/shared/ui/List/List';
import { CatalogOption } from '@/widgets/Catalog';
import { PersonTopicsSkeleton } from '@/widgets/PersonInfo/ui/PersonTopics';
import { Stack } from '@mui/material';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { MyTopicsEmpty } from './MyTopics.empty';
import styles from './MyTopics.module.scss';

export const MyTopics = () => {
    const { user } = useSelector(getUserData);
    const { isFetching, data } = useGetUsersTopicsQuery({ userId: user!.id });

    const render = useCallback((item: Omit<ICatalogCard, 'option'>) => {
        return <CatalogCard key={item.id} option={CatalogOption.Topics} {...item} isMine />;
    }, []);

    if (isFetching) {
        return <PersonTopicsSkeleton className={styles.list} count={3} />;
    }

    if (!data?.length) {
        return <MyTopicsEmpty />;
    }

    return (
        <Stack spacing={4}>
            <CreateTopicButton />
            <BaseList className={styles.list} items={data} render={render} />
        </Stack>
    );
};
