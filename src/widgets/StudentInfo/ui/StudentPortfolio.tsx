import { memo } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { InfoCard, InfoInterests } from 'shared/ui';

interface ProfessorPortfolioProps {
    readonly about?: string;
    readonly scientificArea?: Array<string>;
    readonly scientificInterests?: Array<string>;
}

export const StudentPortfolio = memo((props: ProfessorPortfolioProps) => {
    const { about, scientificArea, scientificInterests } = props;

    return (
        <Grid container gap={3}>
            <Grid item xs={7}>
                <Stack spacing={3} alignItems="flex-start">
                    <InfoCard title="О себе" text={about || 'Пусто'} />
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
