import { memo, useMemo } from 'react';
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { BaseChip } from 'shared/ui/Chip/Chip';
import { BaseList } from 'shared/ui/List/List';
import { LimitInfo } from 'shared/ui/LimitInfo/LimitInfo';
import { AddProfessorButton, AddToFavoritesButton } from 'features/entity/AddRequests';
import { WorkStatus, WorkStatusRus } from 'entities/ScientificWork/model/types/workStatus';
import { getParentLink } from 'entities/CatalogCard/lib/helpers/getParentLink';
import scientificWorkImage from 'shared/assets/images/scientificWork.png';
import { Link } from 'react-router-dom';
import { ICatalogCard } from '../model/types/ICatalogCard';
import styles from './CatalogCard.module.scss';

export const CatalogCard = memo((props: ICatalogCard) => {
    const { id, title, chips, subtitle, image, limit, fullness, workStatus, option, isFavorite, canJoin } = props;

    const parentLink = useMemo(() => getParentLink(option), [option]);

    return (
        <Paper className={styles.card} sx={{ borderRadius: 4 }}>
            <Avatar
                src={workStatus ? scientificWorkImage : image}
                alt={title}
                sx={{ width: 1, height: 1, borderRadius: 3 }}
            />
            <Stack spacing={3} justifyContent="space-between" overflow="hidden">
                <Stack spacing={1}>
                    {workStatus ? (
                        <BaseChip
                            label={WorkStatusRus[workStatus]}
                            sx={{
                                alignSelf: 'flex-start',
                                backgroundColor: `${
                                    workStatus === WorkStatus.Confirmed ? 'success' : 'secondary'
                                }.light`,
                            }}
                        />
                    ) : (
                        <Typography variant="subtitle1" color="secondary">
                            {subtitle}
                        </Typography>
                    )}
                    <Link to={`/${parentLink}/${id}`} color="inherit">
                        <Typography variant="h3">{title}</Typography>
                    </Link>
                </Stack>
                <BaseList
                    className={styles.chips}
                    items={chips}
                    render={(item: string) => <BaseChip key={item} variant="outlined" label={item} />}
                />
            </Stack>
            <Stack spacing={1} alignSelf="flex-end" alignItems="flex-end">
                <LimitInfo limit={limit} fullness={fullness} />
                {workStatus !== WorkStatus.NotConfirmed && <AddProfessorButton id={id} canJoin={canJoin} />}

                <AddToFavoritesButton id={id} isFavorite={isFavorite} option={option} />
            </Stack>
        </Paper>
    );
});
