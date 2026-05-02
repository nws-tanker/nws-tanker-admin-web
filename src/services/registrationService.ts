import { post } from './http';
import { ApiResponse } from '@/store/types';
import { ENDPOINTS } from '@/constants/endpoints';
import { RegistrationData } from '@/types/userRegistration';

export async function handleEmployeeRegistration(
  RegistrationData: RegistrationData,
): Promise<ApiResponse<null>> {
  return post(ENDPOINTS.employeeRegistration, RegistrationData);
}
