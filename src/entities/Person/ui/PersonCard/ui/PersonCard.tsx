import { Divider, Paper, Stack, Typography } from '@mui/material';
import { getFullName } from '@/shared/lib/helpers/getFullName';
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
        <Typography variant="subtitle1">{right}</Typography>
    </Stack>
);

export const PersonCard = (props: Person) => {
    const {
        firstName,
        lastName,
        patronymic,
        contacts,

        // Для руководителя
        post,
        degree,
        fullness,
        limit,

        // Для студента
        role,
        direction,
        group,
    } = props;
    const name = getFullName(firstName, lastName, patronymic);

    return (
        <Paper
            sx={(theme) => ({
                padding: theme.spacing(2),
                borderRadius: theme.spacing(2),
            })}
        >
            <Stack spacing={3}>
                <Typography variant="h3">{name}</Typography>
                <Divider />
                <Stack spacing={1}>
                    {'fullness' in props && <Row left="Лимиты" right={[fullness, limit].join('/')} />}
                    {'degree' in props && <Row left="Должность" right={post || degree} />}
                    {'role' in props && <Row left="Роль" right={role} />}
                    {'direction' in props && <Row left="Направление" right={direction} />}
                    {'group' in props && <Row left="Группа" right={group} />}
                </Stack>
                <Divider />
                <Typography>{contacts || 'Контакты не указаны'}</Typography>
            </Stack>
        </Paper>
    );
};
