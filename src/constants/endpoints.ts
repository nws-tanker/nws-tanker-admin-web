export const ENDPOINTS = {
  fleetRegistry: '/fleet/tankers',
  lookups: '/lookups',
  sidebar: '/sidebar',
  assignment: '/assignments?plateNumber={plateNumber}',
  tankerUploadColumns: '/tanker-upload/columns',
  tankerUploadTemplate: '/tanker-upload/template',
  tankerUploadSubmit: '/tanker-upload/submit',
  pendingRegistrations: '/admin/pending-registrations',
  approvePendingRegistration: '/admin/pending-registrations/approve',
  rejectPendingRegistration: '/admin/pending-registrations/reject',
  activeUsers: '/admin/users',
  user: '/admin/users/{id}',
} as const;
