import { useCallback } from 'react';
import { RequestCardSkeleton } from '@/entities/Request';
import { BaseList } from '@/shared/ui/List/List';
import styles from './CatalogList.module.scss';

export const RequestsListSkeleton = (props: { count: number }) => {
    const { count } = props;
    const items = Array.from({ length: count }, (_, index) => index);
    const render = useCallback((item: number) => <RequestCardSkeleton key={item} />, []);

    return <BaseList className={styles.list} items={items} render={render} />;
};
