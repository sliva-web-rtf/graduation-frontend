export enum AdministrationOption {
    Global = 'Общие настройки',
    Import = 'Импорт',
}

export type AdministrationSchema = {
    option: AdministrationOption;
    options: AdministrationOption[];
};
