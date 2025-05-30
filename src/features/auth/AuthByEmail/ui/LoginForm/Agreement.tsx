import { BaseAlert, BaseButton, BaseModal } from '@/shared/ui';
import { Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export const Agreement = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <BaseModal
                size="small"
                title="Согласие на обработку персональных данных"
                open={open}
                onClose={handleClose}
                actionButton={
                    <BaseButton variant="contained" onClick={handleClose}>
                        Принять
                    </BaseButton>
                }
            >
                <Stack spacing={2}>
                    <BaseAlert severity="info">
                        Вы даёте своё согласие на обработку персональных данных в соответствии с Федеральным законом
                        №152-ФЗ «О персональных данных».
                    </BaseAlert>
                    <Typography>
                        Ваши данные используются исключительно в целях обеспечения функционирования, включая
                        идентификацию пользователя, предоставление доступа к соответствующему функционалу и хранение
                        данных, связанных с учебным процессом.
                    </Typography>
                    <Divider />
                    <Typography>
                        Подробнее об условиях обработки данных вы можете узнать в
                        <Typography component="span" fontWeight={600} color="primary" sx={{ cursor: 'pointer' }}>
                            {' '}
                            Политике конфиденциальности
                        </Typography>
                    </Typography>
                </Stack>
            </BaseModal>
            <Typography fontWeight={600} fontSize={14} color="secondary">
                Нажимая кнопку &quot;Войти&quot;, я соглашаюсь на
                <Typography
                    fontWeight={600}
                    fontSize={14}
                    color="primary"
                    onClick={handleOpen}
                    sx={{ cursor: 'pointer' }}
                >
                    обработку персональных данных
                </Typography>
            </Typography>
        </>
    );
};
