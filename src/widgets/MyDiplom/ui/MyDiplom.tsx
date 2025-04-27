import { StageProgress } from '@/entities/Stage';
import { useGetStagesQuery } from '@/entities/Stage/api';
import { getUserData } from '@/entities/User';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { StageOptions, getDiplom } from '../model';
import { DiplomInfo } from './DiplomInfo/ui/DiplomInfo';
import { MyDiplomEmpty } from './MyDiplom.empty';
import { ToggleStageInfo } from './ToggleStageInfo';

type MyDiplomProps = {
    editable?: boolean;
    qualificationWorkId?: string;
};

export const MyDiplom = (props: MyDiplomProps) => {
    const { editable = true, qualificationWorkId } = props;
    const { user } = useSelector(getUserData);
    const { stage } = useSelector(getDiplom);
    const { isFetching: isStagesFetching } = useGetStagesQuery();
    const isStage = stage.name !== StageOptions.Main;
    const isQualificationWorkId = user?.qualificationWorkId || qualificationWorkId;

    if (isStagesFetching || !isQualificationWorkId) {
        return <MyDiplomEmpty />;
    }

    return (
        <Stack spacing={4}>
            {editable && <StageProgress />}
            <ToggleStageInfo />
            <DiplomInfo
                stage={stage}
                isStage={isStage}
                editable={editable}
                qualificationWorkId={user?.qualificationWorkId || qualificationWorkId}
            />
        </Stack>
    );
};
