"""Main entry point for the todo application."""
import argparse
import sys
import os

# Add the src directory to Python path to resolve imports
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(__file__))))

from services.todo_manager import TodoManager
from app.cli import TodoCLI


def main():
    """Main entry point function."""
    parser = argparse.ArgumentParser(description='In-Memory Todo Manager')
    parser.add_argument('--debug', action='store_true', help='Enable debug logging to stderr')
    
    args = parser.parse_args()
    
    # Initialize the todo manager and CLI
    manager = TodoManager()
    cli = TodoCLI(manager, debug_enabled=args.debug)
    
    try:
        cli.run()
    except KeyboardInterrupt:
        print("\nGoodbye!")
        sys.exit(0)


if __name__ == "__main__":
    main()
