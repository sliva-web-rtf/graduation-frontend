import { RequestEnum } from './requestEnum';

export interface AddProfessorRequest {
    readonly scientificWorkId: string;
    readonly studentId: string;
    readonly professorId: string;
    readonly requestEnum: RequestEnum;
}
