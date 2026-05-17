# NWS Tanker Module Map

This document maps the main UI and backend modules across the two local projects:

- UI: `C:\projects\nws-tanker-admin-web`
- Backend: `C:\projects\nws-tanker-inspection-backend`

## System Module View

```text
Admin Web (React/Vite)
  Pages and workflows
    -> services/*
    -> store/apiSlices/*
    -> constants/endpoints.ts
    -> HTTP client
      -> Backend REST APIs

Inspection Backend (Spring Boot)
  Controllers / REST interfaces
    -> services
    -> repositories
    -> entities
    -> PostgreSQL / file storage / notifications
```

The UI owns presentation, route protection, form state, table/filter behavior, and API orchestration. The backend owns authentication, authorization enforcement, domain rules, persistence, file handling, notification delivery, and generated permit/document workflows.

## UI Module Map

Base path: `C:\projects\nws-tanker-admin-web\src`

### UI Routing and Access

| Module | Files | Responsibility |
| --- | --- | --- |
| Route tree | `App.tsx` | Mounts public, protected, placeholder, and fallback routes. |
| Route constants | `constants/routes.ts` | Defines URL paths, post-login route priority, and permission requirements. |
| Access constants | `constants/userAccess.ts` | Defines JWT `user_access` permission keys. |
| Route guard | `common-components/ProtectedRoute.tsx` | Redirects unauthenticated users to `/auth` and unauthorized users to `/forbidden`. |
| Auth bootstrap | `hooks/useAuthBootstrap.ts` | Restores local auth state and prepares authenticated HTTP calls. |

Current mounted routes:

| Route | UI module | Access |
| --- | --- | --- |
| `/auth` | `pages/authentication` | Public |
| `/forbidden` | `pages/forbidden` | Public |
| `/fleet-registry` | `pages/fleet-registry` | `FLEET_REGISTRY` |
| `/tanker-upload` | `pages/tanker-upload` | `FLEET_REGISTRY` |
| `/inspection-review` | `pages/inspection` | `INSPECTION_REVIEW` |
| `/inspection-details/:inspectionId` | `pages/inspection-details` | `INSPECTION_REVIEW` |
| `/configuration` | `pages/configuration` | Any configuration permission |
| `/dashboard` | `pages/placeholder` | `EXECUTIVE_DASHBOARD` |
| `/operations` | `pages/placeholder` | `OPERATIONS` |
| `/fleet-compliance` | `pages/placeholder` | `FLEET_COMPLIANCE` |
| `/permit-renewal` | `pages/placeholder` | `PERMIT_RENEWAL` |
| `/reports` | `pages/placeholder` | `REPORTS` |

Declared but not mounted in `App.tsx`: `/label-management` and `/inspector-assignment`.

### UI Feature Modules

| Feature module | Page folder | Main services | Redux/API slices | Backend area |
| --- | --- | --- | --- | --- |
| Authentication | `pages/authentication` | `services/authenticationService.ts`, `services/registrationService.ts`, `services/getContracterService.ts` | `store/slices/authSlice.ts` | `authentication`, `user` |
| Fleet registry | `pages/fleet-registry` | `services/fleetRegistryService.ts`, `services/lookupsService.ts` | `fleetRegistryApiSlice.ts`, `lookupsApiSlice.ts` | `tanker`, `master` |
| Tanker upload | `pages/tanker-upload` | `services/tankerUploadService.ts` | Direct service flow | `tanker` |
| Inspection review list | `pages/inspection` | `services/inspectionService.ts` | `inspectionApiSlice.ts` | `inspector` |
| Inspection details | `pages/inspection-details` | `services/inspectionService.ts` | `inspectionDetailsApiSlice.ts` | `inspector`, `frest` |
| Configuration | `pages/configuration` | `services/configurationService.ts`, `services/fleetTargetsService.ts` | `pendingUsersApiSlice.ts`, `activeUsersApiSlice.ts`, `inspectionChecklistApiSlice.ts`, `permitSlaApiSlice.ts`, `notificationContactsApiSlice.ts`, `clustersApiSlice.ts`, `clusterSetupApiSlice.ts`, `fleetTargetsApiSlice.ts` | `configurations`, `user`, `master` |
| Sidebar and shell | `common-components/AppSidebar`, `common-components/AppShell`, `common-components/AppTopbar` | `services/sidebarService.ts` | `sidebarApiSlice.ts` exists but is not fully wired | Cross-feature |
| Placeholder screens | `pages/placeholder` | None | None | Future modules |

### UI Shared Modules

