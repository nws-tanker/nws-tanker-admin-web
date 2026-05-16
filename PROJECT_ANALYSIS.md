# NWS Tanker Projects Analysis

This document summarizes the current state of the two local projects:

- `nws-tanker-admin-web`: React/Vite administration dashboard.
- `nws-tanker-inspection-backend`: Spring Boot inspection and tanker service.

## Executive Summary

The projects form a conventional web application pair: a React admin portal calls a Spring Boot REST backend. The admin web is centered around fleet registry, inspection review, permit handling, user/contractor onboarding, and configuration screens. The backend exposes the domain APIs, manages PostgreSQL persistence, handles JWT authentication, stores files through S3-compatible storage, and supports notifications and permit/document workflows.

The main integration detail to watch is the backend base prefix. Backend APIs default to `/nama/v1`, while the admin web endpoint constants start with `/api/...`. For local development, `VITE_API_BASE_URL` should include the backend prefix, for example:

```bash
VITE_API_BASE_URL=http://localhost:8080/nama/v1
```

The current admin `.env.example` shows `http://localhost:8080`, which will cause 404s unless a proxy or gateway adds `/nama/v1`.

## Project Overview

The NWS Tanker platform supports the operational lifecycle for tanker registration, inspection, review, permit issuance, and administrative configuration. It is split into a web dashboard for operators and a backend service that owns business rules, persistence, authentication, and external integrations.

At a high level, users interact with the admin web to review tanker and inspection data, manage contractor/user onboarding, upload tanker information, configure inspection rules, and perform permit-related actions. The admin web does not own the core domain data directly; it presents workflows and delegates reads/writes to the backend APIs.

The backend is the system of record for the domain. It manages users, contractors, tankers, inspections, checklist configuration, permit workflows, files, notifications, and master data. It also provides security through JWT-based authentication and protects most APIs behind role/access checks.

### Main Actors

- Operations users: review inspections, manage fleet records, approve or reject workflows, and monitor platform data.
- Contractors: register and participate in tanker-related workflows.
- Administrators: configure inspection checklist, permit SLA, fleet targets, clusters, and notification contacts.
- Backend service: validates requests, enforces business logic, persists data, sends notifications, and handles file/document workflows.

### System Flow

1. A user logs in through the admin web.
2. The admin web sends credentials to the backend authentication API.
3. The backend returns JWT credentials and access information.
4. The admin web uses route permissions to show allowed dashboard areas.
5. Dashboard actions call backend APIs under `/nama/v1/api/...`.
6. The backend validates the request, applies business logic, reads or writes PostgreSQL data, and optionally stores files or sends notifications.
7. The admin web renders the updated status, records, or workflow result.

### Major Functional Areas

- Authentication and authorization.
- Fleet and tanker registry.
- Contractor and employee registration.
- Inspection review and inspector assignment.
- Inspection approval, rejection, cancellation, and requeue.
- Permit generation and permit SLA handling.
- Checklist and platform configuration.
- File upload and storage.
- Notification configuration and delivery.
- Master data management for clusters, governorates, tanker types, and lookups.

## Project 1: Admin Web

Path: `C:\projects\nws-tanker-admin-web`

### Purpose

The admin web is the dashboard used by NWS/NAMA operational users and contractors to manage:

- Fleet registry and tanker records.
- Inspection review and inspection details.
- Permit SLA, checklist, fleet target, cluster, and notification configuration.
- User registration approval and access-controlled navigation.
- Tanker upload and assignment flows.

### Technology Stack

- React 18 with TypeScript.
- Vite 5 for local development and production builds.
- pnpm 9.x as package manager.
- Redux Toolkit for state management.
- React Router v6 for routing.
- Axios for HTTP calls.
- Tailwind CSS for styling.
- Zod for validation in selected form flows.
- Vitest is available through scripts, but test files were not found during this analysis.

### Main Entry Points

- `index.html` loads the Vite React application.
- `src/main.tsx` wires Redux, router, and toast provider.
- `src/App.tsx` defines the route tree.
- `src/constants/endpoints.ts` centralizes API endpoint paths.
- `src/services/http/client.ts` configures the shared Axios client and auth interceptors.
- `src/store/index.ts` defines the Redux store.

