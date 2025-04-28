import { DocumentAttach } from '@/entities/Document';
import { BaseAlert, InfoCard } from '@/shared/ui';
import { Paper, Stack } from '@mui/material';

type TopicDocsProps = {
    formattingReviewerName?: string;
    editable?: boolean;
};

export const DocumentsInfo = (props: TopicDocsProps) => {
    const { formattingReviewerName, editable = false } = props;

    return (
        <Stack spacing={3} width="100%">
            <InfoCard title="Нормоконтролер" text={formattingReviewerName} />
            <Stack component={Paper} spacing={1.5} p={3}>
                <BaseAlert severity="warning">
                    Раздел &quot;Документы&quot; в разработке, загрузить/скачать не получится
                </BaseAlert>
                <DocumentAttach name="Пояснительная записка" uploadDate={new Date(Date.now())} editable={editable} />
                <DocumentAttach name="Авторский договор" editable={editable} />
                <DocumentAttach name="Отзыв руководителя" uploadDate={new Date(Date.now())} editable={editable} />
                <DocumentAttach name="NDA" editable={editable} />
            </Stack>
        </Stack>
    );
};
