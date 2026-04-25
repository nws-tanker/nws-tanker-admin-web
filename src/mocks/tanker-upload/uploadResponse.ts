import type { TankerUploadResponse, UploadError } from '@/types';

const SEED_ERRORS: UploadError[] = [
  {
    rowNumber: 3,
    cardNumber: 'C-0012',
    field: 'Card No.',
    type: 'duplicate',
    reason: 'Duplicate Card No. — already exists in fleet',
    badValue: 'C-0012',
  },
  {
    rowNumber: 7,
    cardNumber: '—',
    field: 'Reg No.',
    type: 'missing',
    reason: 'Missing required field: Reg No. (Mulkiya)',
    badValue: '',
  },
  {
    rowNumber: 15,
    cardNumber: 'C-0088',
    field: 'Contract Type',
    type: 'invalid',
    reason:
      'Invalid Contract Type "Govt" — expected Personal / Government / Commercial',
    badValue: 'Govt',
  },
  {
    rowNumber: 22,
    cardNumber: 'C-0103',
    field: 'Capacity M³',
    type: 'invalid',
    reason: 'Capacity M³ value "abc" is not a number',
    badValue: 'abc',
  },
];

export function buildUploadResponseMock(
  fileName: string,
  totalRows: number,
): TankerUploadResponse {
  const errors = SEED_ERRORS.map((e) => ({ ...e }));
  return {
    fileName,
    totalRows,
    importedCount: totalRows - errors.length,
    errors,
  };
}

const TEMPLATE_HEADER_LINE =
  'Reg No. (Mulkiya),Owner / Driver Name,Card No.,Contract Type,Capacity M³,Capacity Gallons,Size Category,Governorate,Wilayat,Operation Region,TFS (Filling Station),Contact Number';

const TEMPLATE_EXAMPLE_LINE =
  '"ABC 1234","Ahmed Al-Balushi","C-0042","Commercial","12","2642","700-1500","Muscat","Bausher","Region-3","TFS-07","+968 9123 4567"';

export const MOCK_TEMPLATE_CSV = `${TEMPLATE_HEADER_LINE}\n${TEMPLATE_EXAMPLE_LINE}\n`;

export const MOCK_TEMPLATE_FILENAME = 'tanker-upload-template.csv';
