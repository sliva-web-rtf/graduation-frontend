import { memo, useCallback } from 'react';
import { BaseList } from 'shared/ui/List/List';
import { ICatalogCard } from 'widgets/CatalogCard/model/types/ICatalogCard';
import { CatalogCard } from 'widgets/CatalogCard';
import { ICatalogList } from '../model/types/ICatalogList';
import styles from './CatalogList.module.scss';

export const CatalogList = memo((props: ICatalogList) => {
    const { items } = props;
    const render = useCallback((item: ICatalogCard) => <CatalogCard key={item.title} {...item} />, []);

    return <BaseList className={styles.catalogList} items={items} render={render} />;
});
