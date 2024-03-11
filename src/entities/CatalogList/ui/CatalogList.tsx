import { memo, useCallback } from 'react';
import { ICatalogCard } from 'entities/CatalogCard/model/types/ICatalogCard';
import { BaseList } from 'shared/ui/List/List';
import { CatalogCard } from 'entities/CatalogCard';
import { ICatalogList } from '../model/types/ICatalogList';
import styles from './CatalogList.module.scss';

export const CatalogList = memo((props: ICatalogList) => {
  const { items } = props;
  const render = useCallback(
    (item: ICatalogCard) => <CatalogCard key={item.title} {...item} />,
    [],
  );

  return (
    <BaseList
      className={styles.catalogList}
      items={items}
      render={render}
    />
  );
});
