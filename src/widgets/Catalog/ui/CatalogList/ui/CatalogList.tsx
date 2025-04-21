import { CatalogCard, ICatalogCard } from '@/entities/CatalogCard';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { EmptyMessage, ErrorPageMessage } from '@/shared/ui';
import { BaseList } from '@/shared/ui/List/List';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetCatalogQuery } from '../../../api';
import { catalogActions, getCatalog } from '../../../model';
import styles from './CatalogList.module.scss';
import { CatalogListSkeleton } from './CatalogList.skeleton';

export const CatalogList = memo(() => {
    const dispatch = useAppDispatch();
    const { query, option, page, size } = useSelector(getCatalog);
    const { isFetching, data, error } = useGetCatalogQuery({
        option,
        params: { query, page, size },
    });

    const render = useCallback(
        (item: Omit<ICatalogCard, 'option'>) => {
            return <CatalogCard key={item.id} {...item} option={option} />;
        },
        [option],
    );

    useEffect(() => {
        if (data) {
            dispatch(catalogActions.setPagesCount(data.pagesCount));
        }
    }, [data, dispatch]);

    if (isFetching) {
        return <CatalogListSkeleton count={size} />;
    }

    if (error) {
        return <ErrorPageMessage />;
    }

    if (!data?.data?.length) {
        return <EmptyMessage message="Ничего не найдено" />;
    }

    return <BaseList className={styles.catalogList} items={data.data} render={render} />;
});
