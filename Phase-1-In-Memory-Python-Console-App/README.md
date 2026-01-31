# Phase I Console Todo Application

An in-memory console-based todo application implemented in Python 3.13+ using only standard library modules.

## Features

- Add, view, update, delete, and toggle completion of todos
- In-memory storage (no persistence between runs)
- Sequential ID assignment starting at 1
- Title and optional description for each todo
- Validation for titles (max 120 characters)
- Debug logging support via `--debug` flag

## Usage

Run the application using:

```bash
python -m src.app.main
```

Or with debug logging:

```bash
python -m src.app.main --debug
```

## Project Structure

```
src/
├── app/
│   ├── __init__.py
│   ├── main.py          # Entry point
│   └── cli.py           # CLI interface
├── domain/
│   ├── __init__.py
│   └── models.py        # Todo data model
├── services/
│   ├── __init__.py
│   └── todo_manager.py  # Business logic
└── support/
    ├── __init__.py
    └── validation.py    # Validation utilities
tests/
├── unit/
│   ├── test_todo_manager.py
│   └── test_validation.py
└── behavior/
    └── test_cli_flow.py
```

## Running Tests

```bash
PYTHONPATH=src python -m pytest tests/ -v
```