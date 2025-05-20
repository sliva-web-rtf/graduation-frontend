import { Stack } from '@mui/material';
import { BaseAlert } from '../Alert/Alert';

type EmptyMessageProps = {
    message?: string;
};

export const EmptyMessage = (props: EmptyMessageProps) => {
    const { message = 'Информация отсутствует' } = props;

    return (
        <Stack alignItems="center" justifyContent="center" height="100%">
            <BaseAlert severity="info" sx={{ alignSelf: 'center', width: 'inherit !important' }}>
                {message}
            </BaseAlert>
        </Stack>
    );
};
