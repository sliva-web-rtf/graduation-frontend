import { Typography } from '@mui/material';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CatalogCard } from '@/entities/CatalogCard';
import { Professor } from '@/entities/Professor';
import { ScientificWork } from '@/entities/ScientificWork';
import { Student } from '@/entities/Student';
import { BaseList } from '@/shared/ui/List/List';
import { getCatalog } from '@/widgets/Catalog/model';
import { useGetCatalogQuery } from '../api/catalogApi';
import { transformDtoForCatalogCard } from '../lib/helpers/transformDtoForCatalogCard';
import styles from './CatalogList.module.scss';
import { CatalogListSkeleton } from './CatalogList.skeleton';

export const CatalogList = memo(() => {
    const { search, order, option, page, pageSize, direction } = useSelector(getCatalog);

    const render = useCallback((item: Professor | ScientificWork | Student) => {
        const transformed = transformDtoForCatalogCard(item);
        return <CatalogCard key={transformed.id} {...transformed} />;
    }, []);

    const { isFetching, data } = useGetCatalogQuery({ option, params: { search, page, pageSize, direction, order } });

    if (isFetching) {
        return <CatalogListSkeleton count={pageSize} />;
    }

    if (!data?.data?.length) {
        return <Typography>Ничего не найдено</Typography>;
    }

    return <BaseList className={styles.catalogList} items={data!.data} render={render} />;
});
