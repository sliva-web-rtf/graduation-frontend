import { PersonSummary } from '@/entities/Person/ui/PersonSummary';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { CommissionMember } from '../../../model';

interface TopicCommissionRowProps {
    member: CommissionMember;
}

export const TopicCommissionRow: FC<TopicCommissionRowProps> = ({ member }) => {
    const { id, fullName } = member.user;

    return (
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2">{member.role}</Typography>
            <PersonSummary id={id} name={fullName} />
        </Stack>
    );
};
