import { BaseButton } from '@/shared/ui';
import EventIcon from '@mui/icons-material/Event';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMyStudentsState } from '../model';
import { SetDefenceDateModal } from './SetDefenceDateModal';

type SetDefenceDateButtonProps = {
    isMenuItem?: boolean;
    onClick?: () => void;
};

export const SetDefenceDateButton = memo((props: SetDefenceDateButtonProps) => {
    const { isMenuItem = false, onClick } = props;
    const { stage, selectedStudents } = useSelector(getMyStudentsState);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onClick?.();
    };

    return (
        <>
            {isMenuItem ? (
                <MenuItem onClick={handleOpen}>
                    <ListItemIcon>
                        <EventIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Назначить предзащиту</ListItemText>
                </MenuItem>
            ) : (
                <BaseButton
                    size="small"
                    variant="contained"
                    onClick={handleOpen}
                    disabled={!selectedStudents?.length}
                    startIcon={<EventIcon />}
                >
                    Назначить предзащиту
                </BaseButton>
            )}
            <SetDefenceDateModal open={open} onClose={handleClose} stage={stage} selectedStudents={selectedStudents} />
        </>
    );
});
