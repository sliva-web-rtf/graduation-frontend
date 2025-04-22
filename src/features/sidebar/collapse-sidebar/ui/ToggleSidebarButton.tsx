import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton, Tooltip } from '@mui/material';
import { memo } from 'react';

type ToggleSidebarButtonProps = {
    expanded: boolean;
    onClick: () => void;
};

export const ToggleSidebarButton = memo((props: ToggleSidebarButtonProps) => {
    const { expanded, onClick } = props;

    return (
        <Tooltip title={expanded ? 'Свернуть меню' : 'Развернуть меню'} placement="right-end">
            <IconButton
                sx={(theme) => ({
                    position: expanded ? 'absolute' : 'static',
                    right: `-${theme.spacing(2.5)}`,
                    backgroundColor: theme.palette.background.default,
                    borderRadius: theme.spacing(1),
                })}
                onClick={onClick}
            >
                {expanded ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
        </Tooltip>
    );
});
