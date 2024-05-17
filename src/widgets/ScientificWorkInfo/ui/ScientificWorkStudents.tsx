import { Student, StudentSummary } from 'entities/Student';
import { Paper, Stack, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';

interface ScientificWorkStudentsProps {
    readonly fullness: number;
    readonly limit: number;
    readonly students?: Array<Student>;
}

export const ScientificWorkStudents = (props: ScientificWorkStudentsProps) => {
    const { fullness, limit, students } = props;

    return (
        <Paper
            sx={(theme) => ({
                padding: [theme.spacing(3), theme.spacing(2)].join(' '),
                borderRadius: theme.spacing(3),
            })}
        >
            <Stack spacing={3}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <GroupIcon color="primary" />
                    <Typography variant="h3">{`Участники (${fullness}/${limit})`}</Typography>
                </Stack>

                <Stack spacing={3}>
                    {students?.map((student) => <StudentSummary key={student.id} {...student} />)}
                </Stack>
            </Stack>
        </Paper>
    );
};
