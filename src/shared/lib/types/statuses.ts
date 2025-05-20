import { StrictRecord } from './StrictRecord';

export enum ResultStatus {
    Success = 'да',
    Error = 'нет',
    Warning = 'нет, н/я',
}

export const ResultStatusRus: StrictRecord<ResultStatus, string> = {
    [ResultStatus.Success]: 'Успешно',
    [ResultStatus.Error]: 'Не успешно',
    [ResultStatus.Warning]: 'Не явился',

    getUnknown: 'Нет данных',
} as const;

export enum DocumentStatus {
    Checked = 'Checked',
    Uploaded = 'Uploaded',
    Empty = 'Empty',
}

export const DocumentStatusRus: StrictRecord<DocumentStatus, string> = {
    [DocumentStatus.Checked]: 'Проверен',
    [DocumentStatus.Uploaded]: 'Загружен',
    [DocumentStatus.Empty]: 'Не загружен',
} as const;

export enum FormattingReviewStatus {
    Success = 'да',
    Warning = 'рассматривается',
    Error = 'нет',
}

export const FormattingReviewStatusRus: StrictRecord<FormattingReviewStatus, string> = {
    [FormattingReviewStatus.Success]: 'Пройден',
    [FormattingReviewStatus.Warning]: 'На рассмотрении',
    [FormattingReviewStatus.Error]: 'Не пройден',

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
