import { ENDPOINTS } from '@/constants/endpoints';
import { MOCK_TANKER_UPLOAD_COLUMNS } from '@/mocks/tanker-upload/columns';
import {
  buildUploadResponseMock,
  MOCK_TEMPLATE_CSV,
  MOCK_TEMPLATE_FILENAME,
} from '@/mocks/tanker-upload/uploadResponse';
import type { ApiResponse } from '@/store/types';
import type { TankerUploadColumn, TankerUploadResponse } from '@/types';
import { client } from './http/client';
import { commonHeaders } from './http/commonHeaders';
import { buildErrorResponse } from './http/errorMapping';
import { get } from './http';
import { mockDelay, USE_MOCK } from './mockConfig';
import { uploadFile } from './http/uploadFormData';

export async function fetchTankerUploadColumnsApi(): Promise<
  ApiResponse<TankerUploadColumn[]>
> {
  if (USE_MOCK) {
    await mockDelay();
    return { success: true, data: MOCK_TANKER_UPLOAD_COLUMNS };
  }
  return get<TankerUploadColumn[]>(ENDPOINTS.tankerUploadColumns);
}

/**
 * Downloads the upload template (.csv / .xlsx). On success the browser is
 * triggered to save the file; the function resolves to a void success
 * envelope so callers can show a toast / disable the button while pending.
 */
export async function downloadTankerUploadTemplateApi(): Promise<
  ApiResponse<{ fileName: string }>
> {
  if (USE_MOCK) {
    await mockDelay(800);
    triggerBrowserDownload(
      new Blob([MOCK_TEMPLATE_CSV], { type: 'text/csv;charset=utf-8' }),
      MOCK_TEMPLATE_FILENAME,
    );
    return { success: true, data: { fileName: MOCK_TEMPLATE_FILENAME } };
  }

  try {
    const response = await client.get(ENDPOINTS.tankerUploadTemplate, {
      responseType: 'blob',
      headers: commonHeaders(),
    });
    const fileName = parseFilenameFromContentDisposition(
      response.headers['content-disposition'] as string | undefined,
    );
    triggerBrowserDownload(response.data as Blob, fileName);
    return { success: true, data: { fileName } };
  } catch {
    return buildErrorResponse(
      'TEMPLATE_DOWNLOAD_FAILED',
      'Could not download the template. Please try again.',
    );
  }
}

export async function submitTankerUploadApi(
  file: File,
): Promise<ApiResponse<TankerUploadResponse>> {
  if (USE_MOCK) {
    // Longer than reads — surfaces the "Processing…" state for ~1.8s.
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

function triggerBrowserDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

const FILENAME_REGEX = /filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i;

function parseFilenameFromContentDisposition(header: string | undefined) {
  if (!header) return MOCK_TEMPLATE_FILENAME;
  const match = header.match(FILENAME_REGEX);
  return match ? decodeURIComponent(match[1]) : MOCK_TEMPLATE_FILENAME;
}
