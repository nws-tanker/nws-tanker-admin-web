export type FailedRecord = {
  rowNumber: number;
  plateNumber: string;
  ownerName: string;
  cardNo: string;
  contractType: string;
  governorate: string;
  tankerType: string;
  capacityM3: string;
  capacityGallons: string;
  sizeCategory: string;
  wilayat: string;
  operationRegion: string;
  tfs: string;
  contactNumber: string;
  email: string;
  errorMsg: string;
};

export type TankerUploadColumn = {
  /** Exact column header expected in the uploaded file. */
  name: string;
  required: boolean;
  description: string;
  example: string;
  /** Field on FailedRecord that maps to this column (for re-exporting failed rows). */
  recordKey: keyof Omit<FailedRecord, 'rowNumber' | 'errorMsg'>;
};

export type UploadError = {
  /** Row number in the source file, or null when the backend message has no row prefix. */
  rowNumber: number | null;
  /** Human-readable error message (with the "Row N:" prefix already stripped). */
  message: string;
};

export type TankerUploadResponse = {
  totalRows: number;
  successRows: number;
  failedRows: number;
  errors: string[];
  failedRecords?: FailedRecord[];
};
