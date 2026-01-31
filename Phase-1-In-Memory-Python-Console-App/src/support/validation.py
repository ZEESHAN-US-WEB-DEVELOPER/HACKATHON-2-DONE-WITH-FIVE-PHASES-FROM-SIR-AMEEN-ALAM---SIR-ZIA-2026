"""Validation utilities for the todo application."""
import re
from typing import Union


def validate_todo_id(value: str) -> tuple[bool, Union[int, str]]:
    """
    Validates a todo ID input.

    Args:
        value: The ID string to validate

    Returns:
        Tuple of (is_valid, id_or_error_message)
    """
    try:
        id_val = int(value.strip())
        if id_val <= 0:
            return False, "Todo ID must be a positive integer."
        return True, id_val
    except ValueError:
        return False, f"Todo ID '{value}' is not a valid integer."


def validate_menu_choice(choice: str) -> tuple[bool, Union[int, str]]:
    """
    Validates a menu choice input.

    Args:
        choice: The menu choice string to validate

    Returns:
        Tuple of (is_valid, choice_or_error_message)
    """
    try:
        choice_val = int(choice.strip())
        if choice_val < 1 or choice_val > 6:
            return False, "Invalid option. Please choose 1-6."
        return True, choice_val
    except ValueError:
        return False, "Invalid option. Please choose 1-6."
