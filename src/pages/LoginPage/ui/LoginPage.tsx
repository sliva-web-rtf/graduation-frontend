import { LoginForm } from '@/features/auth/AuthByEmail';
import figure1 from '@/shared/assets/images/login-fig-1.png';
import figure2 from '@/shared/assets/images/login-fig-2.png';
import { SITENAME } from '@/shared/lib/const';
import Logo from '@/shared/ui/Logo/Logo';
import { Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import classNames from './LoginPage.module.scss';

const LoginPage = () => (
    <>
        <Helmet>
            <title>Авторизация | {SITENAME}</title>
        </Helmet>
        <Stack className={classNames.container} alignItems="center" justifyContent="center">
            <img className={classNames.fig1} src={figure1} alt="" />
            <img className={classNames.fig2} src={figure2} alt="" />
            <Stack component={Paper} className={classNames.formWrapper} spacing={3} alignItems="center">
                <Logo />
                <LoginForm />
            </Stack>
        </Stack>
    </>
);

export default LoginPage;
