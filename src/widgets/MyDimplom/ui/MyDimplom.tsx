import { getUserData } from '@/entities/User';
import { TopicInfo } from '@/widgets/TopicInfo';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { MyDimplomEmpty } from './MyDimplom.empty';
import { StagesInfo } from './StagesInfo';

type MyDimplomProps = {};

export const MyDimplom = (props: MyDimplomProps) => {
    const { user, topicId } = useSelector(getUserData);

    if (!topicId) {
        return <MyDimplomEmpty />;
    }

    return (
        <Stack spacing={3}>
            <TopicInfo topicId={topicId} extended editable />
            <StagesInfo />
        </Stack>
    );
};
