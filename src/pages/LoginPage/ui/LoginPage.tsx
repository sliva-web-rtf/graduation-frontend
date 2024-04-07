import { Stack, Typography } from '@mui/material';
import { LoginForm } from 'features/auth/AuthByEmail';
import classNames from './LoginPage.module.scss';

const LoginPage = () => (
    <Stack className={classNames.container} alignItems="center">
        <Typography variant="h2">Войти</Typography>
        <LoginForm className={classNames.loginForm} />
    </Stack>
);

export default LoginPage;
