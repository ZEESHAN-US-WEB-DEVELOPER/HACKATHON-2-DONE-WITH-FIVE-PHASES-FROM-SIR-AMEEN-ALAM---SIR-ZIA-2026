# Phase 0 Research — Phase I Console Todo Application

All open questions from the specification and constitution were resolved through lightweight research focused on Python standard-library capabilities and deterministic CLI techniques.

## Decision Log

### Deterministic Menu Rendering
- **Decision**: Use a single `MENU_TEMPLATE` string rendered by the CLI layer each loop iteration.
- **Rationale**: Guarantees identical ordering/wording of options and simplifies behavior tests that diff stdout.
- **Alternatives Considered**:
  - *Dynamic menu builders*: unnecessary for six fixed commands and would risk non-deterministic ordering.
  - *External templating engines*: violate standard-library-only constraint.

### Todo Storage Structure
- **Decision**: Maintain todos inside `TodoManager` as an ordered `list[Todo]` plus a `dict[int, Todo]` index for O(1) lookup.
- **Rationale**: Lists preserve insertion order for display, dictionaries accelerate update/delete without scanning.
- **Alternatives Considered**:
  - *Only list*: would require linear scans for every update/delete and complicate graceful error handling.
  - *Only dict*: would lose deterministic ordering without extra sorting.

### ID Generation
- **Decision**: Track `next_id` counter that always increments, even when intervening IDs are deleted.
- **Rationale**: Prevents reuse that could confuse users reviewing historical output and matches spec guarantee that IDs remain authoritative.
- **Alternatives Considered**:
  - *Reclaim deleted IDs*: introduces non-determinism and makes manual transcripts hard to follow.

### Timestamp Handling
- **Decision**: Use `datetime.datetime.now(datetime.timezone.utc)` for `created_at`, `updated_at`, `completed_at` with ISO formatting only when displaying.
- **Rationale**: UTC avoids locale discrepancies and simplifies formatting for tests.
- **Alternatives Considered**:
  - *Naive datetimes*: risk timezone drift when running on different machines.

### CLI Argument & Debug Toggle
- **Decision**: Parse `--debug` via `argparse` in `app.main` and pipe logs through `logging` configured to emit to stderr only when flag set.
- **Rationale**: Standard-library solution satisfying constitution’s observability guidance without polluting stdout.
- **Alternatives Considered**:
  - *Environment variables only*: less transparent for end users running via UV.

### Testing Strategy
- **Decision**: Combine pytest unit tests (TodoManager + validation) with a behavior test using `subprocess.run(["uv", "run", ...])` stub to replay scripted input and assert stdout.
- **Rationale**: Provides fast feedback on logic plus end-to-end assurance that menu ordering and error messages stay deterministic.
- **Alternatives Considered**:
  - *Doctest or manual testing only*: fails constitution’s quality guardrails.
  - *Full integration harness*: unnecessary overhead for Phase I scope.

### Input Validation Rules
- **Decision**: Centralize validation in `support.validation` (trim whitespace, enforce max lengths, canonicalize menu choices) returning typed results or `ValidationError` dataclasses for CLI formatting.
- **Rationale**: Keeps CLI thin and ensures identical error text regardless of entry point.
- **Alternatives Considered**:
  - *Sprinkled inline validation*: increases duplication and risk of inconsistent messages.

## Research Outcomes

- No external libraries are needed; Python standard library covers CLI parsing, logging, dataclasses, and testing (pytest dependency already accepted for testing infrastructure).
- Determinism is maintained by isolating randomness/time (timestamps) behind formatting helpers so tests can freeze or stub them.
- Future persistence layers can swap the `TodoRepository` interface (defined implicitly by `TodoManager`) without altering CLI contracts.

_All NEEDS CLARIFICATION markers resolved; planning can progress to design outputs._
