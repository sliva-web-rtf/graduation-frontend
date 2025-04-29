export type SecrataryDto = {
    id: string;
    name: string;
};

export type SecrataryModel = {
    id: SecrataryDto['id'];
    name: SecrataryDto['name'];
};

export type SecretariesDto = {
    secretaries: SecrataryDto[];
    pagesCount: number;
};

export type SecretariesModel = SecretariesDto['secretaries'];

export type SecretariesRequest = {
    page?: number;
    size?: number;
    query?: string;
};
