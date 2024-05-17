import { Student, StudentSummary } from 'entities/Student';
import { Paper, Stack, Typography } from '@mui/material';

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
                <Typography variant="h3">{`Участники (${fullness}/${limit})`}</Typography>
                <Stack spacing={3}>
                    {students?.map((student) => <StudentSummary key={student.id} {...student} />)}
                </Stack>
            </Stack>
        </Paper>
    );
};
