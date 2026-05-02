import type { TankerUploadColumn } from '@/types';

export const TANKER_UPLOAD_COLUMNS: TankerUploadColumn[] = [
  {
    name: 'Reg No. (Mulkiya)',
    required: true,
    description: 'Vehicle registration number from Mulkiya document',
    example: 'ABC 1234',
  },
  {
    name: 'Owner / Driver Name',
    required: true,
    description: 'Full name of registered owner or primary driver',
    example: 'Ahmed Al-Balushi',
  },
  {
    name: 'Card No.',
    required: true,
    description: 'Unique tanker card identifier issued by Nama',
    example: 'C-0042',
  },
  {
    name: 'Contract Type',
    required: true,
    description: 'Personal / Government / Commercial',
    example: 'Commercial',
  },
  {
    name: 'Capacity M³',
    required: true,
    description: 'Tank capacity in cubic metres',
    example: '12',
  },
  {
    name: 'Capacity Gallons',
    required: false,
    description: 'Auto-computed from M³ if omitted (× 219.969)',
    example: '2642',
  },
  {
    name: 'Size Category',
    required: false,
    description: '0-700 / 700-1500 / 1500+ (derived if omitted)',
    example: '700-1500',
  },
  {
    name: 'Governorate',
    required: true,
    description: 'Oman governorate where the tanker primarily operates',
    example: 'Muscat',
  },
  {
    name: 'Wilayat',
    required: false,
    description: 'Sub-district within the governorate',
    example: 'Bausher',
  },
  {
    name: 'Operation Region',
    required: false,
    description: 'Internal operational area code',
    example: 'Region-3',
  },
  {
    name: 'TFS (Filling Station)',
    required: true,
    description: 'Tanker Filling Station code (DW tankers only)',
    example: 'TFS-07',
  },
  {
    name: 'Contact Number',
    required: false,
    description: 'Driver or owner mobile number',
    example: '+968 9123 4567',
  },
];
