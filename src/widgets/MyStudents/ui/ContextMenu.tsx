import BlockIcon from '@mui/icons-material/Block';
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuProps } from '@mui/material';
import { SetDefenceDateButton } from './SetDefenceDateButton';

type ContextMenuProps = {
    handleClose: () => void;
    menuProps: MenuProps;
};

export const ContextMenu = (props: ContextMenuProps) => {
    const { handleClose, menuProps } = props;

    return (
        <Menu {...menuProps}>
            <SetDefenceDateButton isMenuItem onClick={handleClose} />
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <BlockIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Закрыть</ListItemText>
            </MenuItem>
        </Menu>
    );
};
