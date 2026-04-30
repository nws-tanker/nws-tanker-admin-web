---
name: coding-standards
description: Project coding standards for the nws-tanker-admin-web dashboard. Use whenever adding or modifying code - components, pages, hooks, utils, Redux slices, theme, constants, or types. Enforces folder structure, component size limits, Redux patterns (apiSlices/slices) mirrored from the nws-tanker-mobile repo, and React best practices for complex dashboards.
---

# nws-tanker-admin-web Coding Standards

Apply these rules whenever you create a new file, move code, or modify existing structure. The Redux, folder, and hook conventions are modeled on `../nws-tanker-mobile` (sibling repo) - consult it as the authoritative reference when in doubt.

## 1. Folder Structure

The `src/` tree MUST follow this layout:

```
src/
  atoms/              # Atom-level, design-system primitives (Button, Input, Tag, Modal, ...)
  common-components/  # App-specific but reusable across multiple pages (AppHeader, SidebarNav, PageHeader, ...)
  pages/              # One folder per application page/route
  hooks/              # Generic hooks reusable across pages
  utils/              # Pure helpers - both generic (date, format, array) and application-specific
  store/
    index.ts          # configureStore, RootState, AppDispatch, typed useAppSelector/useAppDispatch
    types.ts          # States enum, ApiError, ApiResponse<T>, ApiState<T> envelope types
    apiSlices/        # One file per API (server state) - createAsyncThunk + createSlice
    slices/           # Client-only global state slices
  services/           # HTTP clients, per-domain service modules that return ApiResponse<T>
  mocks/              # Mock response payloads grouped by feature/page (see §11b)
  theme/              # colors, spacing, typography, tokens - themification config only
  constants/          # endpoints, routes, storageKeys, validation messages, enums
  types/              # Types SHARED across multiple components/pages (put component-local types in the component file)
  assets/             # Static images/icons
```

Do not invent new top-level folders without strong justification.

## 2. Component Rules

- **Size cap: 150-200 lines max per component file.** Smaller is better. If a component exceeds this, split it before adding more.
- **One component per file.** Every function-component definition lives in its own `.tsx` file named after the component. Even small private helpers used only inside the parent — split them out into `Parent/Helper.tsx` next to `Parent.tsx`. Why: navigability ("go to file" jumps straight to the component), clean diffs (one file, one concern), trivial promotion (an extracted file can be moved to `atoms/` or `common-components/` without code surgery), and grep-by-name actually works. *What's allowed in the same file:* the component's `Props` type, its module-scope const tables (`TONE_CLASS`, etc.), and any types/helpers directly serving the single component. *Not allowed:* a second `function MyHelper(...)` or `const MyHelper = (...) =>` returning JSX. JSX expressions like `<StatusIndicator />` from imported atoms are usages, not definitions, and don't count.
- **File names are PascalCase** and match the default export: `DashboardStats.tsx` exports `DashboardStats`. Hooks and utils are camelCase.
- **Pages:**
  - Small page: `pages/dashboard/DashboardPage.tsx` (single file).
  - Large page: `pages/dashboard/index.tsx` is the page entry, and `pages/dashboard/components/` holds sub-components used only by this page. Page-local hooks go in `pages/dashboard/hooks/`, page-local helpers in `pages/dashboard/*Helpers.ts`.
