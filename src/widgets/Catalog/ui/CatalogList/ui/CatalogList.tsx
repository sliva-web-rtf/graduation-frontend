import { CatalogCard } from '@/entities/CatalogCard';
import { Professor } from '@/entities/Professor';
import { Student } from '@/entities/Student';
import { TopicCardModel } from '@/entities/Topic';
import { BaseList } from '@/shared/ui/List/List';
import { getCatalog } from '@/widgets/Catalog';
import { Typography } from '@mui/material';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useGetCatalogQuery } from '../../../api';
import { transformDtoForCatalogCard } from '../../../lib';
import styles from './CatalogList.module.scss';
import { CatalogListSkeleton } from './CatalogList.skeleton';

export const CatalogList = memo(() => {
    const { query, option, page, size, includeOwnedTopics } = useSelector(getCatalog);

    const render = useCallback(
        (item: Professor | TopicCardModel | Student) => {
            const transformed = transformDtoForCatalogCard(item);
            return <CatalogCard option={option} key={transformed.id} {...transformed} />;
        },
        [option],
    );

    const { isFetching, data } = useGetCatalogQuery({
        option,
        params: { query, page, size, includeOwnedTopics },
    });

    if (isFetching) {
        return <CatalogListSkeleton count={size} />;
    }

    if (!data?.data?.length) {
        return <Typography>Ничего не найдено</Typography>;
    }

    return <BaseList className={styles.catalogList} items={data!.data} render={render} />;
});
