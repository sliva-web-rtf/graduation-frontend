/* eslint-disable max-len */
import { StageAccordion, StageProgress } from '@/entities/Stage';
import { useGetStagesQuery } from '@/entities/Stage/api';
import { Role } from '@/entities/User';
import { ResultStatus } from '@/shared/lib/types/statuses';
import { ErrorPageMessage } from '@/shared/ui';
import { Paper, Stack } from '@mui/material';
import { StagesInfoSkeleton } from './StagesInfo.skeleton';

export const StagesInfo = () => {
    const { data, isFetching } = useGetStagesQuery();
    const currentStage = data?.[1] ?? '';

    if (isFetching) {
        return <StagesInfoSkeleton />;
    }

    if (!data?.length) {
        return <ErrorPageMessage message="Информация об этапах отсутствует" />;
    }

    return (
        <Paper component={Stack} spacing={3} p={3}>
            <StageProgress stage={currentStage} />
            <Stack spacing={1}>
                {data?.map((stage, index) => (
                    <StageAccordion
                        key={stage}
                        defaultExpanded={stage === currentStage}
                        result={ResultStatus.Success}
                        mark={75}
                        stage={stage}
                        description="Подготовка Отчета по преддипломной практике, доклада, презентации.  Отчет по преддипломной практике - это 50%  пояснительной записки к ВКР, оформленный по методическим рекомендациям https://study.urfu.ru/Search/Author/28119 в основе стандарт (ГОСТ 7.32-2017), а так же подписанные задание и отзыв руководителем ВКР."
                        end={new Date(`2025-0${index + 2}-01`)}
                        comments={[
                            {
                                role: index % 2 === 0 ? Role.Secretary : Role.Expert,
                                text: 'Где руководитель? Предлагаю Разработка системы генерации тестов в соответствии с содержанием учебных материалов',
                            },
                        ]}
                    />
                ))}
            </Stack>
        </Paper>
    );
};
