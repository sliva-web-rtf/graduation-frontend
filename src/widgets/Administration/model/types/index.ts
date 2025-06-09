export enum AdministrationOption {
    Global = 'Общие настройки',
    Users = 'Пользователи',
    Logs = 'Логи',
}

export type AdministrationSchema = {
    option: AdministrationOption;
    options: AdministrationOption[];
};
