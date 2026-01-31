"""Unit tests for validation utilities."""
import pytest
from support.validation import validate_todo_id, validate_menu_choice


class TestValidation:
    """Test cases for validation functions."""

    def test_validate_todo_id_valid(self):
        """Test validating a valid todo ID."""
        is_valid, result = validate_todo_id("123")
        assert is_valid is True
        assert result == 123

    def test_validate_todo_id_zero(self):
        """Test validating zero ID."""
        is_valid, result = validate_todo_id("0")
        assert is_valid is False
        assert result == "Todo ID must be a positive integer."

    def test_validate_todo_id_negative(self):
        """Test validating negative ID."""
        is_valid, result = validate_todo_id("-5")
        assert is_valid is False
        assert result == "Todo ID must be a positive integer."

    def test_validate_todo_id_invalid_string(self):
        """Test validating invalid string."""
        is_valid, result = validate_todo_id("abc")
        assert is_valid is False
        assert result == "Todo ID 'abc' is not a valid integer."

    def test_validate_todo_id_with_spaces(self):
        """Test validating ID with spaces."""
        is_valid, result = validate_todo_id("  42  ")
        assert is_valid is True
        assert result == 42

    def test_validate_menu_choice_valid(self):
        """Test validating valid menu choices."""
        for choice in ["1", "2", "3", "4", "5", "6"]:
            is_valid, result = validate_menu_choice(choice)
            assert is_valid is True
            assert result == int(choice)

    def test_validate_menu_choice_invalid_range(self):
        """Test validating menu choice outside valid range."""
        for choice in ["0", "7", "10"]:
            is_valid, result = validate_menu_choice(choice)
            assert is_valid is False
            assert result == "Invalid option. Please choose 1-6."

    def test_validate_menu_choice_invalid_string(self):
        """Test validating invalid menu choice string."""
        is_valid, result = validate_menu_choice("abc")
        assert is_valid is False
        assert result == "Invalid option. Please choose 1-6."

    def test_validate_menu_choice_with_spaces(self):
        """Test validating menu choice with spaces."""
        is_valid, result = validate_menu_choice("  3  ")
        assert is_valid is True
        assert result == 3
