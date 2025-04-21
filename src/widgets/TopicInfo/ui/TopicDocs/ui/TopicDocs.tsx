import { DocumentAttach } from '@/entities/Document';
import { Stack } from '@mui/material';

type TopicDocsProps = {
    editable?: boolean;
};

export const TopicDocs = (props: TopicDocsProps) => {
    const { editable = false } = props;

    return (
        <Stack spacing={1.5} width="100%">
            <DocumentAttach name="Пояснительная записка" uploadDate={new Date(Date.now())} editable={editable} />
            <DocumentAttach name="Авторский договор" editable={editable} />
            <DocumentAttach name="Отзыв руководителя" uploadDate={new Date(Date.now())} editable={editable} />
            <DocumentAttach name="NDA" editable={editable} />
        </Stack>
    );
};
