import { ScientificArea } from '@/entities/Directions';

export interface ScientificWorkRequest {
    readonly name: string;
    readonly description: string;
    readonly result: string;
    readonly scientificAreaSubsections: ScientificArea[];
    readonly scientificInterests: string[];
    readonly isEducator: boolean;
}
