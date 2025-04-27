import { CommissionModel } from '@/entities/Comission/model';
import { DocumentModel } from '@/entities/Document';
import { TopicStatus } from '@/entities/Topic';
import { FormattingReviewStatus, ResultStatus } from '@/shared/lib/types/statuses';

export type QualificationWorkMainInfo = {
    id: string;
    status: TopicStatus;
    topicName: string;
    supervisor: {
        id: string;
        name: string;
    };
    student: {
        id: string;
        name: string;
        role: string;
    };
    commission: CommissionModel;

    expertComment?: string;
    companySupervisor?: string;
    companyName?: string;
    isCommand?: boolean;
};

type QualificationWorkStageInfo = {
    commission: CommissionModel;
    supervisor: QualificationWorkMainInfo['supervisor'];
    student: QualificationWorkMainInfo['student'];
    companyName: QualificationWorkMainInfo['companyName'];
    companySupervisor: QualificationWorkMainInfo['companySupervisor'];
    comment: QualificationWorkMainInfo['expertComment'];
    location: string;
    result: ResultStatus;
    mark: number;
    date: string;
    time: string;
    isCommand: boolean;
};

type QualificationWorkFormattingReview = {
    documents: DocumentModel[];
    annotation: string;
    result: FormattingReviewStatus;
};

export type QualificationWorkDto = {
    mainInfo: QualificationWorkMainInfo;
    stageInfo: QualificationWorkStageInfo;
    formattingReview: QualificationWorkFormattingReview;
};

export type QualificationWorkModel = QualificationWorkMainInfo & QualificationWorkStageInfo;

export type QualificationWorkRequest = {
    id: string;
    stage: string;
};
