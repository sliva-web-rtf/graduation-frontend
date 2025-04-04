import { SITENAME } from '@/shared/lib/const';
import { MyStudents } from '@/widgets/MyStudents';
import { Stack } from '@mui/material';
import { Helmet } from 'react-helmet';

const MyStudentsPage = () => (
    <>
        <Helmet>
            <title>Мои студенты | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <MyStudents />
        </Stack>
    </>
);

export default MyStudentsPage;
