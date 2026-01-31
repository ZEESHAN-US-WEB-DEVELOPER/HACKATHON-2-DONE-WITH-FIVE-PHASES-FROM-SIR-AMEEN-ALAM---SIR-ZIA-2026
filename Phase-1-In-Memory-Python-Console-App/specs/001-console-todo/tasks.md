# Tasks: Phase I Console Todo Application

**Input**: Design documents from `/specs/001-console-todo/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: User scenarios call for deterministic verification across CLI flows; each story includes explicit tests.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish repository structure, runtime entrypoint, and logging baseline.

- [ ] T001 Create `src/` and `tests/` directories with `app`, `services`, `domain`, `support`, and layered test folders.
- [ ] T002 Scaffold `src/app/main.py` runnable via `uv run python -m app.main` with argument parsing stub.
- [ ] T003 Configure deterministic logging in `src/app/main.py` to route `--debug` output to stderr using `logging`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core domain, validation, and manager logic required before CLI stories.

- [ ] T004 Implement `Todo` dataclass with invariants in `src/domain/models.py`.
- [ ] T005 Implement validation helpers for titles/descriptions/menu IDs in `src/support/validation.py`.
- [ ] T006 Build `TodoManager` in `src/services/todo_manager.py` with ordered list/dict state and ID generator.
- [ ] T007 Create unit tests for validation + manager bookkeeping in `tests/unit/test_validation.py` and `tests/unit/test_todo_manager.py`.

**Checkpoint**: Domain + validation + manager ready; CLI work can begin.

---

## Phase 3: User Story 1 - Capture Todos Quickly (Priority: P1) 🎯 MVP

**Goal**: Users can add todos with validated titles/descriptions and immediately view them in deterministic tables.

**Independent Test**: Add a todo via option `1`, then view via option `2`; confirm ID 1 shows Pending with correct columns.

### Tests for User Story 1

- [ ] T008 [P] [US1] Add failing unit tests for add/list flows in `tests/unit/test_todo_manager.py`.
- [ ] T009 [P] [US1] Extend behavior script in `tests/behavior/test_cli_flow.py` for Add → View scenario.

### Implementation for User Story 1

- [ ] T010 [US1] Implement Add Todo prompts, validation wiring, and success/error messages in `src/app/cli.py`.
- [ ] T011 [US1] Implement deterministic table renderer for View Todos in `src/app/cli.py` per contracts/cli-commands.md.
- [ ] T012 [US1] Wire menu loop in `src/app/main.py` to invoke manager add/list operations and reprint menu deterministically.

**Checkpoint**: Adding and viewing todos works end-to-end.

---

## Phase 4: User Story 2 - Update and Complete Todos (Priority: P2)

**Goal**: Users can update titles and toggle completion with timestamp hygiene.

**Independent Test**: Add two todos, update ID 1, toggle completion, then view to confirm status and timestamps.

### Tests for User Story 2

- [ ] T013 [P] [US2] Write unit tests for update validation and toggle timestamp rules in `tests/unit/test_todo_manager.py`.
- [ ] T014 [P] [US2] Extend behavior coverage for update + toggle flows in `tests/behavior/test_cli_flow.py`.

### Implementation for User Story 2

- [ ] T015 [US2] Implement `TodoManager` update/toggle methods with timestamp logic in `src/services/todo_manager.py`.
- [ ] T016 [US2] Implement Update Todo prompts and success/error responses in `src/app/cli.py`.
- [ ] T017 [US2] Implement Toggle Completion prompts/output in `src/app/cli.py` and ensure menu consistency.

**Checkpoint**: Updates and toggles behave deterministically.

---

## Phase 5: User Story 3 - Remove Unneeded Todos Safely (Priority: P3)

**Goal**: Users can delete todos with confirmation and graceful handling of missing IDs.

**Independent Test**: Delete an existing todo and confirm count decreases; attempt to delete missing ID and see "not found" response.

### Tests for User Story 3

- [ ] T018 [P] [US3] Add unit tests for manager delete operations and ordered ID removal in `tests/unit/test_todo_manager.py`.
- [ ] T019 [P] [US3] Extend behavior test for delete success + missing ID in `tests/behavior/test_cli_flow.py`.

### Implementation for User Story 3

- [ ] T020 [US3] Implement `TodoManager` delete logic updating dict/list atomically in `src/services/todo_manager.py`.
- [ ] T021 [US3] Implement Delete Todo prompts, confirmations, and cancellation branch in `src/app/cli.py`.
- [ ] T022 [US3] Ensure menu loop handles "not found" consistently after deletes in `src/app/main.py`.

**Checkpoint**: Deleting todos is safe and error-tolerant.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalize debug tooling, contracts, and manual validation.

- [ ] T023 [P] Validate `--debug` logging traces in `src/app/main.py` and `src/app/cli.py` per research decisions.
- [ ] T024 [P] Audit all prompts/messages against `specs/001-console-todo/contracts/cli-commands.md` (spot-check via behavior test).
- [ ] T025 Run quickstart smoke test (`specs/001-console-todo/quickstart.md`) and document any deviations.

---

## Dependencies & Execution Order

1. **Phase 1 → Phase 2**: Setup must finish before foundational work.
2. **Phase 2 → User Stories**: Todo model, validation, and manager are prerequisites for all stories.
3. **User Stories**: Execute in priority order (US1 → US2 → US3). Stories can run in parallel only after Phase 2 if file conflicts are avoided.
4. **Polish**: Post-story verification and documentation.

## Parallel Execution Examples

- T008 and T009 can run concurrently (unit vs behavior tests).
- Within US2, T015 (services) and T016 (CLI) can proceed in parallel after agreeing on method signatures.
- T018 and T019 target different test suites and can run simultaneously.

## Implementation Strategy

1. Complete Phases 1–2 to lock down scaffolding.
2. Deliver MVP by finishing all US1 tasks and running its independent test criteria.
3. Add US2 capabilities, then US3, verifying independence at each checkpoint.
4. Finish with Polish tasks to confirm logging, contracts, and quickstart coverage.
