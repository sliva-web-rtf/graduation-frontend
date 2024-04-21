import { memo, useCallback } from 'react';
import { BaseList } from 'shared/ui/List/List';
import { CatalogCard } from 'widgets/CatalogCard';
import { Professor } from 'entities/Professor';
import { ScientificWork } from 'entities/ScientificWork';
import { Student } from 'entities/Student/types/student';
import { transformDtoForCatalogCard } from '../lib/helpers/transformDtoForCatalogCard';
import styles from './CatalogList.module.scss';
import { ICatalogList } from '../model/types/ICatalogList';

export const CatalogList = memo((props: ICatalogList) => {
    const { items } = props;
    const render = useCallback((item: Professor | ScientificWork | Student) => {
        const props = transformDtoForCatalogCard(item);
        return <CatalogCard key={props.id} {...props} />;
    }, []);

    // @ts-ignore
    return <BaseList className={styles.catalogList} items={items} render={render} />;
});
