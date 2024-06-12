import { Helmet } from 'react-helmet';
import { Grid, Stack } from '@mui/material';
import { BackButton } from '@/widgets/BackButton';
import { RoutePath } from '@/app/providers/Router/config/routeConfig';
import { ManualArticle } from '@/widgets/ManualArticle';
import { ManualArticleNavigation } from '@/widgets/ManualArticleNavigation';

const ManualArticlePage = () => (
    <>
        <Helmet>
            <title>Справочник исследователя | SCI Join</title>
        </Helmet>
        <Stack spacing={6}>
            <BackButton to={RoutePath.Manual}>Вернуться к справочнику</BackButton>
            <Grid container gap={10} justifyContent="space-between">
                <Grid item xs={8}>
                    <ManualArticle />
                </Grid>
                <Grid item xs="auto" position="relative">
                    <ManualArticleNavigation />
                </Grid>
            </Grid>
        </Stack>
    </>
);

export default ManualArticlePage;
