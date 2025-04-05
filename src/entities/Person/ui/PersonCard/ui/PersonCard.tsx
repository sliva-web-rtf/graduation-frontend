import { Divider, Paper, Stack, Typography } from '@mui/material';
import { Person } from '../../../model';

const Row = ({ left, right }: { left: string; right?: string }) => (
    <Stack spacing={1} direction="row" justifyContent="space-between">
        <Typography
            variant="subtitle1"
            color="secondary"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '90%' }}
        >
            {left}
        </Typography>
        <Typography variant="subtitle1">{right || 'Не указано'}</Typography>
    </Stack>
);

export const PersonCard = (props: Person) => {
    const {
        fullName,
        contacts,

        // Для руководителя
        fullness = 0,
        limit = 0,

        // Для студента
        academicGroup,
        academicProgram,
    } = props;
    return (
        <Paper
            sx={(theme) => ({
                padding: theme.spacing(2),
                borderRadius: theme.spacing(2),
            })}
        >
            <Stack spacing={3}>
                <Typography variant="h2">{fullName}</Typography>
                <Divider />
                <Stack spacing={1}>
                    {Boolean(limit) && <Row left="Лимиты" right={[fullness, limit].join('/')} />}
                    {'academicProgram' in props && <Row left="Направление" right={academicProgram} />}
                    {academicGroup && <Row left="Группа" right={academicGroup} />}
                </Stack>
                <Divider />
                <Stack spacing={1}>
                    <Typography variant="subtitle1" color="secondary">
                        Контакты
                    </Typography>
                    <Typography>{contacts || 'Не указано'}</Typography>
                </Stack>
            </Stack>
        </Paper>
    );
};
