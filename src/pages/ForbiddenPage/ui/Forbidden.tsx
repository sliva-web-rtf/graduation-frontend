import { ErrorPageMessage } from '@/shared/ui';
import { BackButton } from '@/widgets/BackButton';
import { Stack } from '@mui/material';
import { memo } from 'react';

const ForbiddenPage = memo(() => (
    <Stack height="100%" spacing={4}>
        <BackButton />
        <ErrorPageMessage severity="warning" message="У вас недостаточно прав для просмотра этого раздела" />
    </Stack>
));

export default ForbiddenPage;
