import { ErrorPageMessage } from '@/shared/ui';
import { BackButton } from '@/widgets/BackButton';
import { Stack } from '@mui/material';

const NotFoundPage = () => (
    <Stack height="100%" spacing={4}>
        <BackButton />
        <ErrorPageMessage severity="warning" message="Такой страницы не существует" />
    </Stack>
);

export default NotFoundPage;
