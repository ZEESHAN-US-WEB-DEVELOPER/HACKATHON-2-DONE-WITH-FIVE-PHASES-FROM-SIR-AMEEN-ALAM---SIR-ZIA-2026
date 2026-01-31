# CLI Command Contracts — Phase I Console Todo Application

This document defines the deterministic input/output contracts for each CLI command. All stdout content must follow these templates exactly (apart from dynamic data such as IDs and timestamps). Stderr remains empty unless `--debug` is enabled.

## 0. Menu Loop

```
============================
In-Memory Todo Manager
============================
1) Add Todo
2) View Todos
3) Update Todo Title
4) Delete Todo
5) Toggle Completion
6) Exit
Select an option:
```

- After each action, the menu reprints verbatim.
- Invalid selections print `Invalid option. Please choose 1-6.` followed by the menu.

## 1. Add Todo

### Input Flow
1. Prompt: `Enter todo title (required, max 120 chars): `
2. Optional prompt: `Add a description? (y/n): `
   - If `y`: `Enter description (optional, max 120 chars): `
   - If `n`: skip description input

### Validation Errors
- Empty title → `Title cannot be empty. Todo not created.`
- Title >120 chars → `Title must be 120 characters or fewer. Todo not created.`
- Description >120 chars → `Description must be 120 characters or fewer. Todo not created.`

### Success Output
`Todo #<id> "<title>" created (Pending).`

## 2. View Todos

### Empty State
`No todos yet. Choose '1' to add your first task.`

### Non-Empty State
```
ID  Title                     Status        Updated
--  ------------------------  ------------  -------------------
1   Pay rent                  Pending       2026-01-04 10:15:22Z
2   Submit report             Complete      2026-01-04 10:20:11Z
```

- Rows sorted by ID ascending.
- `Status` displays `Pending` or `Complete`.
- `Updated` shows `updated_at` ISO-8601 without microseconds; omit if timestamps disabled via debug hooks.

## 3. Update Todo Title

### Input Flow
1. Prompt: `Enter the ID to update: `
2. Prompt: `Enter new title (max 120 chars): `

### Validation Errors
- Non-numeric or missing ID → `Todo ID <value> not found.`
- ID not present → same message as above.
- Empty/overlong title → use Add Todo error text and keep original title.

### Success Output
`Todo #<id> title updated.`

## 4. Delete Todo

### Input Flow
1. Prompt: `Enter the ID to delete: `
2. Prompt: `Are you sure you want to delete Todo #<id>? (y/n): `

### Validation / Branching
- Invalid ID → `Todo ID <value> not found.`
- Confirmation `n` → `Deletion cancelled.`

### Success Output
`Todo #<id> deleted.`

## 5. Toggle Completion

### Input Flow
1. Prompt: `Enter the ID to toggle: `

### Validation Errors
- Same ID errors as Update/Delete.

### Success Output
- If newly completed: `Todo #<id> marked complete.`
- If reopened: `Todo #<id> marked pending.`

## 6. Exit

`Goodbye!`

Application exits with code 0. In-memory state is discarded upon termination.

## Debug Mode (`--debug`)

- When enabled, the CLI emits structured logs to stderr:
  - `DEBUG next_id=<n> total_todos=<count>` on each loop iteration.
  - Command-specific traces, e.g., `DEBUG action=add id=3 title="Read spec"`
- Stdout output remains unchanged to preserve deterministic user experience.
