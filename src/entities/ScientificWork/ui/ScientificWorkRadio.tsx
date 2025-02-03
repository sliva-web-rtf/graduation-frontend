import { memo } from 'react';
import { Avatar, Paper, Radio, Stack, Typography } from '@mui/material';
import scientificWorkImage from '@/shared/assets/images/scientificWork.png';

interface ScientificWorkRadioProps {
    readonly id: string;
    readonly name: string;
    readonly fullness: number;
    readonly limit: number;
}

export const ScientificWorkRadio = memo((props: ScientificWorkRadioProps) => {
    const { id, name, fullness, limit } = props;

    return (
        <Stack direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
            <Radio value={id} />
            <Paper
                sx={(theme) => ({
                    width: '100%',
                    padding: theme.spacing(2),
                    borderRadius: theme.spacing(3),
                })}
            >
                <Stack direction="row" spacing={2} width="100%" alignItems="center">
                    <Avatar src={scientificWorkImage} variant="circular" sx={{ width: 40, height: 40 }} alt="" />
                    <Stack width="100%">
                        <Typography variant="h4">{name}</Typography>
                        <Typography variant="subtitle2" color="secondary">
                            {`Исследователи: ${fullness}/${limit}`}
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
});
