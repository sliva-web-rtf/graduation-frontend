import { CommissionModel } from '@/entities/Comission';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { ComissionInfoRow } from './ComissionInfoRow';

type Props = Pick<CommissionModel, 'name' | 'secretaryName' | 'expertsNames'>;

export const ComissionInfo = (props: Props) => {
    const { name, secretaryName, expertsNames } = props;

    return (
        <Paper sx={{ p: 3, borderRadius: 3, width: '100%', height: '100%' }}>
            <Stack spacing={2}>
                <Typography variant="h2">{name}</Typography>
                <Stack divider={<Divider />} spacing={1}>
                    <ComissionInfoRow left="Ответственный секретарь" right={secretaryName} />
                    <ComissionInfoRow left="Председатель" right={secretaryName} />
                    {expertsNames?.map((expert, index) => (
                        <ComissionInfoRow key={expert} left={`Эксперт ${index + 1}`} right={expert} />
                    ))}
                </Stack>
            </Stack>
        </Paper>
    );
};
