"""Domain models for the in-memory console todo application."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Optional


def utc_now() -> datetime:
    """Return timezone-aware UTC timestamps for deterministic storage."""

    return datetime.now(timezone.utc)


@dataclass(slots=True)
class Todo:
    """In-memory representation of a todo item with invariant enforcement."""

    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False
    created_at: datetime = field(default_factory=utc_now)
    updated_at: datetime = field(default_factory=utc_now)
    completed_at: Optional[datetime] = None

    def __post_init__(self) -> None:
        if self.id <= 0:
            raise ValueError("Todo.id must be positive")
        if not self.title:
            raise ValueError("Todo.title must be non-empty")
        if len(self.title) > 120:
            raise ValueError("Todo.title must be <= 120 characters")
        if self.description and len(self.description) > 120:
            raise ValueError("Todo.description must be <= 120 characters")
        if self.completed and self.completed_at is None:
            raise ValueError("Todo.completed_at required when completed is True")
        if self.created_at.tzinfo is None or self.updated_at.tzinfo is None:
            raise ValueError("Timestamps must be timezone aware")
        if self.updated_at < self.created_at:
            raise ValueError("updated_at must be >= created_at")

    def set_title(self, title: str, timestamp: Optional[datetime] = None) -> None:
        if not title:
            raise ValueError("Title cannot be empty")
        if len(title) > 120:
            raise ValueError("Title cannot exceed 120 characters")
        self.title = title
        self.updated_at = timestamp or utc_now()

    def set_description(self, description: Optional[str], timestamp: Optional[datetime] = None) -> None:
        if description and len(description) > 120:
            raise ValueError("Description cannot exceed 120 characters")
        self.description = description
        self.updated_at = timestamp or utc_now()

    def mark_complete(self, timestamp: Optional[datetime] = None) -> None:
        self.completed = True
        self.completed_at = timestamp or utc_now()
        self.updated_at = self.completed_at

    def mark_pending(self, timestamp: Optional[datetime] = None) -> None:
        self.completed = False
        self.completed_at = None
        self.updated_at = timestamp or utc_now()
