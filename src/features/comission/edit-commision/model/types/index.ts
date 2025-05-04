import { CreateCommissionRequest } from '../../../create-commission/model';

export type EditCommissionRequest = { commissionId: string } & CreateCommissionRequest;
