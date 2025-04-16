import { Role } from '@/entities/User';
import { BaseAlert } from '@/shared/ui';
import { Stack } from '@mui/material';

interface CommentProps {
    role: Role.Expert | Role.Secretary;
    text: string;
}

export const CommentCard = ({ role, text }: CommentProps) => {
    const isExpert = role === Role.Expert;
    const roleLabel = isExpert ? 'эксперта' : 'секретаря ГЭК';

    return (
        <Stack spacing={1}>
            <BaseAlert severity={isExpert ? 'warning' : 'error'} sx={{ border: 0 }}>
                <b>Комметарий {roleLabel}</b> <br /> {text}
            </BaseAlert>
        </Stack>
    );
};
