# Instructions for the Coding Agent

Before making any changes, read and understand this entire file.

Treat its instructions as the requirements for the task. Follow them throughout implementation and verification.

Your task is limited to completing the Cart Dashboard and Users Dashboard by following the existing Product Dashboard's UI, architecture, and coding patterns.

Do not modify, delete, rename, move, or refactor anything outside the explicitly permitted scope.

Do not start coding until you have reviewed the instructions and inspected the existing project.

If any instruction conflicts with preserving the existing project or protecting the Product Dashboard, prioritize project safety and report the conflict instead of making risky changes.
# Task: Implement Cart and Users Dashboards Safely

## Objective

Complete the existing **Cart Dashboard** and **Users Dashboard** by following the existing **Product Dashboard as the single source of truth** for UI presentation, architecture, component structure, coding patterns, and data flow.

Use **DummyJSON only**, through the project's existing API/Axios configuration.

**Scope is strictly limited to implementing and connecting the Cart and Users dashboards. Preserve the entire existing project as it is outside the changes strictly required for these two dashboards.**

Do not perform unrelated refactoring, cleanup, file deletion, redesign, or changes to existing features.

Execute the task in one run without requesting approval between normal implementation steps. Stop only when a safety rule explicitly requires it.

---

## 1. Product Dashboard Is the Single Source of Truth

Before writing code, thoroughly inspect the existing Product Dashboard and understand its implementation.

Follow its established conventions as closely as possible, including:

- UI layout, visual hierarchy, spacing, styling, and presentation.
- Tables, cards, dialogs, forms, buttons, and shared UI components.
- Folder structure, file naming, imports, and exports.
- API service organization and request handling.
- Redux Toolkit slices, thunks, selectors, and state management.
- Loading, error, empty, and success states.
- Pagination, sorting, searching, filtering, and CRUD interactions where supported.
- Component responsibilities and the flow of data between layers.

**The Cart and Users dashboards must follow the same presentation style and implementation approach as the Product Dashboard.**

Do not invent a new design or architecture when an applicable pattern already exists in Product.

Reuse existing shared components whenever appropriate. Do not duplicate components or logic unnecessarily.

If Product does not provide an applicable pattern for a specific feature, implement the smallest solution that remains consistent with the existing project.

---

## 2. Strict Scope and Project Preservation

Only implement the Cart Dashboard and Users Dashboard, plus the minimum necessary supporting code required to make them work.

### Allowed changes

- Create or update Cart-specific service files, Redux slices/thunks, and components.
- Create or update Users-specific service files, Redux slices/thunks, and components.
- Register the new Redux slices in the existing store if required.
- Add missing Cart or Users routes if required, following the existing routing conventions.
- Update the minimum necessary imports or configuration directly related to connecting these dashboards, provided the change does not affect existing features.
- Reuse existing shared components without changing their behavior.

### Forbidden changes

- **Never modify existing Product Dashboard files.**
- Do not change existing Product Dashboard behavior, styling, functionality, or data flow.
- Do not delete any files or folders.
- Do not rename or move existing files.
- Do not clean up unused files, imports, components, dependencies, or code.
- Do not refactor unrelated code.
- Do not redesign existing pages.
- Do not change global styles, layouts, navigation, authentication, API configuration, or routing architecture unnecessarily.
- Do not replace existing shared components with new implementations.
- Do not install new libraries unless absolutely necessary. If a new dependency appears necessary, do not install it automatically; document the issue instead.
- Do not change package versions or project configuration unrelated to the task.

**Preserve every existing file and feature. Do not delete, replace, or rewrite existing project code merely because a different implementation seems cleaner.**

If an existing shared file must be changed, first determine whether the task can be completed without changing it. Prefer the no-change approach.

If a shared-file change is genuinely unavoidable, keep it minimal and ensure it cannot alter Product Dashboard behavior. If that cannot be guaranteed, stop the affected change and explain the blocker instead of risking the project.

---

## 3. Git and User-Change Safety

Before editing:

1. Inspect the current Git status.
2. Identify existing staged, unstaged, and untracked changes.
3. Preserve all pre-existing user changes.
4. If Git is available and branch creation is safe, create a dedicated working branch before the first edit.

Never use destructive commands such as `git reset --hard` or broad checkout/revert commands.

Do not stash, overwrite, or revert the user's existing work.

If branch creation is unavailable or unsafe, stop before editing and explain why.

Do not commit changes unless the repository's established workflow explicitly requires it.