### Source Structure

Important directories:

- `src/pages`: route-level feature screens.
- `src/common-components`: shared shell, sidebar, protected routing, and layout pieces.
- `src/atoms`: reusable UI primitives.
- `src/store`: Redux slices and async API slices.
- `src/services`: domain service wrappers and HTTP utilities.
- `src/constants`: route, access, and endpoint constants.
- `src/types`, `src/utils`, `src/theme`, `src/lib`: shared support code.

The README describes a flatter `components` / `hooks` style structure, but the current codebase is organized around `pages`, `atoms`, `common-components`, `store`, and `services`.

### Authentication and Access Control

The admin web stores JWTs in localStorage and restores auth state during bootstrap. Routes are guarded through `ProtectedRoute`, which checks authentication and route-level permissions derived from JWT access data. If the user is not authenticated, they are routed to `/auth`; if authenticated but unauthorized, they are routed to `/forbidden`.

The Axios client attaches the bearer token and attempts refresh-token handling for a specific backend 401 error shape. This means the frontend is tightly coupled to the backend error contract for expired tokens.

### API Integration

The admin web calls backend paths such as:

- `/api/authenticate`
- `/api/refresh-token`
- `/api/users`
- `/api/users/pending`
- `/api/tankers`
- `/api/tankers/upload`
- `/api/inspection/review-screen`
- `/api/configurations/inspection-checklist`
- `/api/configurations/permit-sla`
- `/api/configurations/fleet-targets`

Because these paths are relative to `VITE_API_BASE_URL`, local configuration should point to the backend prefix:

```bash
VITE_API_BASE_URL=http://localhost:8080/nama/v1
```

### Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm preview
```

### Observations and Risks

- The `.env.example` API URL likely needs `/nama/v1`.
- `VITE_USE_MOCK_API` and `VITE_TEMP_JWT_TOKEN` are documented but appear stale or unused in the current app.
- Several declared dependencies appear unused in the current source tree, including React Query, React Table, Recharts, React Hook Form, and Hookform resolvers.
- There are no visible automated tests under the admin `src` tree.
- Unknown routes redirect to the fleet registry instead of a dedicated 404 page.
- The README structure section is out of date.

## Project 2: Inspection Backend

Path: `C:\projects\nws-tanker-inspection-backend`

### Purpose

The backend is the service layer for the tanker inspection platform. It provides APIs for:

- Authentication and JWT handling.
- User, contractor, and role management.
- Master data such as clusters, governorates, tanker types, and lookups.
- Tanker registry and upload workflows.
- Inspection review, details, approval, rejection, cancellation, and requeue flows.
- Permit generation and related templates.
- Inspection checklist and configuration management.
- File upload and S3-compatible storage.
- Notification setup, templates, and delivery integration.

### Technology Stack

- Java 17.
- Spring Boot 3.2.2.
- Maven.
- Spring Web, Spring Security, Spring Data JPA, Validation, Actuator, and Mail.
- PostgreSQL.
- Hibernate Envers for auditing.
- JJWT for JWT support.
- springdoc-openapi for Swagger/OpenAPI.
- ModelMapper.
- AWS SDK S3 client, configured for S3-compatible storage.
- SendGrid and JavaMail-related notification support.
- Apache POI, Playwright, Thumbnailator, ZXing, Commons IO, and Commons FileUpload.

The project is packaged as a WAR:

```xml
<packaging>war</packaging>
```

### Main Entry Points

- `src/main/java/com/nama/NamaServiceApplication.java`: Spring Boot application entry point.
- `src/main/resources/application.properties`: primary runtime configuration.
- `releaseSQL/schema.sql`: release database schema script.
- `pom.xml`: Maven build and dependency configuration.

### Source Structure

Important packages under `src/main/java/com/nama`:

- `authentication`: login, JWT, Spring Security config, filters, and auth services.
- `user`: user, contractor, role, and registration domain.
- `master`: clusters, governorates, tanker types, and lookup data.
- `tanker`: tanker registry and tanker upload APIs.
- `inspector`: inspection lifecycle, review, checklist, mobile-oriented services, permits, and PDF/document flows.
- `configurations`: permit SLA, checklist, fleet targets, cluster setup, and notification contacts.
- `common`: shared entities, exceptions, mappers, storage, notification, audit, and utility code.
- `frest`: file upload / file access REST endpoints.
- `preview`: permit template preview controller.

The backend commonly uses `I...Rest` or `I...Controller` interfaces for mappings and OpenAPI annotations, with concrete controllers implementing those interfaces.

### Database and Configuration

The backend uses PostgreSQL with Hibernate DDL disabled:

```properties
spring.jpa.hibernate.ddl-auto=none
spring.sql.init.mode=always
```

That means the database schema must already exist or be initialized through SQL scripts. The README mentions `src/main/resources/schema.sql`, but this file was not found during the analysis; the visible schema is under `releaseSQL/schema.sql`.

The backend default API prefix is:

```properties
nama.api.url=/nama/v1
```

Swagger is expected at:

- `http://localhost:8080/swagger-ui/index.html`
- `http://localhost:8080/v3/api-docs`

