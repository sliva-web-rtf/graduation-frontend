import { Avatar, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { RoutePath } from 'app/providers/Router/config/routeConfig';
import { memo } from 'react';

interface ProfessorSummaryProps {
    readonly id: string;
    readonly image?: string;
    readonly name: string;
}

export const ProfessorSummary = memo((props: ProfessorSummaryProps) => {
    const { id, image, name } = props;

    if (!id) {
        return (
            <Typography variant="body1" color="secondary">
                Научный руководитель неизвестен
            </Typography>
        );
    }

    return (
        <Stack direction="row" spacing={1}>
            <Avatar variant="circular" src={image} sx={{ width: 40, height: 40 }} />
            <Stack>
                <Link to={`/${RoutePath.Professors.split('/')[1]}/${id}`}>
                    <Typography variant="h4">{name}</Typography>
                </Link>
                <Typography variant="body1">Научный руководитель</Typography>
            </Stack>
        </Stack>
    );
});
