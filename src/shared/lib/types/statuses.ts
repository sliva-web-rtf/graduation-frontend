import { StrictRecord } from './StrictRecord';

export enum ResultStatus {
    Error = 'нет',
    Warning = 'нет, н/я',
    Success = 'да',
}

export const ResultStatusRus: StrictRecord<ResultStatus, string> = {
    [ResultStatus.Error]: 'Не успешно',
    [ResultStatus.Warning]: 'Не явился',
    [ResultStatus.Success]: 'Успешно',

    getUnknown: 'Нет данных',
} as const;

export enum DocumentStatus {
    Empty = 'Empty',
    Uploaded = 'Uploaded',
    Checked = 'Checked',
}

export const DocumentStatusRus: StrictRecord<DocumentStatus, string> = {
    [DocumentStatus.Empty]: 'Не загружен',
    [DocumentStatus.Uploaded]: 'Загружен',
    [DocumentStatus.Checked]: 'Проверен',
} as const;

export enum FormattingReviewStatus {
    Error = 'нет',
    Success = 'да',
}

export const FormattingReviewStatusRus: StrictRecord<FormattingReviewStatus, string> = {
    [FormattingReviewStatus.Error]: 'Не пройден',
    [FormattingReviewStatus.Success]: 'Пройден',

    getUnknown: 'Нет данных',
} as const;

export enum MovementStatus {
    Ingoing = 'Ingoing',
    Outgoing = 'Outgoing',
    Default = 'Default',
}

export const MovementStatusRus: StrictRecord<MovementStatus, string> = {
    [MovementStatus.Ingoing]: 'Добавлен',
    [MovementStatus.Outgoing]: 'Переведен',
    [MovementStatus.Default]: '',

    getUnknown: '',
} as const;

export enum IsCommandStatus {
    Yes = true,
    No = false,
    NoData = null,
}

export const IsCommandStatusRus: StrictRecord<IsCommandStatus, string> = {
    [IsCommandStatus.Yes]: 'Да',
    [IsCommandStatus.No]: 'Нет',
    [IsCommandStatus.NoData]: 'Нет данных',

    getUnknown: 'Нет данных',
} as const;
