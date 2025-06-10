import { isUserHeadSecretary, isUserSecretary } from '@/entities/User';
import { SITENAME } from '@/shared/lib/const';
import { MyStudents } from '@/widgets/MyStudents';
import { Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

const StagesPage = () => {
    const isSecretary = useSelector(isUserSecretary);
    const isHeadSecretary = useSelector(isUserHeadSecretary);
    const editable = isSecretary || isHeadSecretary;

    return (
        <>
            <Helmet>
                <title>Этапы ВКР | {SITENAME}</title>
            </Helmet>
            <Stack spacing={4} height="100%">
                <MyStudents editable={editable} />
            </Stack>
        </>
    );
};

export default StagesPage;
