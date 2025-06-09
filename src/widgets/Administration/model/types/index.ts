export enum AdministrationOption {
    Global = 'Общие настройки',
    Users = 'Пользователи',
}

export type AdministrationSchema = {
    option: AdministrationOption;
    options: AdministrationOption[];
};