Before finishing, inspect the Git diff and verify that:

- Existing Product Dashboard files are unchanged.
- No existing files were deleted, renamed, or moved.
- Changes are limited to the Cart Dashboard, Users Dashboard, and strictly necessary supporting code.
- Pre-existing user changes have been preserved.

Do not claim these conditions are satisfied unless you verify them.

---

## 4. Use DummyJSON Only

Use `https://dummyjson.com` as the only data source for Cart and Users.

Use the existing API/Axios configuration. Do not create a separate API client if the project already has one.

Do not use:

- Mock data or fake records.
- Hardcoded fallback records.
- Another API or backend.
- Fabricated fields or values.
- Fake success states that misrepresent the actual API behavior.

The actual API response and supported endpoint behavior must determine what the dashboards display and which operations they provide.

If the API does not provide a field shown in the existing UI, handle the mismatch consistently with the Product Dashboard's patterns. Omit the field, leave it empty where appropriate, or make the smallest necessary presentation adjustment.

Never invent data to fill a missing field.

DummyJSON write operations are simulated and do not persist changes permanently. Make sure the UI does not mislead users into believing those changes were permanently saved.

---

## 5. Step 1 — Inspect the Existing Project

Before implementing anything, inspect:

- The complete Product Dashboard implementation.
- The current Cart Dashboard implementation.
- The current Users Dashboard implementation.
- Existing API services and API/Axios configuration.
- Redux store configuration and existing slices.
- Routing and navigation.
- Shared components, hooks, and utilities.
- Existing pagination, sorting, searching, filtering, and CRUD patterns.
- Available package scripts for build, lint, type-checking, and tests.

Trace the complete Product Dashboard data flow:

**Component → Redux thunk/action → service/API request → API response → Redux state → UI.**

Use the same applicable flow for Cart and Users.

Identify which existing components and patterns can be reused without modification.

Do not delete, rename, move, or clean up any files during this task.

---

## 6. Step 2 — Verify DummyJSON Capabilities

Where network access is available, make real requests and inspect the actual responses. Use official DummyJSON documentation where necessary.

### Cart endpoints

Investigate:

- `GET /carts`
- `GET /carts/1`
- `GET /carts/user/5`
- Pagination and field selection, such as `?limit=2&skip=10&select=total,userId`
- Sorting, such as `?sortBy=total&order=desc`
- Available write operations and their documented behavior.

### Users endpoints

Investigate:

- `GET /users`
- User details where applicable.
- Supported user search and filtering endpoints.
- Pagination and field selection.
- Sorting.
- Available write operations and their documented behavior.

Do not assume an operation or query parameter is supported without checking the available documentation or response.

For both dashboards:

- Record the actual response fields.
- Identify which operations the API supports.
- Do not make unnecessary per-row requests to populate extra information.
- Display data provided by the relevant endpoint.
- Clearly distinguish simulated writes from persistent storage.

If network access is unavailable, state that limitation internally in your final report and rely on the available documentation and existing project patterns. Do not claim that live API requests were tested.

---

## 7. Step 3 — Implement the Cart Dashboard

Implement Cart first, following the Product Dashboard's architecture and conventions.

### Requirements

- Use the existing API configuration.
- Implement Cart-specific services and Redux logic using the established project pattern.
- Connect the Cart UI to actual DummyJSON responses.
- Match the Product Dashboard's presentation and interaction patterns.
- Reuse existing tables, buttons, dialogs, forms, pagination controls, and other shared components.
- Implement pagination, sorting, filtering, and searching only where supported by the API and relevant to the existing dashboard.
- Provide loading, error, empty, and success states consistent with Product.
- Handle failed requests without crashing the dashboard.
- Avoid unnecessary API requests for additional row-level fields.
- Do not introduce mock data or fabricated fallback values.
- Make simulated write operations clear to the user.
- Preserve the existing project structure.

Do not modify Product Dashboard files.

### Cart verification

After implementation:

1. Run the relevant available build, lint, type-check, and test commands.
2. Inspect their actual outputs.
3. Fix issues introduced by the Cart implementation.
4. Verify the Cart data flow from API service through Redux to the UI.
5. Verify the relevant routes, imports, and component integration.
6. Confirm that the Product Dashboard remains unchanged.

Do not proceed with changes that could destabilize the project while an introduced issue remains unresolved. If a blocker cannot be resolved safely, preserve the existing project and report it.

---

