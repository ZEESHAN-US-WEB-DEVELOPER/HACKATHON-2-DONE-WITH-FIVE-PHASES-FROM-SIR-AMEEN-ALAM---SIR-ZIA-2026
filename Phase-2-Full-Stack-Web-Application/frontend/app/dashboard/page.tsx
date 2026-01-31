"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TodoCard } from '@/components/todo/TodoCard';
import type { Todo } from '@/lib/types';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodoComplete } from '@/lib/api';
import { Plus, Sparkles, Layout, CheckCircle2, ListTodo, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import Hero from '@/components/layout/Hero';

export default function DashboardPage() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState<Todo | null>(null);
  const [formData, setFormData] = React.useState({ title: '', description: '' });
  const [userName, setUserName] = React.useState('');
  const router = useRouter();
  const { addToast } = useToast();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('user_name');
      if (name) setUserName(name);
    }

    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
        addToast({
          type: 'error',
          message: 'Failed to load tasks',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [addToast]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      const newTodo = await createTodo({
        title: formData.title,
        description: formData.description,
        completed: false,
      });
      setTodos([newTodo, ...todos]);
      setShowAddModal(false);
      setFormData({ title: '', description: '' });
      addToast({
        type: 'success',
        message: 'Task created successfully!',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to create todo:', error);
      addToast({
        type: 'error',
        message: 'Failed to create task',
      });
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setFormData({ title: todo.title, description: todo.description || '' });
  };

  const handleUpdateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTodo || !formData.title.trim()) return;

    try {
      const updated = await updateTodo(editingTodo.id, {
        title: formData.title,
        description: formData.description,
        completed: editingTodo.completed,
      });
      setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)));
      setEditingTodo(null);
      setFormData({ title: '', description: '' });
      addToast({
        type: 'success',
        message: 'Task updated successfully',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to update todo:', error);
      addToast({
        type: 'error',
        message: 'Failed to update task',
      });
    }
  };

  const handleToggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const updated = await toggleTodoComplete(id, !todo.completed);
      setTodos(todos.map((t) => (t.id === id ? updated : t)));

      if (updated.completed) {
        addToast({
          type: 'success',
          message: '✅ Task completed! Another step toward your goals.',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      addToast({
        type: 'error',
        message: 'Failed to update task',
      });
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      addToast({
        type: 'info',
        message: 'Task deleted',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to delete todo:', error);
      addToast({
        type: 'error',
        message: 'Failed to delete task',
      });
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background">
      <div className="section-horizontal section-vertical max-w-7xl mx-auto">
        {/* Hero */}
        <div className="animate-welcome">
          <React.Suspense fallback={<div className="h-36" />}> 
            {/* lazy-like boundary for hero */}
            {/* @ts-ignore - dynamic import not necessary */}
            <Hero userName={userName || 'User'} pending={totalCount - completedCount} onPrimaryAction={() => setShowAddModal(true)} />
          </React.Suspense>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16 animate-welcome" style={{ animationDelay: '0.1s' }}>
          <div className="lg:col-span-3 rounded-2xl p-6 border border-border bg-card shadow-sm">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Productivity Score</p>
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold text-foreground">{progress}%</span>
                  <div className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">
                    +15% IMPROVEMENT
                  </div>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-xl font-semibold text-primary">{completedCount}/{totalCount}</p>
              </div>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              {totalCount === 0
                ? "Workspace ready. Begin organizing your tasks."
                : `Completed ${completedCount} tasks successfully. ${totalCount - completedCount} tasks remain in your queue.`}
            </p>
          </div>

          <div className="rounded-2xl p-6 border border-border bg-card shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => setShowAddModal(true)}>
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-4">
                <Plus className="w-6 h-6" strokeWidth={3} />
              </div>
              <h3 className="text-lg font-semibold mb-2">New Task</h3>
              <p className="text-sm text-muted-foreground">Instantly capture high-priority tasks in your ecosystem.</p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
              Add Task <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tasks Section Header */}
        <div className="flex items-center justify-between mb-10 animate-welcome" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-black tracking-tighter">My Tasks</h3>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="px-4 py-1 bg-muted/50 rounded-full text-foreground text-[10px] font-black tracking-[0.2em] border border-ui-border/20">
              {todos.length} TASKS
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && todos.length === 0 && (
          <div className="animate-welcome" style={{ animationDelay: '0.3s' }}>
            <EmptyState
              type="no-todos"
              title="No Tasks Yet"
              description="Get started by creating your first task to organize your work."
              cta={{
                text: 'Create Your First Task',
                action: () => setShowAddModal(true),
              }}
            />
          </div>
        )}

        {/* Todo List Grid */}
        {!loading && todos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {todos.map((todo, index) => (
              <div
                key={todo.id}
                className="animate-welcome"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <TodoCard
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                  index={index}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - Common Style for Add and Edit */}
      {(showAddModal || editingTodo) && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => {
              setShowAddModal(false);
              setEditingTodo(null);
              setFormData({ title: '', description: '' });
            }}
          />
          <div className="relative w-full max-w-lg rounded-xl border bg-popover p-6 shadow-lg animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                  {editingTodo ? <Sparkles className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-xl font-semibold leading-none">
                    {editingTodo ? 'Update Task' : 'Create New Task'}
                  </h3>
                  <p className="text-xs text-muted-foreground uppercase font-medium">Task Management Platform</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingTodo(null);
                  setFormData({ title: '', description: '' });
                }}
                className="w-8 h-8 rounded-sm hover:bg-accent transition-colors flex items-center justify-center"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Task Name</label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title..."
                  autoFocus
                  required
                  className="h-10 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Details</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add details about this task (optional)..."
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors resize-none outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingTodo(null);
                    setFormData({ title: '', description: '' });
                  }}
                  className="h-10 rounded-md text-sm"
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="h-10 rounded-md text-sm"
                >
                  {editingTodo ? 'Save Changes' : 'Create Task'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
