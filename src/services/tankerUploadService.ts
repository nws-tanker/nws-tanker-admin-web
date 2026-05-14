import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { TankerUploadResponse } from '@/types';
import { uploadFile } from './http/uploadFormData';

export async function submitTankerUploadApi(
  file: File,
): Promise<ApiResponse<TankerUploadResponse>> {
  return uploadFile<TankerUploadResponse>(ENDPOINTS.tankerUploadSubmit, {
    file,
    fieldName: 'file',
  });
}
