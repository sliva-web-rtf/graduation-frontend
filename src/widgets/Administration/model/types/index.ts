export enum AdministrationOption {
    Global = 'Общие настройки',
    Import = 'Импорт',
    Copy = 'Копирование этапа',
}

export type AdministrationSchema = {
    option: AdministrationOption;
    options: AdministrationOption[];
};
