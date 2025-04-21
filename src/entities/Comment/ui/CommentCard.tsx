import { BaseAlert } from '@/shared/ui';
import { Stack } from '@mui/material';

interface CommentProps {
    label?: string;
    text: string;
    severity?: 'error' | 'warning' | 'info';
}

export const CommentCard = ({ label = 'комиссии', text, severity = 'warning' }: CommentProps) => {
    return (
        <Stack spacing={1}>
            <BaseAlert severity={severity} sx={{ border: 0 }}>
                <b>Комметарий {label}</b> <br /> {text}
            </BaseAlert>
        </Stack>
    );
};
