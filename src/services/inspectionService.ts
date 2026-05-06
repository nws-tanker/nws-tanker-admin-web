import { ENDPOINTS } from '@/constants/endpoints';
import {
  INSPECTION_TAB_API_PARAM,
  mapInspectionResponse,
} from '@/pages/inspection/inspectionHelpers';
import type { ApiResponse } from '@/store/types';
import type { InspectionScreenData, InspectionTab } from '@/types/inspection';
import type { ApiInspectionPagedData } from '@/types/inspection';
import { get } from './http';

export type InspectionApiParams = {
  tab: InspectionTab;
  search?: string;
  page?: number;
  size?: number;
};

export async function fetchInspectionReviewApi(
  params: InspectionApiParams,
): Promise<ApiResponse<InspectionScreenData>> {
  const response = await get<ApiInspectionPagedData>(
    ENDPOINTS.inspectionReview,
    {
      tab: INSPECTION_TAB_API_PARAM[params.tab],
      search: params.search,
      page: params.page ?? 0,
      size: params.size ?? 20,
    },
  );

  if (!response.success) return response;
  return { success: true, data: mapInspectionResponse(response.data) };
}
