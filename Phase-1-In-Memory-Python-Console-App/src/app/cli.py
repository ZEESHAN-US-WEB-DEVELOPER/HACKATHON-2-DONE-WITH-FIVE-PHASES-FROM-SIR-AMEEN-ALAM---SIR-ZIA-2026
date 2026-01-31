"""CLI interface for the todo application."""
import sys
import os
# Add the src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

from datetime import datetime
from typing import Optional
from domain.models import Todo
from services.todo_manager import TodoManager
from support.validation import validate_todo_id


class TodoCLI:
    """Handles CLI interactions and user prompts."""

    def __init__(self, manager: TodoManager, debug_enabled: bool = False):
        self.manager = manager
        self.debug_enabled = debug_enabled

    def _log_debug(self, message: str):
        """Log debug message to stderr if debug is enabled."""
        if self.debug_enabled:
            print(f"DEBUG {message}", file=sys.stderr)

    def display_menu(self):
        """Display the main menu."""
        print("=" * 28)
        print("In-Memory Todo Manager")
        print("=" * 28)
        print("1) Add Todo")
        print("2) View Todos")
        print("3) Update Todo Title")
        print("4) Delete Todo")
        print("5) Toggle Completion")
        print("6) Exit")
        print("Select an option: ", end="", flush=True)

    def add_todo(self):
        """Handle adding a new todo."""
        self._log_debug(f"action=add prompt=title")
        title = input("Enter todo title (required, max 120 chars): ").strip()
        
        # Validate title
        try:
            if not title:
                print("Title cannot be empty. Todo not created.")
                return
            if len(title.encode('utf-8')) > 120:
                print("Title must be 120 characters or fewer. Todo not created.")
                return
        except Exception:
            print("Title must be 120 characters or fewer. Todo not created.")
            return

        # Ask for description
        add_desc = input("Add a description? (y/n): ").strip().lower()
        description = None
        if add_desc == 'y':
            description = input("Enter description (optional, max 120 chars): ").strip()
            try:
                if len(description.encode('utf-8')) > 120:
                    print("Description must be 120 characters or fewer. Todo not created.")
                    return
            except Exception:
                print("Description must be 120 characters or fewer. Todo not created.")
                return

        # Create the todo
        todo = self.manager.add_todo(title, description)
        print(f'Todo #{todo.id} "{todo.title}" created (Pending).')
        self._log_debug(f"action=add id={todo.id} title=\"{todo.title}\"")

    def view_todos(self):
        """Display all todos."""
        todos = self.manager.get_all_todos()
        
        if not todos:
            print("No todos yet. Choose '1' to add your first task.")
        else:
            # Print header
            print(f"{'ID':<3} {'Title':<25} {'Status':<12} {'Updated':<20}")
            print(f"{'--':<3} {'-'*24:<25} {'-'*11:<12} {'-'*19:<20}")
            
            for todo in todos:
                status = "Complete" if todo.completed else "Pending"
                updated_str = todo.updated_at.strftime("%Y-%m-%d %H:%M:%SZ")
                title = todo.title[:24] if len(todo.title) > 24 else todo.title
                print(f"{todo.id:<3} {title:<25} {status:<12} {updated_str:<20}")
        
        self._log_debug(f"action=view count={len(todos)}")

    def update_todo(self):
        """Handle updating a todo's title."""
        self._log_debug(f"action=update prompt=id")
        id_input = input("Enter the ID to update: ").strip()
        
        is_valid, result = validate_todo_id(id_input)
        if not is_valid:
            print(result)
            return
            
        todo_id = result
        todo = self.manager.get_todo(todo_id)
        if not todo:
            print(f"Todo ID {todo_id} not found.")
            return

        self._log_debug(f"action=update prompt=title id={todo_id}")
        new_title = input("Enter new title (max 120 chars): ").strip()
        
        # Validate new title
        try:
            if not new_title:
                print("Title cannot be empty. Todo not created.")
                return
            if len(new_title.encode('utf-8')) > 120:
                print("Title must be 120 characters or fewer. Todo not created.")
                return
        except Exception:
            print("Title must be 120 characters or fewer. Todo not created.")
            return

        # Update the todo
        updated_todo = self.manager.update_todo(todo_id, new_title)
        if updated_todo:
            print(f"Todo #{todo_id} title updated.")
            self._log_debug(f"action=update id={todo_id} title=\"{new_title}\"")
        else:
            print(f"Todo ID {todo_id} not found.")

    def delete_todo(self):
        """Handle deleting a todo."""
        self._log_debug(f"action=delete prompt=id")
        id_input = input("Enter the ID to delete: ").strip()
        
        is_valid, result = validate_todo_id(id_input)
        if not is_valid:
            print(result)
            return
            
        todo_id = result
        todo = self.manager.get_todo(todo_id)
        if not todo:
            print(f"Todo ID {todo_id} not found.")
            return

        confirm = input(f"Are you sure you want to delete Todo #{todo_id}? (y/n): ").strip().lower()
        if confirm != 'y':
            print("Deletion cancelled.")
            return

        success = self.manager.delete_todo(todo_id)
        if success:
            print(f"Todo #{todo_id} deleted.")
            self._log_debug(f"action=delete id={todo_id}")
        else:
            print(f"Todo ID {todo_id} not found.")

    def toggle_completion(self):
        """Handle toggling a todo's completion status."""
        self._log_debug(f"action=toggle prompt=id")
        id_input = input("Enter the ID to toggle: ").strip()
        
        is_valid, result = validate_todo_id(id_input)
        if not is_valid:
            print(result)
            return
            
        todo_id = result
        todo = self.manager.get_todo(todo_id)
        if not todo:
            print(f"Todo ID {todo_id} not found.")
            return

        toggled_todo = self.manager.toggle_completion(todo_id)
        if toggled_todo:
            if toggled_todo.completed:
                print(f"Todo #{todo_id} marked complete.")
                self._log_debug(f"action=toggle id={todo_id} status=complete")
            else:
                print(f"Todo #{todo_id} marked pending.")
                self._log_debug(f"action=toggle id={todo_id} status=pending")
        else:
            print(f"Todo ID {todo_id} not found.")

    def run(self):
        """Run the main CLI loop."""
        while True:
            # Log debug info if enabled
            self._log_debug(f"next_id={self.manager.next_id} total_todos={len(self.manager.get_all_todos())}")
            
            self.display_menu()
            choice = input().strip()
            
            try:
                choice_num = int(choice)
            except ValueError:
                print("Invalid option. Please choose 1-6.")
                continue

            if choice_num == 1:
                self.add_todo()
            elif choice_num == 2:
                self.view_todos()
            elif choice_num == 3:
                self.update_todo()
            elif choice_num == 4:
                self.delete_todo()
            elif choice_num == 5:
                self.toggle_completion()
            elif choice_num == 6:
                print("Goodbye!")
                break
            else:
                print("Invalid option. Please choose 1-6.")
