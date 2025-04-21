import { StudentStatus } from '@/entities/Person';
import { TopicStatus } from '@/entities/Topic';
import { DocumentStatus, ResultStatus } from '../types/statuses';

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

export const getColorByIsCommandStatus = (status?: boolean) => {
    return status ? 'success' : 'secondary';
};

export const getColorByDocumentStatus = (status?: DocumentStatus) => {
    switch (status) {
        case DocumentStatus.Uploaded:
            return 'primary.main';
        case DocumentStatus.Checked:
            return '#00B327';
        default:
            return 'secondary.main';
    }
};