### Commands

```bash
mvn spring-boot:run
mvn clean install
```

The README currently mentions running `target/nama-service-1.jar`, but the Maven project is configured as a WAR with artifact ID `nws-tanker-inspection-backend` and version `1`. The expected build artifact is therefore closer to:

```bash
target/nws-tanker-inspection-backend-1.war
```

### Security and Operations Notes

The checked-in `application.properties` contains live-looking configuration values for database access, JWT, SMTP, and S3-compatible storage. These should be treated as sensitive. Recommended actions:

- Rotate any credentials that may have been committed.
- Move secrets to environment variables or a secret manager.
- Keep only safe local defaults in source control.
- Add a sanitized `application.example.properties` for developers.

The backend CORS setting allows all origins in the current configuration. That is acceptable for local development, but production should use explicit admin web origins.

### Observations and Risks

- The backend README is partially outdated: artifact type/name and schema path need correction.
- No automated backend tests were found under `src/test`.
- `spring.sql.init.mode=always` may be risky in deployed environments unless initialization scripts and idempotency are controlled.
- The admin web and backend require careful base URL alignment because backend APIs are prefixed with `/nama/v1`.
- Public access to contractor-related endpoints should be confirmed against the intended onboarding/security model.
- Playwright is included as a backend dependency; deployment environments need the required browser/runtime support if those flows are used.
- Dependency versions should be reviewed, especially explicitly pinned Jackson modules that may differ from Spring Boot's managed versions.

## End-to-End Local Setup

### Backend

1. Start PostgreSQL and create/configure the expected database.
2. Ensure schema and seed data are applied.
3. Replace sensitive properties with safe local environment variables.
4. Start the backend:

```bash
cd C:\projects\nws-tanker-inspection-backend
mvn spring-boot:run
```

5. Confirm health/API docs:

```text
http://localhost:8080/swagger-ui/index.html
```

### Admin Web

1. Configure `.env`:

```bash
VITE_API_BASE_URL=http://localhost:8080/nama/v1
```

2. Start the frontend:

```bash
cd C:\projects\nws-tanker-admin-web
pnpm install
pnpm dev
```

3. Open the Vite dev server URL shown in the terminal.

## Recommended Next Steps

1. Sanitize backend configuration and rotate committed secrets.
2. Update both READMEs so setup instructions, artifact names, schema paths, and frontend API base URL are accurate.
3. Add minimal smoke tests for authentication, fleet registry, inspection review, and configuration APIs.
4. Add frontend tests for route protection, login flow, and key API slice behavior.
5. Decide whether mock API support is still needed in the admin web; either implement it or remove stale env flags.
6. Review unused frontend dependencies and remove packages that are no longer planned.
7. Document production deployment variables, including CORS origins, storage config, database config, JWT secret, and notification provider settings.

