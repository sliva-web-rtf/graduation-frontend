import { RoutePath } from '@/app/providers/Router';
import { ComissionForm } from '@/features/comission/create-commission';
import { EditCommissionContextProvider, useGetCommissionQuery } from '@/features/comission/edit-commision';
import { PageLoader } from '@/shared/ui';
import { BackButton } from '@/widgets/BackButton';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

const EditCommissionPage = () => {
    const { id } = useParams();

    const { data: forms, isFetching } = useGetCommissionQuery({ id: id! }, { skip: !id });

    if (isFetching) {
        return <PageLoader />;
    }

    const commissionName = forms?.info.data?.name;

    return (
        <>
            <Helmet>
                <title>{commissionName} | Редактирование комиссии</title>
            </Helmet>
            <Stack spacing={6} height="100%">
                <Stack spacing={4}>
                    <BackButton to={RoutePath.Commissions}>Вернуться к списку комиссий</BackButton>
                    <Typography variant="h1">
                        Редактирование комиссии <b>&ldquo;{commissionName}&rdquo;</b>
                    </Typography>
                </Stack>
                <EditCommissionContextProvider initialData={forms}>
                    <ComissionForm />
                </EditCommissionContextProvider>
            </Stack>
        </>
    );
};

export default EditCommissionPage;
