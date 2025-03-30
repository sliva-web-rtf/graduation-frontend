import { Paper, Stack, Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LimitInfo } from '@/shared/ui/LimitInfo/LimitInfo';
import { RequestButton } from '@/features/entity/AddRequests';
import { getParentLink } from '../lib';
import { type ICatalogCard } from '../model/types/ICatalogCard';
import styles from './CatalogCard.module.scss';

export const CatalogCard = memo((props: ICatalogCard) => {
    const { id, title, subtitle, description, option, canJoin, commandSearching, professorSearching, limit, fullness } =
        props;

    const parentLink = useMemo(() => getParentLink(option), [option]);

    const text =
        // eslint-disable-next-line max-len
        'Разработка эффективных численных методов, параллельных алгоритмов и программ решения задач математической физики на многопроцессорных вычислительных системах, разработка методов глубокого обучения и обработка радиолокационных данных для построения цифровых моделей рельефа земной поверхности.';

    return (
        <Paper
            component={Link}
            to={`/${parentLink}/${id}`}
            className={styles.card}
            sx={{ '&:hover': { textDecoration: 'none' } }}
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
                    {description || text}
                </Typography>
            </Stack>
            <Stack spacing={6} alignSelf="center" justifyContent="space-between">
                <LimitInfo limit={limit} fullness={fullness} />
                <RequestButton
                    id={id}
                    commandSearching={Boolean(commandSearching)}
                    professorSearching={Boolean(professorSearching)}
                    canJoin={Boolean(canJoin)}
                />
            </Stack>
        </Paper>
    );
});
