"""Service layer for managing todos in memory."""
import sys
import os
# Add the src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

from datetime import datetime
from typing import Dict, List, Optional
from domain.models import Todo


class TodoManager:
    """Manages in-memory todo operations with ID assignment and validation."""

    def __init__(self):
        self._todos: Dict[int, Todo] = {}
        self._next_id = 1

    @property
    def next_id(self) -> int:
        """Get the next available ID for assignment."""
        return self._next_id

    def add_todo(self, title: str, description: Optional[str] = None) -> Todo:
        """
        Add a new todo with the next available ID.

        Args:
            title: The title of the todo
            description: Optional description

        Returns:
            The created Todo object
        """
        # Create the new todo with the current next_id
        todo = Todo(
            id=self._next_id,
            title=title,
            description=description
        )
        
        # Store the todo and increment next_id
        self._todos[self._next_id] = todo
        self._next_id += 1
        
        return todo

    def get_todo(self, todo_id: int) -> Optional[Todo]:
        """
        Retrieve a todo by ID.

        Args:
            todo_id: The ID of the todo to retrieve

        Returns:
            The Todo object if found, None otherwise
        """
        return self._todos.get(todo_id)

    def get_all_todos(self) -> List[Todo]:
        """
        Get all todos ordered by ID.

        Returns:
            List of all todos sorted by ID
        """
        return sorted(self._todos.values(), key=lambda x: x.id)

    def update_todo(self, todo_id: int, title: str) -> Optional[Todo]:
        """
        Update a todo's title.

        Args:
            todo_id: The ID of the todo to update
            title: The new title

        Returns:
            The updated Todo object if successful, None if not found
        """
        if todo_id not in self._todos:
            return None
            
        todo = self._todos[todo_id]
        todo.set_title(title)
        return todo

    def delete_todo(self, todo_id: int) -> bool:
        """
        Delete a todo by ID.

        Args:
            todo_id: The ID of the todo to delete

        Returns:
            True if deletion was successful, False if todo not found
        """
        if todo_id not in self._todos:
            return False
            
        del self._todos[todo_id]
        return True

    def toggle_completion(self, todo_id: int) -> Optional[Todo]:
        """
        Toggle the completion status of a todo.

        Args:
            todo_id: The ID of the todo to toggle

        Returns:
            The updated Todo object if successful, None if not found
        """
        if todo_id not in self._todos:
            return None
            
        todo = self._todos[todo_id]
        if todo.completed:
            todo.mark_pending()
        else:
            todo.mark_complete()
            
        return todo
