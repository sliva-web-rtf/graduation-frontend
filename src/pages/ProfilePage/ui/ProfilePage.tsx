import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { SITENAME } from '@/shared/lib/const';
import { Profile } from '@/widgets/Profile';

const ProfilePage = () => (
    <>
        <Helmet>
            <title>Личный кабинет | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Typography variant="h1">Личный кабинет</Typography>
            <Profile />
        </Stack>
    </>
);

export default ProfilePage;
