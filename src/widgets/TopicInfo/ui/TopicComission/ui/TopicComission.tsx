import { Stack, Typography, Paper, Divider, Box } from '@mui/material';
import { FC } from 'react';
import { PersonSummary } from '@/entities/Person/ui/PersonSummary';

interface CommissionMember {
    role: string;
    user: {
        id: string;
        fio: string;
        position: string;
    };
}

interface TopicComissionProps {
    members: CommissionMember[];
}

export const TopicComission: FC<TopicComissionProps> = ({ members }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: '#F9FBFD',
                width: '100%',
            }}
        >
            <Stack spacing={1}>
                <Typography variant="h5" fontWeight={700}>
                    Комиссия 1
                </Typography>

                <Stack divider={<Divider />} spacing={0}>
                    {members.map((member) => (
                        <Box
                            key={member.user.id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            py={1}
                        >
                            <Typography variant="body1">{member.role}</Typography>
                            <PersonSummary id={member.user.id} name={member.user.fio} role={member.user.position} />
                        </Box>
                    ))}
                </Stack>
            </Stack>
        </Paper>
    );
};
