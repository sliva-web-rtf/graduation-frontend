import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { PersonSummary } from '@/entities/Person/ui/PersonSummary';
import { CommissionMember } from '../../../model';

interface TopicCommissionRowProps {
    member: CommissionMember;
}

export const TopicCommissionRow: FC<TopicCommissionRowProps> = ({ member }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>{member.role}</Typography>
            <PersonSummary id={member.user.id} name={member.user.fullname} role={member.user.position} />
        </Box>
    );
};
