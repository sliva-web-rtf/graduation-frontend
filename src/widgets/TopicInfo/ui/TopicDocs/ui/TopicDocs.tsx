import { DocumentAttach } from '@/entities/Document';
import { Stack } from '@mui/material';

type TopicDocsProps = {};

export const TopicDocs = (props: TopicDocsProps) => {
    // const { description, result } = props;

    return (
        <Stack spacing={1.5}>
            <DocumentAttach name="Пояснительная записка" uploadDate={new Date(Date.now())} editable />
            <DocumentAttach name="Авторский договор" editable />
            <DocumentAttach name="Отзыв руководителя" uploadDate={new Date(Date.now())} editable />
            <DocumentAttach name="NDA" editable />
        </Stack>
    );
};
