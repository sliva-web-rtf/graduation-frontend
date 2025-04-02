import { CommentCard } from '@/entities/Comment';
import { getUserData, Role } from '@/entities/User';
import { TopicInfo } from '@/widgets/TopicInfo';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { MyDimplomEmpty } from './MyDimplom.empty';

type MyDimplomProps = {};

export const MyDimplom = (props: MyDimplomProps) => {
    const { user } = useSelector(getUserData);
    const hasTopic = true;
    const text1 =
        // eslint-disable-next-line max-len
        'Где руководитель? Предлагаю Разработка системы генерации тестов в соответствии с содержанием учебных материалов';
    const text2 =
        // eslint-disable-next-line max-len
        'Поработать над текстом в презентации (слайд 9). Метрики для оценки достигнутых результатов в сравнении с текущимими бизнес-процессами.';

    if (!hasTopic) {
        return <MyDimplomEmpty />;
    }

    return (
        <Stack spacing={4}>
            <Stack spacing={1}>
                <CommentCard role={Role.Expert} text={text1} date={new Date(Date.now())} />
                <CommentCard role={Role.Clerk} text={text2} date={new Date(Date.now())} />
            </Stack>
            <TopicInfo topicId="5558be23-1c9c-484a-a65f-a62b4ddfff28" extended />
        </Stack>
    );
};
