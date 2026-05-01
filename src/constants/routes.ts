export const ROUTES = {
  root: '/',
  fleetRegistry: '/fleet-registry',
  authentication: '/auth',
  tankerUpload: '/tanker-upload',
  dashboard: '/dashboard',
  operations: '/operations',
  fleetCompliance: '/fleet-compliance',
  inspectionReview: '/inspection-review',
  permitRenewal: '/permit-renewal',
  labelManagement: '/label-management',
  reports: '/reports',
  configuration: '/configuration',
  inspectorAssignment: '/inspector-assignment',
} as const;

export type RouteKey = keyof typeof ROUTES;
