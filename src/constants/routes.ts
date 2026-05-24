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
  permitRegeneration: '/permit-regeneration',
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
  'permitRegeneration',
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

/* A route can require:
   - null               -> public, anyone can enter
   - UserAccess         -> must hold that single permission
   - UserAccess[]       -> must hold AT LEAST ONE of these (any-of). Used for
                           multi-section pages like Configuration where
                           different tabs map to different permissions. */
export const ROUTE_ACCESS: Record<RouteKey, UserAccess | UserAccess[] | null> =
  {
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
    permitRegeneration: USER_ACCESS.PERMIT_RENEWAL,
    permitRenewal: USER_ACCESS.PERMIT_RENEWAL,
    labelManagement: USER_ACCESS.LABEL_MANAGEMENT,
    reports: USER_ACCESS.REPORTS,
    configuration: [
      USER_ACCESS.CONFIG_NOTIFICATIONS,
      USER_ACCESS.CONFIG_PERMIT_SLA_RULES,
      USER_ACCESS.CONFIG_USERS_ROLES,
      USER_ACCESS.CONFIG_INSPECTION_CHECKLIST,
      USER_ACCESS.CONFIG_CLUSTER_SETUP,
      USER_ACCESS.CONFIG_FLEET_TARGETS,
    ],
    inspectorAssignment: USER_ACCESS.INSPECTOR_ASSIGNMENT,
  };

export function hasRouteAccess(
  routeKey: RouteKey,
  userAccess: UserAccess[],
): boolean {
  const required = ROUTE_ACCESS[routeKey];
  if (required === null) return true;
  if (Array.isArray(required)) {
    return required.some((p) => userAccess.includes(p));
  }
  return userAccess.includes(required);
}

export function firstAllowedPath(userAccess: UserAccess[]): string {
  for (const key of POST_LOGIN_ROUTE_PRIORITY) {
    if (hasRouteAccess(key, userAccess)) return ROUTES[key];
  }
  return ROUTES.forbidden;
}
