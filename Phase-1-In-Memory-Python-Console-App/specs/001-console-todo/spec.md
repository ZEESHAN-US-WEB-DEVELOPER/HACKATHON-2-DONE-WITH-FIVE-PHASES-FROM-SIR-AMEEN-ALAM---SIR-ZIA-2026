# Feature Specification: Phase I Console Todo Application

**Feature Branch**: `001-console-todo`
**Created**: 2026-01-04
**Status**: Draft
**Input**: Phase I — In-Memory Console-Based Todo Application specification request (Python 3.13+, UV, in-memory CRUD, standard library only)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Capture Todos Quickly (Priority: P1)

New CLI users need to capture tasks immediately and confirm they were stored.

**Why this priority**: Capturing and reviewing todos is the core value proposition; without it no other action matters.

**Independent Test**: From a clean run, execute "Add" followed by "View" and verify the new todo appears with ID 1 and status Pending using only deterministic prompts.

**Acceptance Scenarios**:

1. **Given** the todo list is empty, **When** the user selects `1) Add Todo`, enters a non-empty title, and confirms, **Then** the system assigns the next sequential ID starting at 1 and displays a success message repeating the ID and title.
2. **Given** at least one todo exists, **When** the user selects `2) View Todos`, **Then** the system prints all todos ordered by ID with columns for ID, title, and completion status, followed by a prompt to return to the menu.

---

### User Story 2 - Update and Complete Todos (Priority: P2)

Users need to adjust task titles and mark tasks complete without re-entering them.

**Why this priority**: Editing prevents duplicate entries, and completion tracking is essential for progress visibility.

**Independent Test**: Add two todos, run `3) Update Todo` to change the first title, run `5) Toggle Completion` to mark it done, then `2) View Todos` to confirm deterministic updates.

**Acceptance Scenarios**:

1. **Given** a todo with ID 2 exists, **When** the user selects `3) Update Todo`, enters `2`, and supplies a new valid title, **Then** the system overwrites the title, updates the `updated_at` timestamp, and confirms the change without altering the completion state.
2. **Given** a todo is marked Pending, **When** the user selects `5) Toggle Completion` and enters its ID, **Then** the system flips the status to Complete, records the timestamp, and reflects the new status on the next `View` command.

---

### User Story 3 - Remove Unneeded Todos Safely (Priority: P3)

Users want to delete tasks they no longer need while avoiding accidental removals.

**Why this priority**: Removing clutter keeps the list manageable and ensures the deterministic ID loop remains meaningful.

**Independent Test**: Populate three todos, execute `4) Delete Todo` with a valid ID, confirm the todo count decreases, then attempt to delete a non-existent ID and verify the graceful error message.

**Acceptance Scenarios**:

1. **Given** todos with IDs 1-3 exist, **When** the user selects `4) Delete Todo`, enters `2`, and confirms deletion, **Then** todo ID 2 is removed, remaining todos retain their IDs, and the system communicates the deletion outcome.
2. **Given** only todo ID 1 remains, **When** the user attempts to delete ID 9, **Then** the system reports "Todo ID 9 not found" and returns to the main menu without crashing or altering state.

---

### Edge Cases

- Empty state: `View Todos` on an empty list prints "No todos yet" plus instructions to add the first entry.
- Blank or whitespace-only titles must be rejected with a deterministic validation message and no mutation of state.
- Excessively long titles (>120 UTF-8 characters) trigger a concise error instructing the user to shorten the input.
- Duplicate titles are allowed; IDs remain the source of truth for updates/deletes.
- Attempting to update, delete, or toggle a non-existent ID always returns a uniform "not found" response.
- Re-running the program starts with ID 1 and an empty list (no persistence between sessions).
- Menu input that is not 1-6 (or the defined commands) results in "Invalid option" and redisplays the menu.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The CLI MUST present a deterministic menu loop with numbered options: Add, View, Update, Delete, Toggle Completion, and Exit; the menu redisplays after each action until Exit.
- **FR-002**: Add Todo MUST prompt for a title (and optional description), reject empty/overlong input, assign the next sequential integer ID, set status to Pending, and confirm creation.
- **FR-003**: View Todos MUST list todos ordered by ID with aligned columns for ID, title, completion status (Pending/Complete), and timestamps; empty lists print a friendly message instead of a table.
- **FR-004**: Update Todo MUST accept an ID, validate existence, prompt for a replacement title, apply validation rules, update `title` and `updated_at`, and confirm success without duplicating IDs.
- **FR-005**: Delete Todo MUST accept an ID, confirm existence, optionally ask for confirmation (`y/n`), remove the record, and confirm removal; it MUST leave remaining IDs unchanged.
- **FR-006**: Toggle Completion MUST accept an ID, flip `completed` between `False/True`, update `completed_at` when transitioning to complete (or clear it when reopening), and report the new state.
- **FR-007**: All ID-based commands MUST handle invalid IDs gracefully by printing "Todo ID <n> not found" and returning to the menu without raising exceptions.
- **FR-008**: The application MUST run under Python 3.13+ via `uv run python -m app.main` (exact module name defined in plan) using only standard-library modules.
- **FR-009**: The CLI MUST support deterministic debug logging toggled via `--debug` flag or environment variable, writing diagnostics to stderr without altering stdout formatting.
- **FR-010**: Exiting the application MUST clear in-memory state and terminate the loop cleanly with exit code 0.

### Key Entities *(include if feature involves data)*

- **Todo**: Represents a user's task during a single runtime session.
  - `id` (int): Sequential identifier starting at 1 per session.
  - `title` (str): Required, trimmed, ≤120 chars, displayed in listings.
  - `description` (Optional[str]): Optional extra context captured during Add when the user chooses to provide it.
  - `completed` (bool): Defaults to `False`; toggled via completion command.
  - `created_at` (datetime): Timestamp assigned on creation for display only.
  - `updated_at` (datetime): Timestamp refreshed on title edits.
  - `completed_at` (Optional[datetime]): Set when `completed` becomes True, cleared when reopened.

- **CLI Session**: Captures runtime-only metadata.
  - `todos` (List[Todo]): Authoritative in-memory store.
  - `next_id` (int): Tracks the next assignable ID; increments even if earlier IDs are deleted to preserve determinism.
  - `debug_enabled` (bool): Derived from CLI flags/env to control stderr diagnostics.

### Assumptions & Constraints

- UV is the required runtime manager; installation instructions live outside this spec but the CLI must be compatible with `uv run` workflows.
- No persistence is retained between runs; rehydration from files, databases, or APIs is explicitly forbidden in Phase I.
- Only a single interactive user operates the CLI at a time; concurrency or background scheduling is out of scope.
- Titles and descriptions are plain text; markdown or formatting controls are unnecessary in Phase I.
- All prompts, confirmations, and table outputs must remain ASCII-friendly for basic terminals (no color codes or emojis).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time user can add and view a todo within 3 prompts total, with the system responding in <1 second per action on commodity hardware.
- **SC-002**: 100% of invalid menu choices or IDs yield a deterministic guidance message and return to the menu without raising uncaught exceptions.
- **SC-003**: After marking a todo complete, the next `View Todos` call always reflects the updated status and timestamps, verified across 10 consecutive toggles without drift.
- **SC-004**: Running the application via `uv run` exits cleanly with code 0 after choosing Exit, leaving no persisted artifacts on disk and emitting only documented stdout/stderr text.
- **SC-005**: Manual regression of the five core commands covers all happy paths and documented edge cases in a single session without requiring code edits or restarts beyond the exit/reset behavior.
