import { ENDPOINTS } from '@/constants/endpoints';
import { INSPECTION_TAB_API_PARAM } from '@/types/inspection';
import type { ApiResponse } from '@/store/types';
import type {
  ApiInspectionPagedData,
  InspectionDetailsApiResponse,
  InspectionTab,
} from '@/types/inspection';
import { get, post, uploadFile } from './http';

export type InspectionApiParams = {
  tab: InspectionTab;
  search?: string;
  page?: number;
  size?: number;
};

export async function fetchInspectionReviewApi(
  params: InspectionApiParams,
): Promise<ApiResponse<ApiInspectionPagedData>> {
  return get<ApiInspectionPagedData>(ENDPOINTS.inspectionReview, {
    status: INSPECTION_TAB_API_PARAM[params.tab],
    search: params.search,
    page: params.page ?? 0,
    size: params.size ?? 20,
  });
}

export async function fetchInspectionDetails(
  inspectionId: string,
): Promise<ApiResponse<InspectionDetailsApiResponse>> {
  const url = ENDPOINTS.inspectionDetails.replace(
    '{inspectionId}',
    inspectionId,
  );
  return get<InspectionDetailsApiResponse>(url);
}

export async function approveInspection(
  inspectionId: string,
): Promise<ApiResponse<unknown>> {
  const url = ENDPOINTS.approveInspection.replace(
    '{inspectionId}',
    inspectionId,
  );
  return post<unknown>(url);
}

export type InspectorOption = { userId: string; name: string };

export async function fetchInspectors(): Promise<
  ApiResponse<InspectorOption[]>
> {
  return get<InspectorOption[]>(ENDPOINTS.inspectorsByRole, {
    role: 'INSPECTOR',
  });
}

export async function assignInspector(
  inspectionId: string,
  inspectorID: string,
): Promise<ApiResponse<unknown>> {
  const url = ENDPOINTS.assignInspector
    .replace('{inspectionId}', inspectionId)
    .replace('{inspectorID}', inspectorID);
  return post<unknown>(url);
}

export async function cancelInspection(
  inspectionId: string,
  cancellationReason: string,
): Promise<ApiResponse<unknown>> {
  const url = ENDPOINTS.cancelInspection.replace(
    '{inspectionId}',
    inspectionId,
  );
  return post<unknown>(url, { cancellationReason });
}

export async function rejectInspection(
  inspectionId: string,
  body: {
    rejectionStage: 'physical_inspection' | 'lab_results';
    rejectionReason: string;
  },
): Promise<ApiResponse<unknown>> {
  const url = ENDPOINTS.rejectInspection.replace(
    '{inspectionId}',
    inspectionId,
  );
  return post<unknown>(url, body);
}

export async function uploadLabReport(
  inspectionId: string,
  file: File,
): Promise<ApiResponse<unknown>> {
  const url = ENDPOINTS.labResult.replace('{inspectionId}', inspectionId);
  return uploadFile<unknown>(url, { file, fieldName: 'file' });
}

export async function requeueInspection(
  inspectionId: string,
): Promise<ApiResponse<unknown>> {
  const url = ENDPOINTS.requeueInspection.replace(
    '{inspectionId}',
    inspectionId,
  );
  return post<unknown>(url, {});
}

export type SendNotificationRequest = {
  email: string;
  mobileNo: string;
  sendEmail: boolean;
  sendWhatsapp: boolean;
  inspectionId: number;
};

export async function sendNotificationApi(
  body: SendNotificationRequest,
): Promise<ApiResponse<unknown>> {
  return post<unknown>(ENDPOINTS.sendNotification, body);
}
