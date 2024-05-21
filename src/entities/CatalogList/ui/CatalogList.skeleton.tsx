import { memo, useCallback } from 'react';
import { BaseList } from 'shared/ui/List/List';
import { CatalogCardSkeleton } from 'entities/CatalogCard';
import styles from './CatalogList.module.scss';

export const CatalogListSkeleton = memo((props: { count: number }) => {
    const items = Array.from({ length: props.count }, (_, index) => index);
    const render = useCallback((item: number) => <CatalogCardSkeleton key={item} />, []);

    return <BaseList className={styles.catalogList} items={items} render={render} />;
});
