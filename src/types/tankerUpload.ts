export type TankerUploadColumn = {
  /** Exact column header expected in the uploaded file. */
  name: string;
  required: boolean;
  description: string;
  example: string;
};

export type UploadErrorType = 'duplicate' | 'missing' | 'invalid';

export type UploadError = {
  rowNumber: number;
  cardNumber: string;
  field: string;
  type: UploadErrorType;
  reason: string;
  badValue: string;
};

export type TankerUploadResponse = {
  fileName: string;
  totalRows: number;
  importedCount: number;
  errors: UploadError[];
};
