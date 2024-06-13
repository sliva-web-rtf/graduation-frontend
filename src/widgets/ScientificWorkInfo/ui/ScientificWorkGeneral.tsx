import { memo } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { InfoCard, InfoInterests } from '@/shared/ui';
import { getFormattedScientificArea } from '@/shared/lib/helpers/getFormattedScientificArea';
import { ScientificWorkStudents } from '@/widgets/ScientificWorkInfo/ui/ScientificWorkStudents';
import { Student } from '@/entities/Student';
import { ScientificAreaDto } from '@/entities/ScientificAreas/api/types';

interface ScientificWorkGeneralProps {
    readonly description: string;
    readonly result: string;
    readonly fullness: number;
    readonly limit: number;
    readonly students: Array<Student>;
    readonly scientificArea?: ScientificAreaDto[];
    readonly scientificInterests?: Array<string>;
}

export const ScientificWorkGeneral = memo((props: ScientificWorkGeneralProps) => {
    const { description, result, scientificArea, scientificInterests, fullness, limit, students } = props;
    const formattedScientificArea = getFormattedScientificArea(scientificArea);

    return (
        <Grid container gap={3}>
            <Grid item xs={7}>
                <Stack spacing={3} alignItems="flex-start">
                    <InfoCard title="Описание темы" text={description} />
                    <InfoCard title="Ожидаемый эффект" text={result} />
                    <InfoCard formatted title="Область науки и технологий" text={formattedScientificArea} />
                </Stack>
            </Grid>
            <Grid item xs>
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <Typography variant="h3" color="secondary">
                            Cферы научных интересов
                        </Typography>
                        <InfoInterests chips={scientificInterests} />
                    </Stack>
                    <ScientificWorkStudents fullness={fullness} limit={limit} students={students} />
                </Stack>
            </Grid>
        </Grid>
    );
});
