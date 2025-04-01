export enum RequestsOption {
    Incoming = 'Входящие',
    Outgoing = 'Исходящие',
    History = 'История',
}

export interface RequestsSchema {
    option: RequestsOption;
    options: RequestsOption[];
}
