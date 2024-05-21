import { RequestEnum } from './requestEnum';

export interface AddStudentRequest {
    readonly studentFromId: string;
    readonly studentToId: string;
    readonly scientificWorkId: string;
    readonly requestEnum: RequestEnum;
}
