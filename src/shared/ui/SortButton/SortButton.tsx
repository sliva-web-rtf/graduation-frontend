import { Sort as SortIcon } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import classNames from 'classnames';
import { memo } from 'react';
import { SortDirection } from '@/shared/lib/const';
import styles from './SortButton.module.scss';
import { getSortConfig } from './helpers';

type SortButtonProps = {
    onChange: (value: SortDirection) => void;
    order?: SortDirection;
};

export const SortButton = memo((props: SortButtonProps) => {
    const { order = SortDirection.DEFAULT, onChange } = props;
    const { tooltipTitle, nextOrder, icon, isDefault } = getSortConfig(order);

    const color = isDefault ? 'inherit' : 'primary';
    const backgroundColor = isDefault ? '#FFFFFF' : '#E6EDF5';
    const border = isDefault ? `1px solid ${grey[300]}` : 'none';

    return (
        <Tooltip title={tooltipTitle}>
            <IconButton
                onClick={() => onChange(nextOrder)}
                className={classNames(styles.iconButton)}
                sx={(theme) => ({
                    backgroundColor,
                    borderRadius: theme.spacing(2),
                    border,
                })}
            >
                <SortIcon fontSize="medium" color={color} />
                <Box className={classNames(styles.box)}>{icon}</Box>
            </IconButton>
        </Tooltip>
    );
});
