import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Profile } from '@/widgets/Profile';

const ProfilePage = () => (
    <>
        <Helmet>
            <title>Личный кабинет | SCI Join</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Typography variant="h1">Личный кабинет</Typography>
            <Profile />
        </Stack>
    </>
);

export default ProfilePage;
