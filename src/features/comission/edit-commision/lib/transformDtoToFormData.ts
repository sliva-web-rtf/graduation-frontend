import { CommissionDto } from '@/entities/Comission';
import {
    CommissionFormSchema,
    ExpertsFormSchema,
    InfoFormSchema,
    StudentsFormSchema,
} from '../../create-commission/model';

const buildExpertsRecord = (stages: CommissionDto['stages']) =>
    stages.reduce((record, stage) => {
        record[stage.stage] = stage.experts.map((expert) => ({
            id: expert.id,
            isInvited: expert.isInvited || false,
        }));
        return record;
    }, {} as ExpertsFormSchema);

const buildStudentsRecord = (stages: CommissionDto['stages']) =>
    stages.reduce((record, stage) => {
        record[stage.stage] = stage.students.map((student) => ({
            id: student.id,
            name: student.name,
            commissionId: null,
            commissionName: null,
        }));
        return record;
    }, {} as StudentsFormSchema);

export const transformDtoToFormData = (dto: CommissionDto): CommissionFormSchema['forms'] => {
    const { secretary, chairperson } = dto;

    const secretaryData = (
        secretary ? { id: secretary.id, name: secretary.name } : undefined
    ) as InfoFormSchema['secretary'];
    const chairpersonData = (
        chairperson ? { id: chairperson.id, name: chairperson.name } : undefined
    ) as InfoFormSchema['chairperson'];

    return {
        info: {
            data: {
                name: dto.name,
                secretary: secretaryData,
                chairperson: chairpersonData,
            },
            isValid: true,
            isTouched: false,
        },
        groups: {
            data: {
                academicGroups: dto.academicGroups,
            },
            isValid: true,
            isTouched: false,
        },
        experts: {
            data: buildExpertsRecord(dto.stages),
            isValid: true,
            isTouched: false,
        },
        students: {
            data: buildStudentsRecord(dto.stages),
            isValid: true,
            isTouched: false,
        },
    };
};
