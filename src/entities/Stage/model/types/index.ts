import { DataType } from '@/widgets/MyStudents';

export type StageDto = {
    name: string;
    type: DataType;
    beginsAt: string;
    endsAt: string;
    isCurrent: boolean;
    description: string;
};

export type StagesDto = {
    stages: StageDto[];
};

export type StagesModel = StagesDto['stages'];

export type CurrentStageModel = {
    name: StageDto['name'];
    type: StageDto['type'];
    beginsAt: StageDto['beginsAt'];
    endsAt: StageDto['endsAt'];
    description: StageDto['description'];
    number: number;
    amount: number;
};

export type CopyStageRequest = {
    fromStage: string;
    toStage: string;
};
