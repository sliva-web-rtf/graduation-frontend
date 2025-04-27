import { CommentCard } from '@/entities/Comment';
import { QualificationWorkCard, useGetQualificationWorkQuery } from '@/entities/QualificationWork';
import { StageAccordion } from '@/entities/Stage';
import { Grid, Stack } from '@mui/material';
import { memo } from 'react';
import { Helmet } from 'react-helmet';
import { DiplomSchema } from '../../../model';
import { ComissionInfo } from './ComissionInfo';
import { DefenceInfo } from './DefenceInfo';
import { DiplomInfoSkeleton } from './DiplomInfo.skeleton';
import { DocumentsInfo } from './DocumentsInfo';

type TopicInfoProps = {
    qualificationWorkId?: string;
    stage: DiplomSchema['stage'];
    isStage: boolean;

    editable?: boolean;
};

export const DiplomInfo = memo((props: TopicInfoProps) => {
    const { qualificationWorkId, stage, isStage, editable = false } = props;

    const { data, isFetching } = useGetQualificationWorkQuery({
        id: qualificationWorkId!,
        stage: stage.name,
    });

    if (isFetching) {
        return <DiplomInfoSkeleton />;
    }

    const isExpertComment = data?.expertComment;
    const isFormattingReviewStage = stage.type === 'FormattingReview';

    return (
        <>
            <Helmet>
                <title>{data?.topicName}</title>
            </Helmet>
            <Stack spacing={3}>
                {!isStage && isExpertComment && <CommentCard text={data?.expertComment} label="эксперта" />}
                {isStage && (
                    <StageAccordion
                        defaultExpanded
                        result={data.result}
                        mark={data.mark}
                        stage={stage.name}
                        description={stage.description}
                        end={stage.endsAt}
                        comment={data.comment}
                    />
                )}
                <Grid container gap={3}>
                    <Grid item xs={5}>
                        <QualificationWorkCard
                            topicName={data?.topicName}
                            status={data?.status}
                            supervisor={data?.supervisor}
                            student={data?.student}
                            companyName={data?.companyName}
                            companySupervisor={data?.companySupervisor}
                            isCommand={data?.isCommand}
                        />
                    </Grid>
                    <Grid item xs>
                        <Stack spacing={3} alignItems="flex-start" height="100%">
                            {isStage && !isFormattingReviewStage && (
                                <DefenceInfo date={data?.date} time={data.time} location={data.location} />
                            )}
                            {!isFormattingReviewStage && (
                                <ComissionInfo
                                    name={data?.commission.name}
                                    secretaryName={data?.commission.secretaryName}
                                    expertsNames={data?.commission.expertsNames}
                                />
                            )}
                            {isFormattingReviewStage && (
                                <DocumentsInfo
                                    editable={editable}
                                    formattingReviewerName={data.formattingReviewerName}
                                />
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
});
