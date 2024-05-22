import { Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';

interface ManualArticleProps {
    readonly title?: string;
}

export const ManualArticleNavigation = memo((props: ManualArticleProps) => {
    const { title } = props;

    return (
        <Stack
            spacing={3}
            component={Paper}
            width={300}
            borderRadius={3}
            p={2}
            sx={(theme) => ({
                position: 'sticky',
                alignSelf: 'flex-start',
                top: theme.spacing(4),
            })}
        >
            <Typography variant="h3">Содержание</Typography>
            <Stack>
                <Typography color="primary">Наукометрические базы — что это и зачем нужны?</Typography>
                <Typography color="primary">Список существующих сервисов</Typography>
                <Stack marginLeft={2}>
                    <Typography color="primary">Scopus</Typography>
                    <Typography color="primary">Web of Science</Typography>
                    <Typography color="primary">РИНЦ</Typography>
                    <Typography color="primary">Академия Google</Typography>
                </Stack>
                <Typography color="primary">Заключение</Typography>
            </Stack>
        </Stack>
    );
});
