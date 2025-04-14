import { Stack, Typography, Paper, Divider } from '@mui/material';
import { FC } from 'react';
import { CommissionMember } from '../../../model/index';
import { TopicCommissionRow } from './TopicCommissionRow';

interface TopicCommissionProps {
    name: string;
    members: CommissionMember[];
}

export const TopicCommission: FC<TopicCommissionProps> = ({ name, members }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: '#FFFFFF',
                width: '100%',
            }}
        >
            <Stack spacing={1}>
                <Typography variant="h5" fontWeight={700}>
                    {name}
                </Typography>
                <Stack divider={<Divider />} spacing={1}>
                    {members.map((member) => (
                        <TopicCommissionRow key={member.user.id} member={member} />
                    ))}
                </Stack>
            </Stack>
        </Paper>
    );
};
