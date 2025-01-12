import { Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import figure1 from '@/shared/assets/images/login-fig-1.png';
import figure2 from '@/shared/assets/images/login-fig-2.png';
import Logo from '@/shared/ui/Logo/Logo';
import classNames from './SignupPage.module.scss';
import { SignupForm } from '@/features/reg';
import { OneTimeCodeForm } from '@/features/oneTimeCodeForm';

const SignupPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const step = searchParams.get('step') || 'signup';

    const handleNextStep = () => setSearchParams({ step: 'code' });

    return (
        <>
            <Helmet>
                <title>Регистрация | SCI Join</title>
            </Helmet>
            <Stack className={classNames.container}>
                <img className={classNames.fig1} src={figure1} alt="" />
                <img className={classNames.fig2} src={figure2} alt="" />
                <Stack component={Paper} className={classNames.formWrapper} spacing={3}>
                    <Logo />
                    {step === 'signup' && <SignupForm className={classNames.form} onNext={handleNextStep} />}
                    {step === 'code' && <OneTimeCodeForm />}
                </Stack>
            </Stack>
        </>
    );
};

export default SignupPage;
