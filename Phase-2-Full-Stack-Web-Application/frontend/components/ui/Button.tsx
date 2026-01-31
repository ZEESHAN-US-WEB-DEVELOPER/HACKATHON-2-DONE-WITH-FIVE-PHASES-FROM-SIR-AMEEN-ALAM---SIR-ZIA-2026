import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * T015-T019: Button Component
 * Flagship UI button with variants, sizes, loading state, and hover animations
 *
 * Zero third-party libraries - uses only Tailwind CSS utilities and native CSS transitions
 */

/**
 * Button variant types
 * Each variant has specific colors for light/dark themes
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/**
 * Button size types
 * Each size has specific padding and typography
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component props
 * Extends standard HTML button attributes with custom props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * Button component
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * <Button variant="secondary" size="lg" isLoading>
 *   Loading...
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, fullWidth = false, children, className, disabled, ...props }, ref) => {
    /**
     * Variant-specific classes from design-system.md
     * T016: Button variants (primary, secondary, ghost, danger)
     */
    const variantClasses: Record<ButtonVariant, string> = {
      // Primary variant - indigo with hover lift
      primary:
        'bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90 disabled:bg-primary/50',
      // Secondary variant - white surface with border
      secondary:
        'bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 disabled:bg-secondary/50',
      // Ghost variant - transparent with hover background
      ghost:
        'bg-transparent text-foreground hover:bg-accent disabled:text-muted-foreground',
      // Danger variant - rose for destructive actions
      danger:
        'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 disabled:bg-destructive/50',
    };

    /**
     * Size-specific classes from design-system.md
     * T017: Button size variants (sm, md, lg)
     */
    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-4 py-2 text-base rounded-xl',
      lg: 'px-6 py-3 text-lg rounded-2xl',
    };

    /**
     * T018: Loading state with spinner
     * Disables button, shows opacity, adds spinner
     */
    const loadingSpinner = (
      <svg
        className="animate-spin h-5 w-5 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    /**
     * T019: Button hover/active animations (micro-lift 200-300ms)
     * Uses cubic-bezier ease-out-cubic for premium feel
     */
    const baseClasses = cn(
      // Base styles
      'inline-flex items-center justify-center font-medium rounded-md',
      // Focus ring for accessibility
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      // T019: Hover micro-lift animation
      'hover:-translate-y-px transition-all duration-200',
      // Disabled state
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0',
      // Full width option
      fullWidth ? 'w-full' : '',
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            {loadingSpinner}
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
