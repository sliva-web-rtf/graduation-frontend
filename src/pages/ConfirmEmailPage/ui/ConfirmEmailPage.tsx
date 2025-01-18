import { Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import classNames from './ConfirmEmailPage.module.scss';
import figure1 from '@/shared/assets/images/login-fig-1.png';
import figure2 from '@/shared/assets/images/login-fig-2.png';
import Logo from '@/shared/ui/Logo/Logo';
import { OneTimeCodeForm } from '@/features/oneTimeCodeForm';

const ConfirmEmailPage = () => (
    <>
        <Helmet>
            <title>Подтверждение почты | SCI Join</title>
        </Helmet>
        <Stack className={classNames.container}>
            <img className={classNames.fig1} src={figure1} alt="" />
            <img className={classNames.fig2} src={figure2} alt="" />
            <Stack component={Paper} className={classNames.formWrapper} spacing={3}>
                <Logo />
                <OneTimeCodeForm />
            </Stack>
        </Stack>
    </>
);

export default ConfirmEmailPage;
