export type ScientificInterestsDto = Array<string>;

export type ScientificAreasDto = Array<{
    readonly section: string;
    readonly subsections: string[];
}>;

export type ScientificAreasModel = Array<{
    readonly section: string;
    readonly label: string;
}>;
