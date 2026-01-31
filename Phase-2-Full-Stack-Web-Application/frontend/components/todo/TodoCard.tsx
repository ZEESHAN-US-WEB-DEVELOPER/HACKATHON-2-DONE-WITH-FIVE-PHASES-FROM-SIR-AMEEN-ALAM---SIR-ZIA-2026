'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Todo } from '@/lib/types';
import { CheckCircle2, Trash2, Edit3, Calendar, Clock } from 'lucide-react';

export interface TodoCardProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  index?: number;
}

const TodoCard = ({ todo, onToggle, onDelete, onEdit, index = 0 }: TodoCardProps) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 300);
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  return (
    <div
      className={cn(
        'group relative rounded-2xl p-6 border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md',
        todo.completed && 'opacity-70 bg-muted/10',
        isDeleting && 'opacity-0 scale-95'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Status Indicator & Title */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4 flex-1">
            <button
              onClick={handleToggle}
              className={cn(
                'mt-1 w-5 h-5 rounded-sm border flex items-center justify-center transition-all duration-200',
                todo.completed
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'border-input hover:border-primary'
              )}
            >
              {todo.completed && <CheckCircle2 className="w-4 h-4" />}
            </button>
            <div className="min-w-0">
              <h3 className={cn(
                'text-base font-medium tracking-tight transition-all duration-300',
                todo.completed && 'line-through opacity-50'
              )}>
                {todo.title}
              </h3>
            </div>
          </div>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="w-8 h-8 p-0 rounded-md hover:bg-accent"
              aria-label="Edit task"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="w-8 h-8 p-0 rounded-md hover:bg-destructive/10"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Description */}
        {todo.description && (
          <p className={cn(
            'text-sm text-muted-foreground mb-6 line-clamp-2',
            todo.completed && 'line-through opacity-60'
          )}>
            {todo.description}
          </p>
        )}

        {/* Footer info */}
        <div className="mt-auto pt-4 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            Created: {new Date(todo.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {new Date(todo.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { TodoCard };
