"""Behavioral tests for CLI flows."""
import sys
import subprocess
import tempfile
import os
from datetime import datetime


def test_add_and_view_todos():
    """Test the basic Add → View flow from User Story 1."""
    # Test the flow: Add a todo via option 1, then view via option 2
    # Confirm ID 1 shows Pending with correct columns
    
    # Create a temporary input file simulating user interaction
    input_data = b"1\nSample todo title\nn\n2\n6\n"
    
    # Run the CLI application with the input
    proc = subprocess.Popen([
        sys.executable, "-m", "src.app.main"
    ], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    cwd=os.getcwd())
    
    stdout, stderr = proc.communicate(input=input_data)
    
    output = stdout.decode('utf-8')
    
    # Check that the todo was added successfully
    assert "Todo #1 \"Sample todo title\" created (Pending)." in output
    
    # Check that the todo was displayed when viewing
    assert "Sample todo title" in output
    assert "Pending" in output
    assert "ID" in output and "Title" in output  # Table headers
    
    print("PASS: Add -> View flow works correctly")


def test_update_and_toggle_flows():
    """Test the Update → Toggle → View flow from User Story 2."""
    # Add two todos, update ID 1, toggle completion, then view
    
    input_data = b"1\nFirst todo\nn\n1\nSecond todo\nn\n3\n1\nUpdated first todo\n2\n5\n1\n2\n6\n"
    
    proc = subprocess.Popen([
        sys.executable, "-m", "src.app.main"
    ], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    cwd=os.getcwd())
    
    stdout, stderr = proc.communicate(input=input_data)
    
    output = stdout.decode('utf-8')
    
    # Check that both todos were added
    assert "Todo #1 \"First todo\" created" in output
    assert "Todo #2 \"Second todo\" created" in output
    
    # Check that the update worked
    assert "Todo #1 title updated." in output
    
    # Check that the toggle worked and status changed
    assert "marked complete" in output or "marked pending" in output
    
    print("PASS: Update -> Toggle -> View flow works correctly")


def test_delete_and_missing_id_flows():
    """Test the Delete flow and handling of missing IDs from User Story 3."""
    # Add three todos, delete one, then try to delete a non-existent ID
    
    input_data = b"1\nFirst todo\nn\n1\nSecond todo\nn\n1\nThird todo\nn\n4\n2\ny\n4\n999\n6\n"
    
    proc = subprocess.Popen([
        sys.executable, "-m", "src.app.main"
    ], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
    cwd=os.getcwd())
    
    stdout, stderr = proc.communicate(input=input_data)
    
    output = stdout.decode('utf-8')
    
    # Check that all three todos were added
    assert "Todo #1" in output
    assert "Todo #2" in output
    assert "Todo #3" in output
    
    # Check that todo #2 was deleted
    assert "Todo #2 deleted." in output
    
    # Check that attempting to delete non-existent ID gives proper error
    assert "Todo ID 999 not found" in output
    
    print("PASS: Delete and missing ID flows work correctly")


if __name__ == "__main__":
    print("Running behavioral tests...")
    test_add_and_view_todos()
    test_update_and_toggle_flows()
    test_delete_and_missing_id_flows()
    print("All behavioral tests passed!")
