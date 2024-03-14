import {
  Box, InputAdornment, Modal, Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { BaseButton } from 'shared/ui/Button/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useState } from 'react';
import { InputField } from '../AddThemeModalField/InputField';
import styles from './AddThemeModal.module.scss';

export const AddThemeModal = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <BaseButton
        sx={{ padding: (theme) => [theme.spacing(1), theme.spacing(3)].join(' ') }}
        variant="shadowed"
        startIcon={<AddRoundedIcon />}
        onClick={toggleOpen}
      >
        Предложить тему
      </BaseButton>
      <Modal className={styles.backdrop} open={isOpen}>
        <Box className={styles.modal}>
          <BaseButton
            sx={{ padding: (theme) => theme.spacing(1) }}
            variant="contained"
            onClick={toggleOpen}
          >
            <CloseRoundedIcon />
          </BaseButton>
          <Box
            className={styles.content}
            sx={{ backgroundColor: (theme) => theme.palette.background.default }}
          >
            <Typography variant="h3">Предложение темы для исследования</Typography>
            <Box component="form" className={styles.form}>
              <InputField
                label="Название темы"
                placeholder="Введите название темы исследования"
              />
              <InputField
                label="Описание темы"
                placeholder="Кратко изложите о чем будет исследование"
                multiline
                rows={3}
              />
              <InputField
                label="Проблема и актуальность"
                placeholder="Опишите проблематику исследования и ее актуальность"
                multiline
                rows={3}
              />
              <InputField
                label="Область науки и технологий"
                placeholder="Выбрать область науки и технологий"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><ExpandMoreRoundedIcon /></InputAdornment>,
                }}
              />
              <InputField
                label="Ключевые слова"
                placeholder="Начните писать и выберите из списка"
              />
              <BaseButton
                sx={{
                  alignSelf: 'end',
                  marginTop: (theme) => theme.spacing(4),
                  padding: (theme) => [theme.spacing(1), theme.spacing(3)].join(' '),
                }}
                variant="contained"
              >
                Предложить
              </BaseButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
