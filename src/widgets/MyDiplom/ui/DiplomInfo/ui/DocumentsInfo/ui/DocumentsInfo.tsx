import { DocumentAttach } from '@/entities/Document';
import { InfoCard } from '@/shared/ui';
import { Paper, Stack } from '@mui/material';

type TopicDocsProps = {
    formattingReviewerName?: string;
    editable?: boolean;
};

export const DocumentsInfo = (props: TopicDocsProps) => {
    const { formattingReviewerName, editable = false } = props;

    return (
        <Stack spacing={3} width="100%">
            <InfoCard title="Нормоконтроллер" text={formattingReviewerName} />
            <Stack component={Paper} spacing={1.5} p={3}>
                <DocumentAttach name="Пояснительная записка" uploadDate={new Date(Date.now())} editable={editable} />
                <DocumentAttach name="Авторский договор" editable={editable} />
                <DocumentAttach name="Отзыв руководителя" uploadDate={new Date(Date.now())} editable={editable} />
                <DocumentAttach name="NDA" editable={editable} />
            </Stack>
        </Stack>
    );
};
