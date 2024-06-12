import { memo } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { InfoCard, InfoInterests } from '@/shared/ui';
import { getFormattedScientificArea } from '@/shared/lib/helpers/getFormattedScientificArea';
import { ScientificAreas } from '@/features/catalog/Search/api/types';

interface ProfessorPortfolioProps {
    readonly about?: string;
    readonly scientificArea?: ScientificAreas;
    readonly scientificInterests?: Array<string>;
}

export const StudentPortfolio = memo((props: ProfessorPortfolioProps) => {
    const { about, scientificArea, scientificInterests } = props;
    const formattedScientificArea = getFormattedScientificArea(scientificArea || []);

    return (
        <Grid container gap={3}>
            <Grid item xs={7}>
                <Stack spacing={3} alignItems="flex-start">
                    <InfoCard title="О себе" text={about} />
                    <InfoCard formatted title="Область науки и технологий" text={formattedScientificArea} />
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
