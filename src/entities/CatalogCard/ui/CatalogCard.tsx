import { Box, Paper, Stack, Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getParentLink } from '@/entities/CatalogCard/lib/helpers/getParentLink';
import { RequestButton } from '@/features/entity/AddRequests';
import { type ICatalogCard } from '../model/types/ICatalogCard';
import styles from './CatalogCard.module.scss';

/* eslint-disable no-nested-ternary */

export const CatalogCard = memo((props: ICatalogCard) => {
    const { id, title, subtitle, option, canJoin, commandSearching, professorSearching } = props;

    const parentLink = useMemo(() => getParentLink(option), [option]);

    return (
        <Box
            component={Link}
            to={`/${parentLink}/${id}`}
            className={styles.card}
            sx={{ borderRadius: 3, '&:hover': { textDecoration: 'none' } }}
        >
            <Stack spacing={3}>
                <Stack spacing={1}>
                    <Typography variant="subtitle1" color="secondary">
                        {subtitle || 'Текст'}
                    </Typography>
                    <Typography variant="h3" className={styles.title}>
                        {title || 'Текст'}
                    </Typography>
                </Stack>
                <Typography variant="subtitle1" fontFamily="Manrope" fontWeight={500} className={styles.description}>
                    Разработка эффективных численных методов, параллельных алгоритмов и программ решения задач
                    математической физики на многопроцессорных вычислительных системах, разработка методов глубокого
                    обучения и обработка радиолокационных данных для построения цифровых моделей рельефа земной
                    поверхности.
                </Typography>
            </Stack>
            <Stack alignSelf="center">
                <RequestButton
                    id={id}
                    commandSearching={Boolean(commandSearching)}
                    professorSearching={Boolean(professorSearching)}
                    canJoin={Boolean(canJoin)}
                />
            </Stack>
        </Box>
    );
});