| Shared module | Path | Purpose |
| --- | --- | --- |
| UI primitives | `atoms` | Buttons, inputs, modal, toast, pagination, icons, and other reusable UI pieces. |
| Layout and guards | `common-components` | App shell, top bar, sidebar, route protection, and screen status components. |
| HTTP layer | `services/http` | Axios client, request wrapper, common headers, URL hydration, upload helpers, and error mapping. |
| Domain services | `services` | Feature-facing API wrappers that call endpoint constants through the HTTP layer. |
| Redux store | `store` | Root store, API slices, auth slice, typed hooks, and shared API state types. |
| Constants | `constants` | Routes, endpoint paths, feature constants, storage keys, and access constants. |
| Types | `types` | Shared API, domain, table, sidebar, inspection, upload, and auth types. |
| Utilities | `utils` | JWT helpers, dates, CSV, phone formatting, initials, and class-name helpers. |
| Theme | `theme` | Shared color and spacing tokens. |

### UI Endpoint Groups

| Endpoint group | Frontend constants | Typical backend module |
| --- | --- | --- |
| Auth | `/api/authenticate`, `/api/refresh-token` | `authentication` |
| Users and registration | `/api/users`, `/api/users/pending`, `/api/users/register/*`, `/api/contractors` | `user` |
| Master data | `/api/master/clusters`, `/api/master/lookups` | `master` |
| Fleet and tankers | `/api/tankers`, `/api/tankers/upload` | `tanker` |
| Inspection review | `/api/inspection/review-screen`, `/api/inspection/review-screen/{inspectionId}/detail` | `inspector` |
| Inspection actions | approve, reject, cancel, requeue, lab result, assign inspector, send notification | `inspector` |
| Configuration | `/api/configurations/*` | `configurations` |

## Backend Module Map

Base path: `C:\projects\nws-tanker-inspection-backend\src\main\java\com\nama`

The backend uses a configurable API prefix through `nama.api.url`. In the currently open `application.properties`, this value is blank, so configurable REST controllers resolve directly under `/api/...`. Some endpoints are fixed to `/nama/v1`, notably health and preview.

### Backend Root and Runtime Modules

| Module | Files / packages | Responsibility |
| --- | --- | --- |
| Application bootstrap | `NamaServiceApplication.java` | Starts Spring Boot, enables auditing/async behavior, and configures OpenAPI metadata. |
| Health | `HealthRest.java` | Exposes health endpoint. This controller uses a fixed `/nama/v1/health` mapping. |
| Runtime config | `src/main/resources/application.properties` | Port, API prefix, CORS, datasource, JWT, notification, multipart, and storage settings. |
| SQL release assets | `releaseSQL` | Database schema and reference artifacts. |

### Backend Domain Modules

| Backend module | Main REST entry | Service/domain area | Persistence area | Purpose |
| --- | --- | --- | --- | --- |
| Authentication | `authentication/controller/IAuthenticationController.java`, `AuthenticationController.java` | `authentication/services`, `authentication/security` | User details via user domain and token support | Login, refresh token, logout, OTP/password flows, JWT security. |
| User and contractor | `user/rest/IUserRest.java`, `UserRest.java` | `user/app/services` | `user/app/domain/entity`, `user/app/domain/repository` | Users, roles, permissions, contractors, employee/contractor registration, approval/rejection. |
| Master data | `master/rest/IMasterDataRest.java`, `MasterDataRest.java` | `master/app/services` | `master/app/domain/entity`, `master/app/domain/repository` | Clusters, governorates, tanker types, and lookup APIs. |
| Tanker | `tanker/rest/ITankerRest.java`, `TankerRest.java` | `tanker/app/services` | `tanker/app/domain/entity`, `tanker/app/domain/repository` | Tanker fleet records, assignments, and upload workflows. |
| Inspection | `inspector/rest/IInspectionRest.java`, `InspectionRest.java` | `inspector/app/services/mobileapp`, `inspector/app/services/checklist` | `inspector/app/domain/entity`, `inspector/app/domain/repository` | Inspection checklist, inspection submission, samples, inspection events, mobile-oriented workflows. |
| Inspection review | `inspector/rest/IInspectionReviewRest.java`, `InspectionReviewRest.java` | `inspector/app/services/review`, permit and permit PDF services | Inspection, permit, lab result, checklist, and event entities | Portal review queue, details, approval, rejection, cancellation, requeue, lab result upload, notifications, permit data. |
| Inspector | `inspector/rest/IInspectorRest.java`, `InspectorRest.java` | Inspector dashboard/profile services | Inspector-related inspection/user data | Inspector dashboard and profile-oriented APIs. |
| Configuration | `configurations/rest/IConfigurationRest.java`, `ConfigurationRest.java` | `configurations/app/services` | `configurations/app/domain` | Permit SLA, inspection checklist setup, fleet targets, cluster setup, notification contacts. |
| Files | `frest/IFileRest.java`, `frest/FileRest.java` | `common/storage` | External S3-compatible object storage | Multipart file uploads and presigned/download URL generation. |
| Permit preview | `preview/PermitTemplatePreviewController.java` | Permit PDF render/i18n services | Permit template data | HTML/template preview endpoint fixed under `/nama/v1/preview`. |

