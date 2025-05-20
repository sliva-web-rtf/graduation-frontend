import { SITENAME } from '@/shared/lib/const';
import { MyDiplom } from '@/widgets/MyDiplom';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

const DiplomPage = () => {
    const { id } = useParams();

    return (
        <>
            <Helmet>
                <title>ВКР | {SITENAME}</title>
            </Helmet>
            <Stack spacing={4} height="100%">
                <Typography variant="h1">Выпускная квалификационная работа</Typography>
                <MyDiplom qualificationWorkId={id} editable={false} />
            </Stack>
        </>
    );
};

export default DiplomPage;
