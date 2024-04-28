export type ScientificInterestsDto = Array<string>;

export type ScientificAreaDto = {
    readonly section: string;
    readonly subsections: string[];
};

export type ScientificAreaModel = {
    readonly section: string;
    readonly label: string;
};

export type ScientificAreasDto = Array<ScientificAreaDto>;
export type ScientificAreasModel = Array<ScientificAreaModel>;
