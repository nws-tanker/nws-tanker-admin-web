import type { ApiResponse } from '@/store/types';
import { post } from './request';

type Args = {
  /** Browser File or Blob to upload. */
  file: File | Blob;
  /** Form field name; defaults to `file`. */
  fieldName?: string;
  /** Extra fields to include in the same multipart body. */
  extraFields?: Record<string, string>;
};

/**
 * Uploads a file as `multipart/form-data`. Lets the browser set the
 * Content-Type (with the boundary) by *not* including it explicitly.
 */
export function uploadFile<T>(
  url: string,
  { file, fieldName = 'file', extraFields }: Args,
): Promise<ApiResponse<T>> {
  const formData = new FormData();
  formData.append(fieldName, file);
  if (extraFields) {
    for (const [key, value] of Object.entries(extraFields)) {
      formData.append(key, value);
    }
  }
  return post<T>(url, formData);
}
