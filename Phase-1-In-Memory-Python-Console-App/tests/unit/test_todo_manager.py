"""Unit tests for TodoManager."""
import pytest
from datetime import datetime
from domain.models import Todo
from services.todo_manager import TodoManager


class TestTodoManager:
    """Test cases for TodoManager functionality."""

    def test_initial_state(self):
        """Test that TodoManager starts with ID 1."""
        manager = TodoManager()
        assert manager.next_id == 1
        assert len(manager.get_all_todos()) == 0

    def test_add_todo_basic(self):
        """Test adding a basic todo."""
        manager = TodoManager()
        todo = manager.add_todo("Test title")
        
        assert todo.id == 1
        assert todo.title == "Test title"
        assert not todo.completed
        assert todo.description is None

    def test_add_todo_with_description(self):
        """Test adding a todo with description."""
        manager = TodoManager()
        todo = manager.add_todo("Test title", "Test description")
        
        assert todo.id == 1
        assert todo.title == "Test title"
        assert todo.description == "Test description"

    def test_add_multiple_todos_ids(self):
        """Test that IDs increment properly."""
        manager = TodoManager()
        todo1 = manager.add_todo("First")
        todo2 = manager.add_todo("Second")
        todo3 = manager.add_todo("Third")
        
        assert todo1.id == 1
        assert todo2.id == 2
        assert todo3.id == 3
        assert manager.next_id == 4

    def test_get_todo_by_id(self):
        """Test retrieving a todo by ID."""
        manager = TodoManager()
        added_todo = manager.add_todo("Test")
        
        retrieved_todo = manager.get_todo(1)
        assert retrieved_todo is not None
        assert retrieved_todo.id == 1
        assert retrieved_todo.title == "Test"

    def test_get_todo_not_found(self):
        """Test retrieving a non-existent todo."""
        manager = TodoManager()
        result = manager.get_todo(999)
        assert result is None

    def test_get_all_todos(self):
        """Test retrieving all todos."""
        manager = TodoManager()
        todo1 = manager.add_todo("First")
        todo2 = manager.add_todo("Second")
        todo3 = manager.add_todo("Third")
        
        todos = manager.get_all_todos()
        assert len(todos) == 3
        assert todos[0].id == 1
        assert todos[1].id == 2
        assert todos[2].id == 3

    def test_update_todo(self):
        """Test updating a todo's title."""
        manager = TodoManager()
        original_todo = manager.add_todo("Original title")
        
        updated_todo = manager.update_todo(1, "Updated title")
        
        assert updated_todo is not None
        assert updated_todo.title == "Updated title"
        
        # Verify the update in storage
        retrieved = manager.get_todo(1)
        assert retrieved.title == "Updated title"

    def test_update_todo_not_found(self):
        """Test updating a non-existent todo."""
        manager = TodoManager()
        result = manager.update_todo(999, "New title")
        assert result is None

    def test_delete_todo(self):
        """Test deleting a todo."""
        manager = TodoManager()
        manager.add_todo("Test todo")
        
        # Verify it exists
        assert manager.get_todo(1) is not None
        
        # Delete it
        success = manager.delete_todo(1)
        assert success is True
        
        # Verify it's gone
        assert manager.get_todo(1) is None

    def test_delete_todo_not_found(self):
        """Test deleting a non-existent todo."""
        manager = TodoManager()
        success = manager.delete_todo(999)
        assert success is False

    def test_toggle_completion(self):
        """Test toggling completion status."""
        manager = TodoManager()
        todo = manager.add_todo("Test todo")
        
        # Initially should be pending
        assert not todo.completed
        
        # Toggle to complete
        toggled = manager.toggle_completion(1)
        assert toggled is not None
        assert toggled.completed
        
        # Toggle back to pending
        toggled = manager.toggle_completion(1)
        assert toggled is not None
        assert not toggled.completed

    def test_toggle_completion_not_found(self):
        """Test toggling completion for non-existent todo."""
        manager = TodoManager()
        result = manager.toggle_completion(999)
        assert result is None
