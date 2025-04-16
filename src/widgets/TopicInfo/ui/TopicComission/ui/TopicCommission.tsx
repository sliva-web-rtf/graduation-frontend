import { Divider, Paper, Stack, Typography } from '@mui/material';
import { CommissionMember } from '../../../model/index';
import { TopicCommissionRow } from './TopicCommissionRow';

interface TopicCommissionProps {
    name: string;
    members: CommissionMember[];
}

export const TopicCommission = (props: TopicCommissionProps) => {
    const { name, members } = props;

    return (
        <Paper sx={{ p: 3, borderRadius: 3, width: '100%' }}>
            <Stack spacing={2}>
                <Typography variant="h2">{name}</Typography>
                <Stack divider={<Divider />} spacing={1}>
                    {members.map((member) => (
                        <TopicCommissionRow key={member.user.id} member={member} />
                    ))}
                </Stack>
            </Stack>
        </Paper>
    );
};
