# Quickstart — Phase I Console Todo Application

This guide explains how to run and validate the in-memory console todo app for Phase I.

## Prerequisites

- Python 3.13 installed
- [UV](https://github.com/astral-sh/uv) available on PATH
- Project cloned locally with the `001-console-todo` branch checked out

## Install & Setup

```bash
uv venv --seed                     # Create virtual environment (if not already)
uv pip install -r requirements-dev.txt  # Install pytest and any tooling (standard library-only runtime)
```

> Note: Runtime code must remain standard-library-only; dev dependencies (pytest, ruff) are acceptable.

## Running the Application

Use UV to execute the CLI entrypoint:

```bash
uv run python -m app.main
```

- The menu displays immediately.
- Use options 1–6 to add, view, update, delete, toggle, and exit.
- To enable debug logs: `uv run python -m app.main --debug`

## Manual Smoke Test

1. Launch the app.
2. Choose `1` and add "Write plan".
3. Choose `2` to confirm the todo appears.
4. Choose `5`, enter ID `1`, ensure status flips to complete.
5. Choose `4`, delete ID `1`, confirm deletion message.
6. Choose `6` to exit; verify process returns code 0.

## Running Tests

```bash
uv run pytest
```

- `tests/unit/test_todo_manager.py`: CRUD logic
- `tests/unit/test_validation.py`: Input sanitizers
- `tests/behavior/test_cli_flow.py`: Deterministic stdout via scripted input

All tests must pass before merging.

## Debugging Tips

- Use `--debug` to log internal state (next_id, counts) without affecting stdout.
- If command outputs diverge, compare against `contracts/cli-commands.md` for expected text.
- Ensure `next_id` only increases; reset by restarting the program.

## Next Steps

Once this plan is approved and merged, run `/sp.tasks` to break work into executable tasks, then proceed with implementation via Claude Code.