## 8. Step 4 — Implement the Users Dashboard

After the Cart Dashboard has been implemented and verified, implement Users using the same established approach.

### Requirements

- Use the existing API configuration and DummyJSON only.
- Implement Users-specific services and Redux logic following the Product Dashboard's patterns.
- Register the Users slice if required, using the existing Redux store conventions.
- Add a missing Users route only if necessary and consistent with existing routing.
- Match the Product Dashboard's presentation and interactions.
- Reuse existing shared components without changing their behavior.
- Connect the UI to actual API responses.
- Implement only supported searching, filtering, sorting, pagination, and CRUD operations.
- Provide loading, error, empty, and success states.
- Never fabricate user information or introduce mock fallback records.
- Clearly communicate simulated write operations and their nonpersistent behavior.
- Preserve the existing project structure and unrelated functionality.

Do not modify Product Dashboard files.

### Users verification

After implementation:

1. Run the relevant available build, lint, type-check, and test commands.
2. Inspect their actual outputs.
3. Fix issues introduced by the Users implementation.
4. Verify the Users data flow from API service through Redux to the UI.
5. Verify the relevant routes, imports, and component integration.
6. Confirm that both Cart and Product still work as expected.

---

## 9. Step 5 — Final Verification

After both dashboards are implemented, perform a final verification.

### Functional checks

Verify, where applicable and supported:

- Cart data loads from DummyJSON.
- Users data loads from DummyJSON.
- Loading, error, and empty states behave correctly.
- Pagination, sorting, searching, and filtering behave correctly when implemented.
- Forms and dialogs use the correct API fields.
- Supported write operations are handled honestly.
- Redux state updates correctly from API responses.
- Routes and imports are correctly connected.
- No mock data or fabricated records were introduced.
- Existing shared components still work as before.

### Project safety checks

Verify that:

- Product Dashboard files have no changes introduced by this task.
- No existing files were deleted, renamed, or moved.
- No unrelated pages, features, or configuration were changed.
- Pre-existing user changes remain untouched.
- All modifications are limited to the requested dashboards and strictly necessary supporting code.

### Quality checks

Run the available project commands for:

- Build.
- Lint.
- Type-checking.
- Tests.

Use the scripts that actually exist in the project. Do not invent commands or claim that unavailable checks passed.

If a command fails, investigate whether the failure was introduced by this task. Fix task-related problems where possible. Clearly distinguish pre-existing failures from newly introduced failures.

If a check cannot be run, explain why.

---

## 10. Final Response

When the work is complete, provide a concise but clear summary containing:

1. What was implemented in Cart.
2. What was implemented in Users.
3. Which files were created or modified.
4. Which existing Product Dashboard patterns and shared components were reused.
5. Which DummyJSON endpoints and operations were verified.
6. Any API limitations or fields unavailable from DummyJSON.
7. The verification commands actually run and their real results.
8. Any remaining issues or checks that could not be performed.
9. Confirmation of the Product Dashboard and project-preservation checks, supported by the actual Git diff.

Do not create `PLAN.md`, `FINAL-REPORT.md`, or any additional documentation files unless explicitly required by the user.

Do not perform any cleanup or deletion.

## Final Non-Negotiable Principle

**Implement Cart and Users by following Product. Preserve the rest of the project. Make only the minimum necessary changes, use real DummyJSON data, verify the results, and never risk existing functionality for the sake of refactoring or cleanup.**
## Strict Execution Scope — No Unnecessary Actions

Follow `PROMPT.md` strictly. Execute only the actions explicitly required by the task instructions.

- Do not perform unrelated searches across application settings, backup folders, user directories, or other projects.
- Do not investigate or modify anything outside the project unless explicitly required by the task.
- Do not create backups, extra documentation, reports, helper scripts, or additional files unless explicitly required by `PROMPT.md`.
- Do not run unrelated commands, install tools, change settings, or perform optional improvements.
- Do not ask for permission to perform optional or unrelated actions. Simply skip them.
- Use the existing project structure, dependencies, scripts, and shared components.
- Run only the inspections, API checks, and verification commands necessary to complete the Cart and Users dashboards safely.
- If an action is not required by the task and is not necessary for safety or verification, do not perform it.
- If an explicitly required action cannot be completed safely, stop that part and explain the blocker.
- Do not skip required safety checks or verification just to save time.

**The only objective is to implement and verify the Cart and Users dashboards according to this file while preserving the rest of the project. Do not expand the scope.**