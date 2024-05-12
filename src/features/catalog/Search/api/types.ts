export type ScientificInterestsDto = Array<string>;

type ScientificArea = {
    readonly section: string;
    readonly subsections: string[];
};

export type ScientificAreaModel = {
    readonly section: string;
    readonly label: string;
};

export type ScientificAreas = Array<ScientificArea>;
export type ScientificAreasModel = Array<ScientificAreaModel>;
