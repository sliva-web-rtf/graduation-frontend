import { memo, ReactNode } from 'react';
import { Box } from '@mui/material';

interface ListProps<T> {
    items: T[];
    render: (item: T) => ReactNode;
    className?: string;
}

export function BaseList<T>(props: ListProps<T>) {
    const { items, render, className } = props;

    return <Box className={className}>{items.map((item) => render(item))}</Box>;
}
