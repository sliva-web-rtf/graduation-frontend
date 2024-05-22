import { memo, useCallback } from 'react';
import { ScientificWork, useGetUsersScientificWorksQuery } from 'entities/ScientificWork';
import { transformDtoForCatalogCard } from 'entities/CatalogList/lib/helpers/transformDtoForCatalogCard';
import { CatalogCard } from 'entities/CatalogCard';
import { BaseList } from 'shared/ui/List/List';
import { Stack, Typography } from '@mui/material';
import { StudentThemesSkeleton } from './StudentThemes.skeleton';
import styles from './StudentThemes.module.scss';

interface ProfessorThemesProps {
    id: string;
}

export const StudentThemes = memo((props: ProfessorThemesProps) => {
    const { id } = props;

    const render = useCallback((item: ScientificWork) => {
        const transformed = transformDtoForCatalogCard(item);
        return <CatalogCard key={transformed.id} {...transformed} />;
    }, []);

    const { isFetching, data } = useGetUsersScientificWorksQuery({ userId: id });

    if (isFetching) {
        return (
            <Stack spacing={3} width="100%">
                <Typography variant="h3">Предложенные темы</Typography>
                <StudentThemesSkeleton count={3} />
            </Stack>
        );
    }

    return (
        <Stack spacing={3} width="100%">
            <Typography variant="h3">Предложенные темы</Typography>
            {!data?.length ? (
                <Typography>Ничего не найдено</Typography>
            ) : (
                <BaseList className={styles.list} items={data} render={render} />
            )}
        </Stack>
    );
});
