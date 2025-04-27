import { TopicCard, useGetTopicQuery } from '@/entities/Topic';
import { TopicRequestButton } from '@/features/topic/send-request';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { SITENAME } from '@/shared/lib/const';
import { EmptyMessage } from '@/shared/ui';
import { Grid, Stack } from '@mui/material';
import { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTopicInfo, topicInfoReducer } from '../model';
import { TopicInfoSkeleton } from './TopicInfo.skeleton';
import { TopicMainInfo } from './TopicMainInfo';

type TopicInfoProps = {
    extended?: boolean;
    editable?: boolean;
    isStage?: boolean;
    topicId?: string;
};

const initialReducers: ReducersList = {
    'topic-info': topicInfoReducer,
};

export const TopicInfo = memo((props: TopicInfoProps) => {
    const { topicId, extended = false, editable = false, isStage = false } = props;
    const { id: paramsId } = useParams();
    const id = paramsId || topicId;
    const { option } = useSelector(getTopicInfo);
    const { isFetching, data } = useGetTopicQuery({ id: id! });

    if (isFetching) {
        return <TopicInfoSkeleton />;
    }

    if (!data || !id) {
        return <EmptyMessage />;
    }

    const { description, result, name } = data;

    return (
        <>
            {name && (
                <Helmet>
                    <title>
                        {name} | {SITENAME}
                    </title>
                </Helmet>
            )}
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
                        <TopicMainInfo description={description} result={result} />
                    </Grid>
                </Grid>
            </DynamicModuleLoader>
        </>
    );
});
