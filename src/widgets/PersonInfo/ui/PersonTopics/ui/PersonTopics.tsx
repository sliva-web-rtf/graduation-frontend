import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { CatalogCard } from '@/entities/CatalogCard';
import { TopicCardModel, useGetUsersScientificWorksQuery } from '@/entities/Topic';
import { BaseList } from '@/shared/ui/List/List';
import { CatalogOption, transformDtoForCatalogCard } from '@/widgets/Catalog';
import { PersonTopicsSkeleton } from './PersonTopics.skeleton';

type PersonTopicsProps = {
    userId: string;
    className: string;
};

export const PersonTopics = (props: PersonTopicsProps) => {
    const { userId, className } = props;
    const { isFetching, data } = useGetUsersScientificWorksQuery({ userId });

    const render = useCallback((item: TopicCardModel) => {
        const transformed = transformDtoForCatalogCard(item);
        return <CatalogCard key={transformed.id} option={CatalogOption.Topics} {...transformed} />;
    }, []);

    if (isFetching) {
        return <PersonTopicsSkeleton className={className} count={3} />;
    }

    if (!data?.length) {
        return <Typography>Ничего не найдено</Typography>;
    }

    return <BaseList className={className} items={data} render={render} />;
};