- **Atoms** are purely presentational primitives. No Redux, no API calls, no router usage. They accept props and emit callbacks.
- **common-components/** is for app-specific reusable pieces (e.g. a `TankerStatusBadge` used on 3+ pages). If a piece is used on only one page, it belongs in that page's `components/` folder. If it has no app semantics, it belongs in `atoms/`.
- **Prefer composition over prop explosion.** If a component has >8 props or deeply nested conditional rendering, split it.

### 2a. Overlay atoms render through `createPortal` to `document.body`

Any atom that visually floats above the page — `Modal`, `Select` / `MultiSelect` dropdown panels, future `Popover` / `Tooltip` / `Drawer` / `Toast` — **must render via `createPortal(node, document.body)`**, not inline in its host tree.

Why (not just z-index):
- `position: fixed` stops escaping the viewport the moment any ancestor gets `transform`, `filter`, `perspective`, or `contain: paint`. Each of those silently creates a new containing block, trapping the overlay inside.
- `overflow: auto` / `hidden` ancestors **clip** absolutely-positioned descendants regardless of z-index. No z-index value can escape a clip.
- Portals sidestep both: the node attaches to `<body>`, lives in the root stacking context, and is clipped only by the viewport itself.

Rules:
- Compute position from the trigger's `getBoundingClientRect()` in a `useLayoutEffect`. Re-measure on `resize` and `scroll` (`{ capture: true }` so nested scrolls fire), so the panel tracks the trigger.
- Outside-click handlers must allow clicks inside the portaled node as well as the trigger — neither is a DOM descendant of the wrapper once portaled.
- z-index convention: Modal `z-[200]`, Select/MultiSelect panels `z-[500]`, Toasts higher still. Higher z only matters among siblings at the body stacking context — don't sprinkle z-index on intermediate ancestors expecting it to bubble.

React event bubbling works normally through portals (React re-parents synthetic events to the logical tree), so `onClose` / `onSubmit` handlers keep working.

### 2b. Sibling atoms over polymorphic atoms

When a new use case needs an atom that looks similar to an existing one but would require **conflicting variants** to coexist, create a **sibling atom** with a distinct name rather than parameterizing the existing one.

Signals that a sibling atom is the right call:
- The two use cases live on different surfaces (light content area vs. dark navigation shell)
- The variants would cross multiple prop axes (tone × dot on/off × font × density × bg-light/bg-dark)
- The content semantics differ (status label vs. numeric count; button vs. icon button)
- Adding one more variant flips the atom from "has a clear role" to "does everything, poorly"

Example from this codebase: `Badge` (status indicator, light bg + colored dot + label) and `CountBadge` (numeric count, dark-surface pill, mono font). Two small focused atoms beat one atom with a `variant: 'status' | 'count'` prop that forks nearly every style.

Name atoms by **role**, not by variant. `CountBadge` tells you what it's for; `Badge variant="count"` hides the role inside a prop.

### 2c. Never hand-roll interactive primitives outside atoms

**Rule:** code outside `src/atoms/` must not render raw `<button>`, `<input>`, or `<select>` elements. Always go through an atom — `Button`, `IconButton`, `TextInput`, `SearchInput`, `Select`, `MultiSelect`, etc. If the use case doesn't fit an existing atom, **add a new atom (or extend an existing one with props/variants) first, then consume it.**

Why: consistent focus rings, hover states, disabled states, dark-mode variants, a11y attributes, and keyboard behavior all live in one place. Hand-rolled primitives diverge within a week.

When extending an atom to cover a new variant:
- Prefer **props** (`variant`, `size`, `tone`) over a new atom. `IconButton` has `variant: 'default' | 'ghost-dark'` for topbar vs. sidebar contexts rather than two separate atoms.
- For **composite primitives** (an icon + input + clear button behaving as one "search field"), create a dedicated atom (`SearchInput`) rather than asking consumers to reassemble the composite every call site.

Atoms themselves may use raw `<button>` / `<input>` / `<select>` — they *are* the primitives. That is the only place those native elements should appear. If you find a raw native interactive element anywhere under `pages/` or `common-components/`, treat it as a bug.

### 2d. Atoms that render option lists

Any atom that renders a list of selectable options (`Select`, `MultiSelect`, future `Combobox`, `RadioGroup`, `Autocomplete`) takes the **shared `SelectOption<V>` shape** from `atoms/option.ts`:

```ts
export type SelectOption<V extends string = string> = {
  value: V;
  label: ReactNode;
  disabled?: boolean;
};
```

Rules:
- **Never expose raw `<option>` children** from these atoms; callers pass `options: SelectOption<V>[]` instead. This keeps call sites one-liners and prevents each consumer from reinventing its own option shape.
- **Don't add a separate `labelMap` / `getLabel` prop** — put the display value inside `label`. If the label is derived (e.g. from a constants map), derive it when building the options array at the call site, ideally inside a module-scope constant or `useMemo`.
- **`value` is always the canonical value** (`string` by default, narrowable via the generic). Single-select atoms accept `V | ''` with `''` meaning "no selection"; multi-select atoms accept `V[]`.
- **Keep single-select and multi-select as separate atoms.** Native `<select>` is the right choice for single-select (keyboard + mobile); multi-select needs a custom checkbox dropdown. They share the option shape, not the render path.
- **Module-scope options for static lists.** When options are derived from constants (e.g. `TANKER_TYPES → TYPE_OPTIONS`), build them once at module scope outside the component. Only use `useMemo` when the option list depends on props/state.

## 3. Keep Logic Out of Components

Components should be thin. Push logic to:
- **Event handlers / callbacks** - validation, derivations, simple state transitions.
- **Custom hooks** (`hooks/` or `pages/<page>/hooks/`) - stateful flows, form management, data fetching orchestration.
- **Utils** (`utils/`) - pure functions: formatting, parsing, array/object transforms, validators.

Follow the `useRegisterForm` pattern from the mobile repo: keep form state, validators, handlers, and a pure `validateXForm` function inside one hook; the component just reads values and wires callbacks.

**No nested ternaries.** A `cond1 ? a : cond2 ? b : c` chain is harder to read than the equivalent guard-clause function. Pull the branches into a named helper and use early returns:

```ts
// ❌ avoid
const state =
  fleet.state === ERROR || lookup.state === ERROR
    ? ERROR
    : fleet.state === SUCCESS && lookup.state === SUCCESS
      ? SUCCESS
      : LOADING;

// ✅ prefer
function rollupApiStates(...states: States[]): States {
  if (states.some((s) => s === States.ERROR)) return States.ERROR;
  if (states.every((s) => s === States.SUCCESS)) return States.SUCCESS;
  return States.LOADING;
}
const state = rollupApiStates(fleet.state, lookup.state);
```

A single ternary (`cond ? a : b`) is fine. Two levels deep means the logic deserves a name. If the branches are domain-meaningful (rolling up states, picking a label, mapping a status) the helper usually wants to live in `utils/` or next to the type it operates on, so other consumers benefit too.

## 3a. JSX Readability — Extract Named Sub-Components

A reader should be able to open a component and grasp its structure within a few seconds from the `return` alone. If the JSX has become a wall of nested `<div>`s with inline conditionals, split it.

Triggers for extraction:
- A visual region has its own **label, conditional branch, or role name** you can point to ("the inspector field", "the override warning"). That role is the sub-component name.
- A block is **≥ ~15 lines** of markup or contains **>1 level of ternary nesting**.
- The same shape appears **twice** in the same component (one repetition is fine; two means abstract).
- A prop-driven conditional (`{existingName ? <big-block/> : null}`) obscures the main flow.

Rules for sub-components:
- **Name by role in this view, not by HTML shape.** `InspectorField` beats `LabeledSelect`; `AssignModalFooter` beats `ButtonGroup`; `AssignmentOverrideNote` beats `InfoBanner`.
- **Page-local by default.** A sub-component used in only one parent belongs in the parent's folder (`pages/<page>/components/<Parent>/`), not promoted to `common-components/` or `atoms/`. Promote only when a 3rd consumer appears.
- **A complex component becomes a folder.** `AssignInspectorModal.tsx` → `AssignInspectorModal/` with `index.tsx` + sibling files (sub-components + hook). The folder's `index.tsx` is the public entry; siblings are private.
- **Bias toward more small components.** A 40-line parent composing four 20-line children reads better than one 120-line file, even at the cost of extra files.
- **Keep presentational and stateful pieces separate.** If a section owns its own state, prefer a hook (`useAssignInspectorForm`) over embedding state in a sub-component, so sub-components stay purely presentational.

When NOT to extract:
- Single-line JSX (a small error message, a `<strong>` span). Those stay inline.
- A div that only exists to group siblings with `className` — inline it.
- Speculative sub-components for "future reuse" that don't exist yet. Extract when the actual reuse appears.

State reset on target change (modals, drawers, detail panels):
- **Prefer `key={target.id}` over `useEffect` to sync props into state.** Remount the inner form when the target changes — React re-initializes `useState` naturally. This is the canonical React pattern and leaves the state-owning component simpler. See `AssignInspectorModal/index.tsx` (null-guard + keyed inner) for the shape.

## 4. Hook Rules

- **No mega-hooks.** If a hook returns more than ~6-8 values or handles multiple concerns, split it into smaller focused hooks that compose.
- Name hooks by feature + concern: `useChecklistPhotos`, `useDocumentPicker`, `useAccordionSections` (see `src/screens/inspection-checklist/hooks/` in the mobile repo).
- Hooks may compose other hooks, but each hook should have a single clear responsibility.

## 5. useEffect Discipline

Use `useEffect` sparingly. Before reaching for it, ask:
- Can this run in an event handler or callback instead? **Do it there.**
- Is this a derivation from props/state? Compute inline or with `useMemo`, not `useEffect` + `setState`.
- Is this data fetching tied to a user action? Dispatch in the handler.
- Is this syncing external state (subscriptions, listeners, URL, timers)? **This is a valid useEffect case.**

When you do use `useEffect`, keep the dependency array honest and the body minimal. Never use it to "keep two pieces of state in sync" - lift the derivation instead.

## 6. State Management

- **Default to local state** (`useState`, `useReducer`). Do not lift state to Redux unless it is genuinely global (shared across unrelated routes) or server-sourced.
- **Client-only global state** (UI settings, cross-page selections) → `src/store/slices/` via `createSlice`.
- **Server state** (API responses, async ops) → `src/store/apiSlices/` via `createAsyncThunk` + `createSlice`.
- Type the store consumers via `useAppSelector` / `useAppDispatch` (typed wrappers exported from `store/index.ts`).

### 6a. API Slice Pattern (mirror `nws-tanker-mobile`)

Every API slice follows this exact shape - see `src/store/apiSlices/dashboardApiSlice.ts` in the mobile repo:

```ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDashboardApi } from '@/services/dashboardService';
import { type ApiError, type ApiState, States } from '../types';

type DashboardApiState = ApiState<DashboardData>;

const initialState: DashboardApiState = {
  apiState: States.PRELOADING,
  data: null,
  error: null,
};

export const fetchDashboard = createAsyncThunk<
  DashboardData,
  TankerView,
  { rejectValue: ApiError }
>('dashboardApi/fetchDashboard', async (arg, { rejectWithValue }) => {
  try {
    const response = await fetchDashboardApi(arg);
    if (!response.success) return rejectWithValue(response.error);
    return response.data;
  } catch {
    return rejectWithValue({ code: 'NETWORK_ERROR', description: 'Unable to connect to server' });
  }
});

const dashboardApiSlice = createSlice({
  name: 'dashboardApi',
  initialState,
  reducers: { resetDashboard: () => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => { state.apiState = States.LOADING; state.error = null; })
      .addCase(fetchDashboard.fulfilled, (state, action) => { state.apiState = States.SUCCESS; state.data = action.payload; state.error = null; })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.apiState = States.ERROR;
        state.error = action.payload ?? { code: 'UNKNOWN_ERROR', description: 'Something went wrong' };
      });
  },
});

export const { resetDashboard } = dashboardApiSlice.actions;
export default dashboardApiSlice.reducer;
```

Rules:
- One API endpoint (or tightly-coupled set) per slice file. File name: `<feature>ApiSlice.ts`.
- Always use the shared `ApiState<T>` / `ApiError` / `States` types from `store/types.ts`.
- Services (`services/<feature>Service.ts`) return `ApiResponse<T>` (discriminated union). Never throw for API-level failures - return `{ success: false, error }`. Only network/unexpected exceptions bubble to the catch.
- Provide a `resetX` reducer on every slice.

### 6b. Client Slice Pattern

See `src/store/slices/checklistSlice.ts` in the mobile repo. Client slices can listen to API slice thunks via `extraReducers` to hydrate local editable state from server data. Keep reducer functions small; extract helpers above the slice (e.g. `updateItem`, `updateDocument`).

## 7. Types

- **Shared types** (used by 2+ components/pages) → `src/types/` grouped by domain: `types/tanker.ts`, `types/user.ts`, re-exported from `types/index.ts`.
- **Component-local types** (props, local state shapes) → at the top of the component file.
- **Slice state types** → colocated in the slice file.
- Prefer `type` over `interface` unless you need declaration merging.

## 8. Constants

- All magic strings/numbers used in 2+ places go in `src/constants/`.
- Split by concern: `endpoints.ts`, `routes.ts`, `storageKeys.ts`, `validation.ts`, `language.ts`.
- Use `SCREAMING_SNAKE_CASE` for constant names and `as const` for literal object maps.

## 9. Theme

- `src/theme/` owns design tokens only: `colors.ts`, `spacing.ts`, `typography.ts`, `borderRadius`, `iconSize`, etc.
- Re-export from `theme/index.ts`.
- No component code, no logic - just values.
- When using Tailwind, tokens feed `tailwind.config.ts`; do not hardcode hex values or px values in components.

## 10. Utils

- `src/utils/` holds pure, side-effect-free helpers. Group by concern: `date.ts`, `format.ts`, `array.ts`, `validators.ts`, `storage.ts`.
- Re-export via `utils/index.ts`.
- Application-specific helpers that are reused (e.g. `formatTankerNumber`) also live here, but closer-scoped helpers belong with the page (e.g. `pages/inspection-checklist/checklistHelpers.ts`).
- Every util must be unit-testable in isolation (no React, no store).

## 11. Services

- `src/services/<feature>Service.ts` wraps HTTP calls. Returns `ApiResponse<T>`.
- Shared HTTP client config lives in `services/http/` (see §11a).
- Thunks in `apiSlices/` call services - never call `fetch`/`axios` directly from a slice or component.

### 11a. Mock vs. real API — every service forks on `USE_MOCK`

Every service function must support both **mock mode** (canned response + simulated latency, for local dev and demos without a backend) and **real mode** (HTTP call through the shared axios client). The fork lives inside the service, not the caller.

Env var: `VITE_USE_MOCK_API` in `.env` / `.env.example` (typed in `src/vite-env.d.ts`). `src/services/mockConfig.ts` exposes:
```ts
export const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';
export function mockDelay(ms = 300): Promise<void>;
```

Shared HTTP layer in `src/services/http/` (mirrors the mobile repo's `services/http/` exactly):
- `client.ts` — axios instance using `VITE_API_BASE_URL`; `setAuthToken` / `clearAuthToken`.
- `commonHeaders.ts` — `Content-Type`, `Accept`, `X-Platform: web`, `X-App-Version`, `X-Request-Timestamp`.
- `errorMapping.ts` — `buildErrorResponse`, `httpStatusToCode`, `httpStatusToDescription`. Maps HTTP statuses (401/403/404/408/409/422/429/5xx) to stable `ApiError.code` strings used across the app.
- `hydrateUrl.ts` — fills `{name}` placeholders in URL templates, drops empty query params.
- `request.ts` — `apiRequest<T>({ url, method, params, body, ... })` returns `ApiResponse<T>`, catches every axios error path (status body, network, timeout, setup) and returns the envelope. Plus shorthand `get` / `post` / `put` / `patch` / `del`.
- `index.ts` — barrel.

Every service file follows this exact shape:
```ts
import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import { get } from './http';
import { MOCK_X } from '@/mocks/<feature>/x';
import { mockDelay, USE_MOCK } from './mockConfig';

export async function fetchXApi(): Promise<ApiResponse<X>> {
  if (USE_MOCK) {
    await mockDelay();
    return { success: true, data: MOCK_X };
  }
  return get<X>(ENDPOINTS.x);
}
```

Rules:
- **`USE_MOCK` check is the first line** of the service function. No conditional logic before it, no branching based on arguments.
- **Mocks return the same `ApiResponse<T>` envelope** as real calls — so downstream thunks and selectors don't care which path ran.
- **Mock data lives in `src/mocks/<feature>/`** (see §11b), not in `constants/` — mocks are wire-shape payloads, not domain constants.
- **Endpoint URLs come from `constants/endpoints.ts`** — never inline a URL string inside a service. Use `hydrateUrl` for templates with placeholders.
- **Never call `fetch` / `axios` directly** from a service; always go through `http/request.ts` (`get` / `post` / etc.) so error mapping and common headers are uniform.
- When a service needs data from **multiple endpoints**, fan out inside the service (e.g. `Promise.all([get(a), get(b)])`) and early-return the first failure — the caller still sees one `ApiResponse`.

### 11b. Mocks live in `src/mocks/<feature>/`, grouped by page or domain

Mock payloads are organized by the **page or feature** that consumes them, mirroring the mobile repo's `src/mocks/<feature>/` layout. This makes "where do I tweak the seed data for the X page?" a one-step lookup from the folder name.

```
src/mocks/
  fleet-registry/          # all mock payloads consumed by pages/fleet-registry/
    tankers.ts             # MOCK_TANKERS — fetchFleetTankers response
    assignment.ts          # buildAssignInspectorMock — assignInspectorApi response
  lookups/                 # /lookups response (shared across pages)
    lookups.ts
  sidebar/                 # /sidebar response (shared layout)
    sidebar.ts
```

Rules:
- **One folder per feature/domain**, even when there's only one mock file in it. Predictable layout > saving a folder for a single-file group; future mocks in the same domain land next to it.
- **Folder name matches the page name** for page-scoped data (`fleet-registry/`, `inspection-review/`), or the domain name for shared data (`lookups/`, `sidebar/`).
- **Services import from `@/mocks/<feature>/<file>`**, never from a relative `./mockData/...`. The dependency direction is service → mock; pages do not import mocks directly.
- **Mock files export builder functions when the response includes runtime data** (timestamps, echoed inputs) — see `assignment.ts`'s `buildAssignInspectorMock(plate, request)`. Static payloads use top-level `MOCK_X` constants.
- A mock file may **only** export the response shapes for one API or a tightly-coupled set; do not bundle unrelated mocks in the same file.

## 12. Additional Best Practices for Complex Dashboards

These are not in the user's original list but are required for a maintainable dashboard app:

- **Route-level code splitting.** Lazy-load page components with `React.lazy` + `Suspense` so the initial bundle stays small.
- **Loading/empty/error states are first-class.** Every data-driven view must render all four states (`PRELOADING`, `LOADING`, `SUCCESS`, `ERROR`). Use the `States` enum from `store/types.ts` as the source of truth, not boolean flags.
- **Memoize deliberately, not reflexively.** Use `useMemo`/`useCallback` only when the value is expensive to compute or is passed to a memoized child / dependency array. Sprinkling them everywhere hurts readability without measurable gains.
- **Selectors over raw slice reads.** For non-trivial derivations from store state, write a selector function next to the slice and import it. Prevents duplicated logic in components.
- **Normalize list data in slices.** For large entity collections, store as `{ byId, allIds }` rather than arrays to make updates O(1) and avoid re-renders.
- **Accessibility:** every interactive atom must support keyboard and have a label. Tables use `<th scope>`, modals trap focus, icon-only buttons get `aria-label`.
- **Controlled forms via hooks.** All forms use a dedicated `useXForm` hook that owns `formData`, `errors`, `handleInputChange`, and a pure `validateXForm` function (mirror `useRegisterForm`).
- **No inline anonymous style/config objects in hot render paths** - hoist them to module scope or memoize.
- **Barrel files (`index.ts`) in atoms/, utils/, theme/, types/** to keep imports clean. Do not barrel pages or components (it hurts lazy-loading).
- **Path aliases:** use `@/` (configured in `tsconfig.json` + `vite.config.ts`) for all `src/` imports. No `../../../` chains.
- **Error boundaries** at the page level so a crash in one page does not blank the whole app.
- **Keep `App.tsx` thin:** router config + global providers (Redux `<Provider>`, theme, query client, error boundary) only.

## 13. When Editing Existing Code

- If you touch a file that already violates these standards (e.g. a 400-line component), prefer to split it as part of your change rather than adding to it. If a full split is out of scope, at minimum do not grow the file further.
- When unsure about a pattern, open the equivalent file in `../nws-tanker-mobile` and mirror it.
