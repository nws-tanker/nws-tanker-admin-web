export const ENDPOINTS = {
  fleetRegistry: '/tankers',
  lookups: '/master/lookups',
  tankerUploadSubmit: '/tankers/upload',
  sidebar: '/sidebar',
  assignment: '/assignments?plateNumber={plateNumber}',
  pendingRegistrations: '/admin/pending-registrations',
  approvePendingRegistration: '/admin/pending-registrations/approve',
  rejectPendingRegistration: '/admin/pending-registrations/reject',
  activeUsers: '/admin/users',
  user: '/admin/users/{id}',
} as const;
