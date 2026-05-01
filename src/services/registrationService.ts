import { post } from './http';
import { ApiResponse } from '@/store/types';
import { ENDPOINTS } from '@/constants/endpoints';
import { ContractorData } from '@/types/contractor';
import { EmployeeData } from '@/types/employee';

export async function handleEmployeeRegistration(
  EmployeeRegistrationData: EmployeeData,
): Promise<ApiResponse<null>> {
  return post(ENDPOINTS.employeeRegistration, EmployeeRegistrationData);
}

export async function handleContractorRegistration(
  ContractorRegistrationData: ContractorData,
): Promise<ApiResponse<null>> {
  return post(ENDPOINTS.contractorRegistration, ContractorRegistrationData);
}
