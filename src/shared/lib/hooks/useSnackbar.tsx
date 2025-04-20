import { BaseAlert } from '@/shared/ui';
import { AlertProps, Snackbar } from '@mui/material';
import { SyntheticEvent, useCallback, useMemo, useState } from 'react';

export const useSnackbar = () => {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertProps['severity']>('error');
    const [message, setMessage] = useState('');

    const showSnackbar = useCallback((severity: AlertProps['severity'], message: string) => {
        setSeverity(severity);
        setMessage(message);
        setOpen(true);
    }, []);

    const handleClose = useCallback((_?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }, []);

    const value = useMemo(
        () => ({
            showSnackbar,
            Snackbar: (
                <Snackbar open={open} autoHideDuration={severity === 'error' ? 6000 : 5000} onClose={handleClose}>
                    <BaseAlert severity={severity} onClose={handleClose}>
                        {message}
                    </BaseAlert>
                </Snackbar>
            ),
        }),
        [handleClose, message, open, severity, showSnackbar],
    );

    return value;
};
