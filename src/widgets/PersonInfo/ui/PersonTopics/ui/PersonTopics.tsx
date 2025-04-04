import { CatalogCard, ICatalogCard } from '@/entities/CatalogCard';
import { useGetUsersScientificWorksQuery } from '@/entities/Topic';
import { BaseList } from '@/shared/ui/List/List';
import { CatalogOption } from '@/widgets/Catalog';
import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { PersonTopicsSkeleton } from './PersonTopics.skeleton';

type PersonTopicsProps = {
    userId: string;
    className: string;
};

export const PersonTopics = (props: PersonTopicsProps) => {
    const { userId, className } = props;
    const { isFetching, data } = useGetUsersScientificWorksQuery({ userId });

    const render = useCallback((item: Omit<ICatalogCard, 'option'>) => {
        return <CatalogCard key={item.id} option={CatalogOption.Topics} {...item} />;
    }, []);

    if (isFetching) {
        return <PersonTopicsSkeleton className={className} count={3} />;
    }

    if (!data?.length) {
        return <Typography>Ничего не найдено</Typography>;
    }

    return <BaseList className={className} items={data} render={render} />;
};
