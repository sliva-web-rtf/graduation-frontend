import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { BaseChip } from 'shared/ui/Chip/Chip';
import { BaseButton } from 'shared/ui/Button/Button';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { ICatalogCard } from 'entities/CatalogCard/model/types/ICatalogCard';
import { BaseList } from 'shared/ui/List/List';
import styles from './CatalogCard.module.scss';

export const CatalogCard = memo((props: ICatalogCard) => {
  const {
    title, chips, subtitle, status, image, limit,
  } = props;

  return (
    <Box sx={{ background: (theme) => theme.palette.background.default }} className={styles.card}>
      <img className={styles.image} src="/placeholder.svg" alt="" />
      <Box className={styles.content}>
        <Box className={styles.header}>
          <Typography
            variant="subtitle1"
            color={(theme) => theme.palette.secondary.main}
          >
            {subtitle}
          </Typography>
          <Typography variant="h3">{title}</Typography>
        </Box>
        <BaseList
          className={styles.chips}
          items={chips}
          render={(item: string) => <BaseChip key={item} variant="outlined" label={item} />}
        />
      </Box>
      <Box className={styles.actions}>
        {limit
              && (
                <Box className={styles.limit}>
                  <Typography
                    variant="body2"
                    color={(theme) => theme.palette.secondary.main}
                  >
                    Лимит
                  </Typography>
                  <Typography variant="body2">
                    {limit?.current}
                    /
                    {limit?.max}
                  </Typography>
                </Box>
              )}
        <BaseButton variant="contained">Отправить запрос</BaseButton>
        <BaseButton variant="text" startIcon={<StarOutlineRoundedIcon />}>Добавить в избранное</BaseButton>
      </Box>
    </Box>
  );
});
