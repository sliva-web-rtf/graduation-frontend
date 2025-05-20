import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton, Tooltip } from '@mui/material';
import { memo, MouseEvent } from 'react';

type ToggleSidebarButtonProps = {
    expanded: boolean;
    onClick: () => void;
};

export const ToggleSidebarButton = memo((props: ToggleSidebarButtonProps) => {
    const { expanded, onClick } = props;

    const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
        onClick();
        e.currentTarget.blur();
    };

    return (
        <Tooltip title={expanded ? 'Свернуть меню' : 'Развернуть меню'} placement="right-end">
            <IconButton
                sx={(theme) => ({
                    position: expanded ? 'absolute' : 'static',
                    right: `-${theme.spacing(2.5)}`,
                    backgroundColor: theme.palette.background.default,
                    borderRadius: theme.spacing(1),
                })}
                onClick={handleToggle}
            >
                {expanded ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>
        </Tooltip>
    );
});
