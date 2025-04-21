import { CommentCard } from '@/entities/Comment';
import { getUserData } from '@/entities/User';
import { TopicInfo } from '@/widgets/TopicInfo';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { MyDiplomEmpty } from './MyDiplom.empty';
import { StagesInfo } from './StagesInfo';

type MyDiplomEmptyProps = {};

export const MyDiplom = (props: MyDiplomEmptyProps) => {
    const { user, topicId } = useSelector(getUserData);

    if (!topicId) {
        return <MyDiplomEmpty />;
    }

    return (
        <Stack spacing={3}>
            <CommentCard
                severity="info"
                label="эксперта"
                // eslint-disable-next-line max-len
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ante magna, accumsan vel pellentesque eget, lacinia ut ipsum. Maecenas cursus malesuada sapien, sit amet elementum nibh venenatis sit amet. Pellentesque diam diam, euismod at porttitor in, lacinia in nulla. Proin id ex facilisis, pellentesque diam non, pretium sem. Nulla auctor eros sapien, ut aliquet ipsum aliquet condimentum. Proin eget mollis metus, et mollis sem."
            />
            <TopicInfo topicId={topicId} extended editable />
            <StagesInfo />
        </Stack>
    );
};
