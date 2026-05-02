import { ENDPOINTS } from '@/constants/endpoints';
import { get } from './http';
import type { ApiResponse } from '@/store/types';

export type Contractor = {
  contractorId: number;
  companyNameEn: string;
  companyNameAr: string;
  crNumber: string;
  governorate: string;
  contactPersonName: string;
  email: string;
  mobile: string;
};

export async function fetchContractorsApi(): Promise<
  ApiResponse<Contractor[]>
> {
  return get<Contractor[]>(ENDPOINTS.contractors);
}
