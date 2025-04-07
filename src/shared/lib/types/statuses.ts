import { StrictRecord } from './StrictRecord';

export enum ResultStatus {
    Error = 'нет',
    Warning = 'нет, н/я',
    Success = 'да',
}

export const ResultStatusRus: StrictRecord<ResultStatus, string> = {
    [ResultStatus.Error]: 'Не пройдено',
    [ResultStatus.Warning]: 'Не явился',
    [ResultStatus.Success]: 'Успешно',

    getUnknown: 'Неизвестно',
} as const;

export enum DocumentStatus {
    Uploaded = 'Uploaded',
    Checked = 'Checked',
}
