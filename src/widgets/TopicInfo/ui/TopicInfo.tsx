import { TopicCard, useGetScientificWorkQuery } from '@/entities/Topic';
import { TopicRequestButton } from '@/features/topic/send-request';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { EmptyMessage } from '@/shared/ui';
import { Grid, Stack } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTopicInfo, topicInfoReducer } from '../model';
import { ToggleOptions } from '../model/types/toggleOptions';
import { ToggleTopicInfo } from './ToggleTopicInfo';
import { TopicComission } from './TopicComission';
import { TopicDocs } from './TopicDocs';
import { TopicInfoSkeleton } from './TopicInfo.skeleton';
import { TopicMainInfo } from './TopicMainInfo';

type TopicInfoProps = {
    extended?: boolean;
    editable?: boolean;
    topicId?: string;
};

const initialReducers: ReducersList = {
    'topic-info': topicInfoReducer,
};

export const TopicInfo = memo((props: TopicInfoProps) => {
    const { topicId, extended = false, editable = false } = props;
    const { id: paramsId } = useParams();
    const id = paramsId || topicId;
    const { option } = useSelector(getTopicInfo);
    const { isFetching, data } = useGetScientificWorkQuery({ id: id! });

    if (isFetching) {
        return <TopicInfoSkeleton />;
    }

    if (!data || !id) {
        return <EmptyMessage />;
    }

    const { description, result, name } = data;

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Grid container gap={3}>
                <Grid item xs={5}>
                    <Stack spacing={3}>
                        <TopicCard {...data} />
                        <Stack spacing={1} alignItems="center">
                            {!extended && <TopicRequestButton id={id} name={name} />}
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs>
                    <Stack spacing={4} alignItems="flex-start">
                        {extended && <ToggleTopicInfo />}
                        {option === ToggleOptions.Info && <TopicMainInfo description={description} result={result} />}
                        {option === ToggleOptions.Docs && <TopicDocs />}
                        {option === ToggleOptions.Comission && <TopicComission />}
                    </Stack>
                </Grid>
            </Grid>
        </DynamicModuleLoader>
    );
});
