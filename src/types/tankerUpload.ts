export type TankerUploadColumn = {
  /** Exact column header expected in the uploaded file. */
  name: string;
  required: boolean;
  description: string;
  example: string;
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
};
