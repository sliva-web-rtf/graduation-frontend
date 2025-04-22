import { Stack } from '@mui/material';
import { BaseAlert } from '../Alert/Alert';

type ErrorPageMessageProps = {
    severity?: 'warning' | 'error';
    message?: string;
};

export const ErrorPageMessage = (props: ErrorPageMessageProps) => {
    const { severity = 'error', message = 'Произошла ошибка при получении данных' } = props;

    return (
        <Stack alignItems="center" justifyContent="center" height="100%">
            <BaseAlert severity={severity} sx={{ alignSelf: 'center', width: 'inherit !important' }}>
                {message}
            </BaseAlert>
        </Stack>
    );
};
