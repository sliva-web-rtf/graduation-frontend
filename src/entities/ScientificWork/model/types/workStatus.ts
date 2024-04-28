export enum WorkStatus {
    NotConfirmed = 'NotConfirmed',
    Confirmed = 'Confirmed',
    Completed = 'Completed',
}

export const WorkStatusRus: Record<WorkStatus, string> = {
    [WorkStatus.NotConfirmed]: 'Не подтверждена',
    [WorkStatus.Confirmed]: 'Подтверждена',
    [WorkStatus.Completed]: 'Одобрена',
};
