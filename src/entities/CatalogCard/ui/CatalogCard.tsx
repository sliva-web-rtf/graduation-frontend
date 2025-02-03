import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getParentLink } from '@/entities/CatalogCard/lib/helpers/getParentLink';
import { WorkStatusRus } from '@/entities/ScientificWork/model/types/workStatus';
import {
    AddProfessorButton,
    AddScientificWorkButton,
    AddStudentButton,
    AddToFavoritesButton,
} from '@/features/entity/AddRequests';
import scientificWorkImage from '@/shared/assets/images/scientificWork.png';
import { getChipColorByWorkStatus } from '@/shared/lib/helpers/getChipColorByStatus';
import { ChipsGroup } from '@/shared/ui';
import { BaseChip } from '@/shared/ui/Chip/Chip';
import { LimitInfo } from '@/shared/ui/LimitInfo/LimitInfo';
import { CatalogOption } from '@/widgets/Catalog';
import { type ICatalogCard } from '../model/types/ICatalogCard';
import styles from './CatalogCard.module.scss';

/* eslint-disable no-nested-ternary */

export const CatalogCard = memo((props: ICatalogCard) => {
    const {
        id,
        title,
        chips,
        subtitle,
        avatarImagePath,
        limit,
        fullness,
        workStatus,
        option,
        isFavorite,
        canJoin,
        commandSearching,
        professorSearching,
    } = props;

    const parentLink = useMemo(() => getParentLink(option), [option]);

    return (
        <Paper
            component={Link}
            to={`/${parentLink}/${id}`}
            className={styles.card}
            sx={{ borderRadius: 4, '&:hover': { textDecoration: 'none' } }}
        >
            <Avatar
                src={workStatus ? scientificWorkImage : __API__ + avatarImagePath}
                alt={title}
                sx={{ width: 1, height: 1, borderRadius: 3 }}
            />
            <Stack spacing={2} justifyContent="space-between" overflow="hidden">
                <Stack spacing={1}>
                    {workStatus ? (
                        <BaseChip
                            label={WorkStatusRus[workStatus]}
                            sx={{
                                alignSelf: 'flex-start',
                                backgroundColor: getChipColorByWorkStatus(workStatus),
                            }}
                        />
                    ) : (
                        <Typography variant="subtitle1" color="secondary">
                            {subtitle}
                        </Typography>
                    )}
                    <Typography variant="h3" className={styles.title}>
                        {title}
                    </Typography>
                </Stack>
                <ChipsGroup chips={chips} />
            </Stack>
            <Stack spacing={4} justifyContent="space-between" alignSelf="center">
                <LimitInfo limit={limit} fullness={fullness} />
                <Stack spacing={1}>
                    {option === CatalogOption.Professors ? (
                        <AddProfessorButton id={id} canJoin={Boolean(canJoin)} />
                    ) : option === CatalogOption.Students ? (
                        <AddStudentButton
                            id={id}
                            commandSearching={Boolean(commandSearching)}
                            professorSearching={Boolean(professorSearching)}
                            canJoin={Boolean(canJoin)}
                        />
                    ) : (
                        <AddScientificWorkButton id={id} canJoin={Boolean(canJoin)} />
                    )}
                    <AddToFavoritesButton id={id} isFavorite={isFavorite} option={option} />
                </Stack>
            </Stack>
        </Paper>
    );
});
