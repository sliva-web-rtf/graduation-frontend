import { memo, useCallback } from 'react';
import { CatalogCardSkeleton } from '@/entities/CatalogCard';
import { BaseList } from '@/shared/ui/List/List';
import styles from './StudentThemes.module.scss';

interface ProfessorThemesSkeletonProps {
    count: number;
}

export const StudentThemesSkeleton = memo((props: ProfessorThemesSkeletonProps) => {
    const { count } = props;

    const items = Array.from({ length: count }, (_, index) => index);
    const render = useCallback((item: number) => <CatalogCardSkeleton key={item} />, []);

    return <BaseList className={styles.list} items={items} render={render} />;
});
