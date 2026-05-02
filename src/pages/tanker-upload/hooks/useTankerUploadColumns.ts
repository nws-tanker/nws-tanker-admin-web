import { TANKER_UPLOAD_COLUMNS } from '@/constants/tankerUpload';
import { States } from '@/store/types';

export function useTankerUploadColumns() {
  return {
    columns: TANKER_UPLOAD_COLUMNS,
    state: States.SUCCESS,
    retry: () => {},
  };
}
