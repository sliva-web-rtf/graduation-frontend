import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { BaseList } from 'shared/ui/List/List';
import { Professor } from 'entities/Professor';
import { ScientificWork } from 'entities/ScientificWork';
import { Student } from 'entities/Student';
import { CatalogCard } from 'entities/CatalogCard';
import {
    getCatalogAreas,
    getCatalogInterests,
    getCatalogIsFavoritesFilter,
    getCatalogOption,
    getCatalogPage,
    getCatalogPageSize,
} from 'widgets/Catalog';
import { Typography } from '@mui/material';
import { useGetCatalogQuery } from '../api/catalogApi';
import { CatalogListSkeleton } from './CatalogList.skeleton';
import { transformDtoForCatalogCard } from '../lib/helpers/transformDtoForCatalogCard';
import styles from './CatalogList.module.scss';

export const CatalogList = memo(() => {
    const option = useSelector(getCatalogOption);
    const params = {
        page: useSelector(getCatalogPage),
        pageSize: useSelector(getCatalogPageSize),
        scientificAreaSubsections: useSelector(getCatalogAreas),
        scientificInterests: useSelector(getCatalogInterests),
        isFavoriteFilterOnly: useSelector(getCatalogIsFavoritesFilter),
    };

    const render = useCallback((item: Professor | ScientificWork | Student) => {
        const transformed = transformDtoForCatalogCard(item);
        return <CatalogCard key={transformed.id} {...transformed} />;
    }, []);

    const { isFetching, data } = useGetCatalogQuery({ option, params });

    if (isFetching) {
        return <CatalogListSkeleton count={3} />;
    }

    if (!data?.data?.length) {
        return <Typography>Ничего не найдено</Typography>;
    }

    // @ts-ignore
    return <BaseList className={styles.catalogList} items={data!.data} render={render} />;
});
