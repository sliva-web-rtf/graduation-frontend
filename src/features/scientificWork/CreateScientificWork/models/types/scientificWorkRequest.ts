export interface ScientificWorkRequest {
    readonly name: string;
    readonly description: string;
    readonly result: string;
    readonly scientificAreaSubsections: Array<string>;
    readonly scientificInterests: Array<string>;
    readonly isEducator: boolean;
}
