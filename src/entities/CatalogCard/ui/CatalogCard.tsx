import { memo } from 'react';
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { BaseChip } from 'shared/ui/Chip/Chip';
import { BaseList } from 'shared/ui/List/List';
import { LimitInfo } from 'shared/ui/LimitInfo/LimitInfo';
import { AddProfessor, AddToFavorites } from 'features/entity/AddRequests';
import { WorkStatus, WorkStatusRus } from 'entities/ScientificWork/model/types/workStatus';
import { ICatalogCard } from '../model/types/ICatalogCard';
import styles from './CatalogCard.module.scss';

export const CatalogCard = memo((props: ICatalogCard) => {
    const { title, chips, subtitle, image, limit, fullness, workStatus } = props;

    return (
        <Paper className={styles.card} sx={{ borderRadius: 4 }}>
            <Avatar src={image} alt={title} sx={{ width: 1, height: 1, borderRadius: 3 }} />
            <Stack spacing={3}>
                <Stack spacing={1}>
                    {workStatus && (
                        <BaseChip
                            label={WorkStatusRus[workStatus]}
                            sx={{
                                alignSelf: 'flex-start',
                                backgroundColor: `${
                                    workStatus === WorkStatus.Confirmed ? 'success' : 'secondary'
                                }.light`,
                            }}
                        />
                    )}
                    <Typography variant="subtitle1" color="secondary">
                        {subtitle}
                    </Typography>
                    <Typography variant="h3">{title}</Typography>
                </Stack>
                <BaseList
                    className={styles.chips}
                    items={chips}
                    render={(item: string) => <BaseChip key={item} variant="outlined" label={item} />}
                />
            </Stack>
            <Stack spacing={1}>
                <LimitInfo limit={limit} fullness={fullness} />
                <AddProfessor disabled />
                <AddToFavorites disabled />
            </Stack>
        </Paper>
    );
});
