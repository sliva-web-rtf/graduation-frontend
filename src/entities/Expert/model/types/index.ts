export type ExpertDto = {
    id: string;
    name: string;
};

export type ExpertModel = {
    id: ExpertDto['id'];
    name: ExpertDto['name'];
};

export type ExpertsDto = {
    experts: ExpertDto[];
    pagesCount: number;
};

export type ExpertsModel = ExpertsDto['experts'];

export type ExpertsRequest = {
    page?: number;
    size?: number;
    query?: string;
};
