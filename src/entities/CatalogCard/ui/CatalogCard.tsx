import { PersonRequestButton } from '@/features/person/send-request';
import { TopicRequestButton } from '@/features/topic/send-request';
import { LimitInfo } from '@/shared/ui/LimitInfo/LimitInfo';
import { CatalogOption } from '@/widgets/Catalog';
import { Paper, Stack, Tooltip, Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getParentLink } from '../lib';
import { type ICatalogCard } from '../model/types/ICatalogCard';
import styles from './CatalogCard.module.scss';

export const CatalogCard = memo((props: ICatalogCard) => {
    const { id, title, subtitle, description, option, limit, fullness, isMine = false } = props;
    const parentLink = useMemo(() => getParentLink(option), [option]);
    const isTopics = option === CatalogOption.Topics;

    return (
        <Paper className={styles.card}>
            <Stack spacing={3}>
                <Stack spacing={1}>
                    <Typography variant="subtitle1" color="secondary">
                        {subtitle}
                    </Typography>
                    <Tooltip title={title}>
                        <Typography component={Link} to={`/${parentLink}/${id}`} variant="h3" className={styles.title}>
                            {title}
                        </Typography>
                    </Tooltip>
                </Stack>
                <Typography variant="subtitle2" fontWeight={500} className={styles.description}>
                    {description || 'Описание отсутствует'}
                </Typography>
            </Stack>
            {!isMine && (
                <Stack spacing={6} alignSelf="center" justifyContent="space-between">
                    <LimitInfo limit={limit} fullness={fullness} />
                    {isTopics ? (
                        <TopicRequestButton id={id} name={title} />
                    ) : (
                        <PersonRequestButton id={id} name={title} />
                    )}
                </Stack>
            )}
        </Paper>
    );
});
