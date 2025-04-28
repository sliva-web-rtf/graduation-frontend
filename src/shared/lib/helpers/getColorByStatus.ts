import { StudentStatus } from '@/entities/Person';
import { TopicStatus } from '@/entities/Topic';
import {
    DocumentStatus,
    FormattingReviewStatus,
    IsCommandStatus,
    MovementStatus,
    ResultStatus,
} from '../types/statuses';

export const getColorByTopicStatus = (status?: TopicStatus) => {
    switch (status) {
        case TopicStatus.Approved:
            return 'success';
        case TopicStatus.Consideration:
            return 'warning';
        case TopicStatus.Cancelled:
            return 'error';

        default:
            return 'secondary';
    }
};

export const getColorByStudentsStatus = (status?: StudentStatus) => {
    switch (status) {
        case StudentStatus.Active:
            return 'success';
        case StudentStatus.Academ:
            return 'warning';
        case StudentStatus.Kicked:
            return 'error';
        case StudentStatus.Transferred:
            return 'info';

        default:
            return 'secondary';
    }
};

export const getColorByResultStatus = (status?: ResultStatus) => {
    switch (status) {
        case ResultStatus.Success:
            return 'success';
        case ResultStatus.Warning:
            return 'warning';
        case ResultStatus.Error:
            return 'error';

        default:
            return 'secondary';
    }
};

export const getColorByFormatingReviewStatus = (status?: FormattingReviewStatus) => {
    switch (status) {
        case FormattingReviewStatus.Success:
            return 'success';
        case FormattingReviewStatus.Error:
            return 'error';

        default:
            return 'secondary';
    }
};

export const getColorByMovementStatus = (status?: MovementStatus) => {
    switch (status) {
        case MovementStatus.Ingoing:
            return '#28C840';
        case MovementStatus.Outgoing:
            return '#FF5F57';
        case MovementStatus.Default:
            return '#DEDEDE';

        default:
            return '#DEDEDE';
    }
};

export const getColorByIsCommandStatus = (status?: IsCommandStatus) => {
    switch (status) {
        case IsCommandStatus.Yes:
            return 'success';
        default:
            return 'secondary';
    }
};

export const getColorByDocumentStatus = (status?: DocumentStatus) => {
    switch (status) {
        case DocumentStatus.Uploaded:
            return '#FEBC2E';
        case DocumentStatus.Checked:
            return '#28C840';
        default:
            return '#DEDEDE';
    }
};
