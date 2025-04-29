import { CommissionModel } from '@/entities/Comission';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { ComissionInfoRow } from './ComissionInfoRow';

type Props = Pick<CommissionModel, 'name' | 'secretaryName' | 'expertsNames' | 'chairpersonName'>;

const getExpertLabel = (expert: CommissionModel['expertsNames'][number], index: number) => {
    return [`Эксперт ${index + 1}`, expert.isInvited ? '(приглашенный)' : ''].filter(Boolean).join(' ');
};

export const ComissionInfo = (props: Props) => {
    const { name, secretaryName, expertsNames, chairpersonName } = props;

    return (
        <Paper sx={{ p: 3, borderRadius: 3, width: '100%', height: '100%' }}>
            <Stack spacing={2}>
                <Typography variant="h2">{name}</Typography>
                <Stack divider={<Divider />} spacing={1}>
                    <ComissionInfoRow left="Ответственный секретарь" right={secretaryName} />
                    <ComissionInfoRow left="Председатель" right={chairpersonName} />
                    {expertsNames?.map((expert, index) => {
                        const label = getExpertLabel(expert, index);

                        return <ComissionInfoRow key={expert.name} left={label} right={expert.name} />;
                    })}
                </Stack>
            </Stack>
        </Paper>
    );
};
