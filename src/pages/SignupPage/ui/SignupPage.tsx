import { Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import figure1 from '@/shared/assets/images/login-fig-1.png';
import figure2 from '@/shared/assets/images/login-fig-2.png';
import Logo from '@/shared/ui/Logo/Logo';
import classNames from './SignupPage.module.scss';
import { SignupForm } from '@/features/reg';

const SignupPage = () => (
    <>
        <Helmet>
            <title>Регистрация | SCI Join</title>
        </Helmet>
        <Stack className={classNames.container}>
            <img className={classNames.fig1} src={figure1} alt="" />
            <img className={classNames.fig2} src={figure2} alt="" />
            <Stack component={Paper} className={classNames.formWrapper} spacing={3}>
                <Logo />
                <SignupForm className={classNames.form} />
            </Stack>
        </Stack>
    </>
);

export default SignupPage;
