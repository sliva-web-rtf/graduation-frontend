import { memo } from 'react';
import {
  Avatar, Paper, Stack, Typography,
} from '@mui/material';
import { BaseChip } from 'shared/ui/Chip/Chip';
import { BaseButton } from 'shared/ui/Button/Button';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { ICatalogCard } from 'entities/CatalogCard/model/types/ICatalogCard';
import { BaseList } from 'shared/ui/List/List';
import { LimitInfo } from 'shared/ui/LimitInfo/LimitInfo';
import styles from './CatalogCard.module.scss';

export const CatalogCard = memo((props: ICatalogCard) => {
  const {
    title, chips, subtitle, status, image, limit,
  } = props;

  return (
    <Paper className={styles.card}>
      <Avatar src={image} alt={title} sx={{ width: 1, height: 1, borderRadius: 3 }} />
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="subtitle1" color="secondary">{subtitle}</Typography>
          <Typography variant="h3">{title}</Typography>
        </Stack>
        <BaseList
          className={styles.chips}
          items={chips}
          render={(item: string) => <BaseChip key={item} variant="outlined" label={item} />}
        />
      </Stack>
      <Stack spacing={1}>
        {limit && <LimitInfo {...limit} />}
        <BaseButton variant="contained">Отправить запрос</BaseButton>
        <BaseButton variant="text" startIcon={<StarOutlineRoundedIcon />}>Добавить в избранное</BaseButton>
      </Stack>
    </Paper>
  );
});
