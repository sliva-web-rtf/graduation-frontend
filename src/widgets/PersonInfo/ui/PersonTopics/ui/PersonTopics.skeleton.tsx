import { CatalogCardSkeleton } from '@/entities/CatalogCard';
import { BaseList } from '@/shared/ui/List/List';
import { useCallback } from 'react';

type UsersTopicsProps = {
    count: number;
    className?: string;
};

export const PersonTopicsSkeleton = (props: UsersTopicsProps) => {
    const { count, className } = props;

    const items = Array.from({ length: count }, (_, index) => index);
    const render = useCallback((item: number) => <CatalogCardSkeleton key={item} />, []);

    return <BaseList className={className} items={items} render={render} />;
};
