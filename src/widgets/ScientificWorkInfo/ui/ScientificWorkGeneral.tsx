import { memo } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { InfoCard, InfoInterests } from 'shared/ui';

interface ScientificWorkGeneralProps {
    readonly description?: string;
    readonly result?: string;
    readonly scientificArea?: Array<string>;
    readonly scientificInterests?: Array<string>;
}

export const ScientificWorkGeneral = memo((props: ScientificWorkGeneralProps) => {
    const { description, result, scientificArea, scientificInterests } = props;

    return (
        <Grid container gap={3}>
            <Grid item xs={7}>
                <Stack spacing={3} alignItems="flex-start">
                    <InfoCard title="Описание темы" text={description || 'Пусто'} />
                    <InfoCard title="Ожидаемый эффект" text={result || 'Пусто'} />
                    <InfoCard title="Область науки и технологий" text={scientificArea?.toString() || 'Пусто'} />
                </Stack>
            </Grid>
            <Grid item xs>
                <Stack spacing={2}>
                    <Typography variant="h3" color="secondary">
                        Cферы научных интересов
                    </Typography>
                    <InfoInterests chips={scientificInterests} />
                </Stack>
            </Grid>
        </Grid>
    );
});
