import { DocumentAttach } from '@/entities/Document';
import { DOCUMENTS } from '@/shared/lib/const';
import { BaseAlert, InfoCard } from '@/shared/ui';
import { Paper, Stack } from '@mui/material';

type TopicDocsProps = {
    formattingReviewerName?: string;
    editable?: boolean;
};

const documents = ['Справка о соответствии содержания ВКР требованиям по безопасности информации', ...DOCUMENTS];
export const DocumentsInfo = (props: TopicDocsProps) => {
    const { formattingReviewerName, editable = false } = props;

    return (
        <Stack spacing={3} width="100%">
            <InfoCard title="Нормоконтролер" text={formattingReviewerName} />
            <Stack component={Paper} spacing={1.5} p={3}>
                <BaseAlert severity="warning">
                    Раздел &quot;Документы&quot; в разработке, загрузить/скачать не получится
                </BaseAlert>
                {documents.map((doc) => (
                    <DocumentAttach key={doc} name={doc} editable={editable} uploadDate={new Date(Date.now())} />
                ))}
            </Stack>
        </Stack>
    );
};
