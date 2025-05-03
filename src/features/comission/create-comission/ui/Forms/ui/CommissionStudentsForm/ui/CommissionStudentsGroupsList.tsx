import { BaseAlert, BaseChip } from '@/shared/ui';
import { Stack } from '@mui/material';
import { memo } from 'react';

type CommissionStudentsGroupsListProps = {
    academicGroups?: string[];
};

export const CommissionStudentsGroupsList = memo((props: CommissionStudentsGroupsListProps) => {
    const { academicGroups } = props;

    if (!academicGroups?.length) {
        return <BaseAlert severity="info">Академические группы не выбраны</BaseAlert>;
    }

    return (
        <Stack spacing={2} direction="row" flexWrap="wrap" alignItems="center">
            <BaseChip label="Выбранные академ. группы:" />
            <Stack spacing={0.5} direction="row" flexWrap="wrap" alignItems="center">
                {academicGroups.map((group) => (
                    <BaseChip key={group} label={group} color="info" />
                ))}
            </Stack>
        </Stack>
    );
});
