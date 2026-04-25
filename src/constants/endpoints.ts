export const ENDPOINTS = {
  fleetRegistry: '/fleet/tankers',
  lookups: '/lookups',
  sidebar: '/sidebar',
  assignment: '/assignments?plateNumber={plateNumber}',
  tankerUploadColumns: '/tanker-upload/columns',
  tankerUploadTemplate: '/tanker-upload/template',
  tankerUploadSubmit: '/tanker-upload/submit',
} as const;
