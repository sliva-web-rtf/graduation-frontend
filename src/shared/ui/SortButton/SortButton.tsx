import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { Sort as SortIcon, ArrowUpward, ArrowDownward, SwapVert } from '@mui/icons-material';
import classNames from 'classnames';
import { SortDirection } from '@/shared/lib/const';
import styles from './SortButton.module.scss';

interface SortButtonProps {
    order: SortDirection;
    onChange: (newOrder: SortDirection) => void;
}

const getSortIcon = (order: SortDirection) => {
    const fontSize = 'inherit';

    switch (order) {
        case SortDirection.ASC:
            return <ArrowUpward fontSize={fontSize} />;
        case SortDirection.DESC:
            return <ArrowDownward fontSize={fontSize} />;
        default:
            return <SwapVert fontSize={fontSize} />;
    }
};

const getNextOrder = (order: SortDirection): SortDirection => {
    switch (order) {
        case SortDirection.DEFAULT:
            return SortDirection.ASC;
        case SortDirection.ASC:
            return SortDirection.DESC;
        case SortDirection.DESC:
            return SortDirection.DEFAULT;
        default:
            return SortDirection.DEFAULT;
    }
};

export const SortButton: React.FC<SortButtonProps> = ({ order, onChange }) => {
    const nextOrder = getNextOrder(order);

    return (
        <Tooltip title="Сортировать">
            <IconButton
                onClick={() => onChange(nextOrder)}
                className={classNames(styles.iconButton)}
                sx={{
                    backgroundColor: order !== SortDirection.DEFAULT ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                }}
            >
                <SortIcon fontSize="large" />
                <Box className={classNames(styles.box)}>{getSortIcon(order)}</Box>
            </IconButton>
        </Tooltip>
    );
};
