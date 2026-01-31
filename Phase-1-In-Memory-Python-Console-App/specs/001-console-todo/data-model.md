# Data Model — Phase I Console Todo Application

## Entities

### Todo
- **id**: `int` — Sequential identifier assigned once when creating a todo. Must be positive and strictly increasing; IDs are never reused even if a todo is deleted.
- **title**: `str` — Required, trimmed, maximum 120 Unicode characters. Empty or whitespace-only strings are rejected.
- **description**: `Optional[str]` — Optional free-form text captured during creation when the user chooses to enter more detail. Trimmed; may be empty string if user cancels.
- **completed**: `bool` — Defaults to `False`. Toggled through the completion command only.
- **created_at**: `datetime` — UTC timestamp recorded at creation for display purposes.
- **updated_at**: `datetime` — UTC timestamp refreshed whenever the title (or description, if present) changes.
- **completed_at**: `Optional[datetime]` — UTC timestamp recorded when `completed` transitions to `True`; cleared when toggled back to `False`.

### CLI Session (aggregate)
- **todos_by_id**: `dict[int, Todo]` — Primary lookup for CRUD commands.
- **ordered_ids**: `list[int]` — Maintains deterministic presentation order (ascending IDs).
- **next_id**: `int` — Next assignable ID, starts at 1, increments monotonically.
- **debug_enabled**: `bool` — Derived from CLI arguments/environment; controls stderr logging.

## Relationships & Invariants

1. Every ID present in `ordered_ids` MUST exist in `todos_by_id` (`todos_by_id[id]` returns a `Todo`).
2. `ordered_ids` MUST remain sorted ascending at all times; new IDs append to the end.
3. `next_id` MUST always equal `max(ordered_ids) + 1` (or `1` when empty).
4. A `Todo` marked `completed = True` MUST have `completed_at` set; when `completed = False`, `completed_at` MUST be `None`.
5. `updated_at` MUST be ≥ `created_at` for every todo (monotonic timestamps).
6. Delete operations remove the ID from both `todos_by_id` and `ordered_ids` atomically to avoid dangling references.

## Validation Rules

- **Title/Description Input**: Trim whitespace, reject titles of length 0 or >120 chars. Descriptions share the same max length but may be omitted entirely.
- **ID Parameters**: Parse numeric input; reject non-numeric or ≤0 values with the standard "Todo ID <n> not found" message. Lookups occur via `todos_by_id` to ensure O(1) validation.
- **Menu Selections**: Accept only integers 1–6; any other entry triggers the deterministic "Invalid option" response.

## State Transitions

```
[New Todo]
  created_at = now()
  updated_at = created_at
  completed = False
  completed_at = None

[Update Title]
  title' = validate(title_input)
  updated_at = now()

[Toggle Completion]
  IF completed == False:
      completed = True
      completed_at = now()
  ELSE:
      completed = False
      completed_at = None

[Delete Todo]
  Remove ID from todos_by_id and ordered_ids
```

## Derived Views

- **List Todos**: Iterate `ordered_ids`, format each `Todo` into table rows showing `id`, `title`, `status` (Pending/Complete), optional `[Completed @ ISO8601]`, and `updated_at` when relevant.
- **Debug Snapshot**: When `--debug` is enabled, serialize internal state (counts, next_id) to stderr to aid troubleshooting without altering stdout ordering.

This model satisfies the specification’s deterministic, in-memory requirements and keeps future persistence upgrades isolated inside `TodoManager` (swap backing store while preserving interface).
