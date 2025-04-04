import { Stack } from '@mui/material';
import { BaseAlert } from '../Alert/Alert';

type ErrorPageMessageProps = {
    message?: string;
};

export const ErrorPageMessage = (props: ErrorPageMessageProps) => {
    const { message = 'Произошла ошибка при получении данных' } = props;

    return (
        <Stack alignItems="center" justifyContent="center" height="100%">
            <BaseAlert severity="error" sx={{ alignSelf: 'center', width: 'inherit !important' }}>
                {message}
            </BaseAlert>
        </Stack>
    );
};
