import { Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import { LoginForm } from '@/features/auth/AuthByEmail';
import Logo from '@/shared/ui/Logo/Logo';
import figure1 from '@/shared/assets/images/login-fig-1.png';
import figure2 from '@/shared/assets/images/login-fig-2.png';
import classNames from './LoginPage.module.scss';

const LoginPage = () => (
    <>
        <Helmet>
            <title>Авторизация | SCI Join</title>
        </Helmet>
        <Stack className={classNames.container} alignItems="center" justifyContent="center">
            <img className={classNames.fig1} src={figure1} alt="" />
            <img className={classNames.fig2} src={figure2} alt="" />
            <Stack component={Paper} className={classNames.formWrapper} spacing={3} alignItems="center">
                <Logo />
                <LoginForm className={classNames.form} />
            </Stack>
        </Stack>
    </>
);

export default LoginPage;
