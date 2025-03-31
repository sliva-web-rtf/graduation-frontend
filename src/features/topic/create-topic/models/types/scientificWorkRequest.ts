export interface CreateTopicRequest {
    name: string;
    // academicPrograms: string[];

    description?: string;
    result?: string;
    role?: string;
    requestedRoles?: string[];
    companyName?: string;
    companySupervisorName?: string;
    requiresSupervisor?: boolean;
}
