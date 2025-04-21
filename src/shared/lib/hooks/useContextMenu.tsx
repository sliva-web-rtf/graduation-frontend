import { MenuProps } from '@mui/material/Menu';
import * as React from 'react';
import { useCallback, useMemo } from 'react';

type ContextMenuPosition = {
    mouseX: number;
    mouseY: number;
} | null;

export const useContextMenu = () => {
    const [contextMenu, setContextMenu] = React.useState<ContextMenuPosition>(null);

    const preserveTextSelection = useCallback(() => {
        const selection = document.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            setTimeout(() => {
                selection.addRange(range);
            });
        }
    }, []);

    const handleContextMenu = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();

            setContextMenu(
                contextMenu === null
                    ? {
                          mouseX: event.clientX + 2,
                          mouseY: event.clientY - 6,
                      }
                    : null,
            );

            preserveTextSelection();
        },
        [contextMenu, preserveTextSelection],
    );

    const handleClose = () => {
        setContextMenu(null);
    };

    const menuProps = useMemo(
        (): MenuProps => ({
            open: contextMenu !== null,
            onClose: handleClose,
            anchorReference: 'anchorPosition',
            anchorPosition: contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined,
        }),
        [contextMenu],
    );

    const value = useMemo(
        () => ({
            handleContextMenu,
            handleClose,
            contextMenu,
            menuProps,
            open: contextMenu !== null,
            position: contextMenu,
        }),
        [contextMenu, menuProps, handleContextMenu],
    );

    return value;
};
