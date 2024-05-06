import { memo, useMemo } from 'react';
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { getFullName } from 'shared/lib/helpers/getFullName';
import { Student } from '../model/types/student';

export const StudentCard = memo((props: Student) => {
    const { image, firstName, lastName, patronymic, degree, phoneNumber, email, contacts } = props;
    const name = useMemo(() => getFullName(firstName, lastName, patronymic), [firstName, lastName, patronymic]);

    return (
        <Paper
            sx={(theme) => ({
                padding: [theme.spacing(3), theme.spacing(2)].join(' '),
                borderRadius: theme.spacing(4),
            })}
        >
            <Stack spacing={3}>
                <Stack spacing={3} alignItems="center">
                    <Avatar src={image} alt={name} sx={{ width: 144, height: 144, borderRadius: 3 }} />
                    <Stack spacing={1} textAlign="center">
                        <Typography variant="h3">{name}</Typography>
                        <Typography variant="subtitle1" color="secondary">
                            {degree}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={1}>
                    <Typography variant="body1" color="secondary">
                        {phoneNumber}
                    </Typography>
                    <Typography variant="body1" color="secondary">
                        {email}
                    </Typography>
                    <Typography variant="body1" color="secondary">
                        {contacts}
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
});
