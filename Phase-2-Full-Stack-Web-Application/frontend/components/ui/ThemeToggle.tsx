import * as React from 'react';
import { useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

/**
 * T033-T036: ThemeToggle Component
 * Toggle between light and dark themes with smooth transition and icon animation
 *
 * Zero third-party libraries - uses only Tailwind CSS utilities and native CSS transitions
 */

/**
 * ThemeToggle component props
 */
export interface ThemeToggleProps {
  position?: 'header' | 'settings';
  showLabel?: boolean;
  className?: string;
}

/**
 * ThemeToggle component
 *
 * @example
 * ```tsx
 * <ThemeToggle position="header" />
 * ```
 *
 * @example
 * ```tsx
 * <ThemeToggle showLabel />
 * ```
 */
const ThemeToggle = ({ position = 'header', showLabel = false, className }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  /**
   * T036: Theme toggle logic
   * Switch between 'light' and 'dark' with smooth transition
   */
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  /**
   * T034: Sun/Moon icons (stroke-based, 24x24)
   * Sun icon (shown in dark mode)
   */
  const sunIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );

  /**
   * T034: Moon icon (shown in light mode)
   */
  const moonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );

  /**
   * T035: Hover animation on icon
   * Subtle fill or path animation on hover
   * Micro-lift (200-300ms) with ease-out-cubic
   */
  const buttonClasses = cn(
    // Base styles
    'inline-flex items-center justify-center rounded-md',
    // Theme-specific styles
    'bg-background border border-input',
    // Hover state
    'hover:bg-accent hover:text-accent-foreground',
    // T035: Hover micro-lift animation (200-300ms ease-out-cubic)
    'hover:-translate-y-px transition-all duration-200',
    // Focus state
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    // Active state
    'active:translate-y-0',
    // Size and padding
    'p-2',
    className
  );

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Show opposite theme icon */}
      {theme === 'dark' ? sunIcon : moonIcon}

      {/* Optional label */}
      {showLabel && (
        <span className="ml-2 text-sm font-medium text-foreground">
          {theme === 'light' ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};

export { ThemeToggle };
