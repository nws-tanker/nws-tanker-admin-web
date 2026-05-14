import { USER_ACCESS, type UserAccess } from './userAccess';

export const ROUTES = {
  root: '/',
  fleetRegistry: '/fleet-registry',
  authentication: '/auth',
  forbidden: '/forbidden',
  tankerUpload: '/tanker-upload',
  dashboard: '/dashboard',
  operations: '/operations',
  fleetCompliance: '/fleet-compliance',
  inspectionReview: '/inspection-review',
  inspectionDetails: '/inspection-details/:inspectionId',
  permitRenewal: '/permit-renewal',
  labelManagement: '/label-management',
  reports: '/reports',
  configuration: '/configuration',
  inspectorAssignment: '/inspector-assignment',
} as const;

export type RouteKey = keyof typeof ROUTES;

/* null = public (no auth required). Routes mapped to a UserAccess key require
   that key in the JWT's user_access array.
   Order matters: post-login redirect picks the first route in this list that
    the user has access to. */
export const POST_LOGIN_ROUTE_PRIORITY: RouteKey[] = [
  'dashboard',
  'fleetRegistry',
  'operations',
  'fleetCompliance',
  'inspectionReview',
  'permitRenewal',
  'reports',
  'labelManagement',
  'inspectorAssignment',
  'tankerUpload',
  'configuration',
];

/* Walks POST_LOGIN_ROUTE_PRIORITY top-to-bottom and returns the path of the
   first route the user's JWT user_access grants. Used after login to land
   the user on the most relevant page for their role instead of hard-coding
   a single default. Falls back to /forbidden if no match is found.
*/

export function firstAllowedPath(userAccess: UserAccess[]): string {
  for (const key of POST_LOGIN_ROUTE_PRIORITY) {
    const required = ROUTE_ACCESS[key];
    if (required === null || userAccess.includes(required)) {
      return ROUTES[key];
    }
  }
  return ROUTES.forbidden;
}

export const ROUTE_ACCESS: Record<RouteKey, UserAccess | null> = {
  root: null,
  authentication: null,
  forbidden: null,
  fleetRegistry: USER_ACCESS.FLEET_REGISTRY,
  tankerUpload: USER_ACCESS.FLEET_REGISTRY, // tanker upload is part of fleet management, same permission as fleetRegistry
  dashboard: USER_ACCESS.EXECUTIVE_DASHBOARD,
  operations: USER_ACCESS.OPERATIONS,
  fleetCompliance: USER_ACCESS.FLEET_COMPLIANCE,
  inspectionReview: USER_ACCESS.INSPECTION_REVIEW,
  inspectionDetails: USER_ACCESS.INSPECTION_REVIEW,
  permitRenewal: USER_ACCESS.PERMIT_RENEWAL,
  labelManagement: USER_ACCESS.LABEL_MANAGEMENT,
  reports: USER_ACCESS.REPORTS,
  configuration: USER_ACCESS.CONFIG_NOTIFICATIONS,
  inspectorAssignment: USER_ACCESS.INSPECTOR_ASSIGNMENT,
};
