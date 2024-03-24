import {
  InputAdornment, Modal, Paper, Stack, Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { BaseButton } from 'shared/ui/Button/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useState } from 'react';
import { InputField } from 'shared/ui/ModalField/InputField';
import styles from './NewThemeModal.module.scss';

export const NewThemeModal = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <BaseButton
        sx={{ py: 1, px: 3 }}
        variant="shadowed"
        startIcon={<AddRoundedIcon />}
        onClick={toggleOpen}
      >
        Предложить тему
      </BaseButton>
      <Modal className={styles.backdrop} open={isOpen}>
        <Stack direction="row" spacing={3} alignItems="flex-start" className={styles.modal}>
          <BaseButton variant="contained" sx={{ p: 1 }} onClick={toggleOpen}>
            <CloseRoundedIcon />
          </BaseButton>
          <form>
            <Stack component={Paper} className={styles.content} spacing={4} elevation={0}>
              <Typography variant="h3">Предложение темы для исследования</Typography>
              <Stack spacing={2}>
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
              </Stack>
              <BaseButton variant="contained" sx={{ alignSelf: 'end', py: 1, px: 3 }}>
                Предложить
              </BaseButton>
            </Stack>
          </form>
        </Stack>
      </Modal>
    </>
  );
};