### Backend Cross-Cutting Modules

| Cross-cutting module | Path | Responsibility |
| --- | --- | --- |
| Security | `authentication/security` | Spring Security config, JWT filter/provider, authentication entry point, user details service, and CORS config. |
| Common API model | `common/model`, `common/exception`, `common/error` | Standard response envelopes, errors, global exception handling, pagination/base DTOs. |
| Audit | `common/audit` | JPA auditing and Hibernate Envers revision metadata. |
| Storage | `common/storage` | S3-compatible storage configuration and file storage service. |
| Notifications | `common/notification` | Notification adapters, templates, logs, retry handling, and async notification flow. |
| Tokens | `common/token` | Token entity, repository, service, and generator for non-auth token flows. |
| Shared config/utilities | `common/configuration`, `common/constants`, `common/mapper`, `common/util`, `common/openapi` | Shared Spring beans, constants, mappers, helpers, and OpenAPI support. |

### Backend API Prefix Map

| API area | Typical mapping |
| --- | --- |
| Authentication | `${nama.api.url}/api/authenticate`, `${nama.api.url}/api/refresh-token`, `${nama.api.url}/api/logout` |
| Users and contractors | `${nama.api.url}/api/users/**`, `${nama.api.url}/api/roles`, `${nama.api.url}/api/contractors` |
| Master data | `${nama.api.url}/api/master/**` |
| Tankers | `${nama.api.url}/api/tankers/**` |
| Inspections | `${nama.api.url}/api/inspection/**` |
| Inspection review | `${nama.api.url}/api/inspection/review-screen/**` |
| Inspectors | `${nama.api.url}/api/inspector/**` |
| Configurations | `${nama.api.url}/api/configurations/**` |
| Files | `${nama.api.url}/api/files/**` |
| Health | `/nama/v1/health` |
| Permit preview | `/nama/v1/preview/**` |

## UI to Backend Alignment

| Business area | UI module | UI API constants | Backend module |
| --- | --- | --- | --- |
| Login and sessions | `pages/authentication` | `login`, `refreshToken` | `authentication` |
| Contractor dropdown / registration | `pages/authentication` | `contractors`, `employeeRegistration`, `contractorRegistration` | `user` |
| User approvals and active users | `pages/configuration/users-roles` | `pendingRegistrations`, `approveRegistration`, `rejectRegistration`, `activeUsers`, `updateEmployeeStatus` | `user` |
| Fleet registry | `pages/fleet-registry` | `fleetRegistry` | `tanker` |
| Tanker upload | `pages/tanker-upload` | `tankerUploadSubmit` | `tanker` |
| Master lookups | Shared hooks and filters | `lookups`, `clusters` | `master` |
| Inspection list | `pages/inspection` | `inspectionReview` | `inspector` |
| Inspection detail | `pages/inspection-details` | `inspectionDetails` | `inspector` |
| Inspection decisions | `pages/inspection-details` | `approveInspection`, `rejectInspection`, `cancelInspection`, `requeueInspection` | `inspector` |
| Lab report | `pages/inspection-details` | `labResult` | `inspector`, `frest` |
| Inspector assignment | `pages/inspection-details` | `inspectorsByRole`, `assignInspector` | `inspector`, `user` |
| Notifications | `pages/configuration/notifications`, inspection details notification panel | `notificationContacts`, `sendNotification` | `configurations`, `common/notification`, `inspector` |
| Permit SLA | `pages/configuration/permit-sla` | `permitSla` | `configurations` |
| Inspection checklist config | `pages/configuration/inspection-checklist` | `inspectionChecklist` | `configurations`, `inspector` |
| Cluster setup | `pages/configuration/cluster-setup` | `clusterSetup`, `clusters` | `configurations`, `master` |
| Fleet targets | `pages/configuration/fleet-targets` | `fleetTargets` | `configurations` |

## Notes and Gaps

- The UI declares `/label-management` and `/inspector-assignment`, but these routes are not mounted in `App.tsx`.
- Placeholder UI modules exist for dashboard, operations, fleet compliance, permit renewal, and reports.
- `sidebarApiSlice.ts` and sidebar service code exist, but sidebar live counts appear disabled or incomplete.
- The backend API prefix is configurable. Keep frontend `VITE_API_BASE_URL` aligned with the deployed backend prefix.
- Health and preview endpoints use fixed `/nama/v1` mappings while most controllers use `${nama.api.url}`.
- Backend `application.properties` currently contains sensitive-looking operational values; use sanitized examples and environment variables for documentation and deployment.

