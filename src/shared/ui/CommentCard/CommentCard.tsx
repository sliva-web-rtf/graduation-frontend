import { Card, CardContent, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatDate } from '@/shared/lib/helpers/formatDate';

interface CommentProps {
    role: 'expert' | 'secretary';
    text: string;
    date: Date;
}

const StyledCard = styled(Card)<{ isExpert: boolean }>(({ isExpert }) => ({
    backgroundColor: isExpert ? '#FFF9C4' : '#FFCDD2',
    borderRadius: '12px',
    boxShadow: 'none',
}));

export const CommentCard = ({ role, text, date }: CommentProps) => {
    const isExpert = role === 'expert';
    const roleLabel = isExpert ? 'эксперта' : 'секретаря';

    return (
        <StyledCard isExpert={isExpert}>
            <CardContent>
                <Typography variant="body1">{text}</Typography>
                <Stack direction="row" justifyContent="space-between" mt={1}>
                    <Typography color="textSecondary" variant="body2" fontWeight="bold">
                        Комментарий от {roleLabel}
                    </Typography>
                    <Typography color="textSecondary" variant="body2" fontWeight="bold">
                        {formatDate(date)}
                    </Typography>
                </Stack>
            </CardContent>
        </StyledCard>
    );
};
