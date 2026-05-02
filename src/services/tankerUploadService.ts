import { ENDPOINTS } from '@/constants/endpoints';
import { buildUploadResponseMock } from '@/mocks/tanker-upload/uploadResponse';
import type { ApiResponse } from '@/store/types';
import type { TankerUploadResponse } from '@/types';
import { mockDelay, USE_MOCK } from './mockConfig';
import { uploadFile } from './http/uploadFormData';

export async function submitTankerUploadApi(
  file: File,
): Promise<ApiResponse<TankerUploadResponse>> {
  if (USE_MOCK) {
    await mockDelay(1800);
    const totalRows = Math.floor(Math.random() * 200) + 50;
    return {
      success: true,
      data: buildUploadResponseMock(file.name, totalRows),
    };
  }

  return uploadFile<TankerUploadResponse>(ENDPOINTS.tankerUploadSubmit, {
    file,
    fieldName: 'file',
  });
}
