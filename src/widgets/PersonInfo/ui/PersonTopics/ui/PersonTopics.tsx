import { useCallback } from 'react';
import { Typography } from '@mui/material';
import { CatalogCard } from '@/entities/CatalogCard';
import { transformDtoForCatalogCard } from '@/entities/CatalogList/lib/helpers/transformDtoForCatalogCard';
import { PersonTopicsSkeleton } from './PersonTopics.skeleton';
import { ScientificWork, useGetUsersScientificWorksQuery } from '@/entities/ScientificWork';
import { BaseList } from '@/shared/ui/List/List';

type PersonTopicsProps = {
    userId: string;
    className: string;
};

export const PersonTopics = (props: PersonTopicsProps) => {
    const { userId, className } = props;
    const { isFetching, data } = useGetUsersScientificWorksQuery({ userId });

    const render = useCallback((item: ScientificWork) => {
        const transformed = transformDtoForCatalogCard(item);
        return <CatalogCard key={transformed.id} {...transformed} />;
    }, []);

    if (isFetching) {
        return <PersonTopicsSkeleton className={className} count={3} />;
    }

    if (!data?.length) {
        return <Typography>Ничего не найдено</Typography>;
    }

    return <BaseList className={className} items={data} render={render} />;
};
