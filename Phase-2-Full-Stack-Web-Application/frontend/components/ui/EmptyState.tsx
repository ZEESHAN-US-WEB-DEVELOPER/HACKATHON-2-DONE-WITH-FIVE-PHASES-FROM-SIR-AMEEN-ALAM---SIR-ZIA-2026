import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Sparkles, Search, CheckCircle2, Inbox } from 'lucide-react';

export type EmptyStateType = 'no-todos' | 'no-results' | 'all-complete';

export interface EmptyStateProps {
  type: EmptyStateType;
  title: string;
  description: string;
  cta?: {
    text: string;
    action: () => void;
  };
  className?: string;
}

const EmptyState = ({
  type = 'no-todos',
  title,
  description,
  cta,
  className,
}: EmptyStateProps) => {
  const getIcon = () => {
    switch (type) {
      case 'all-complete':
        return <CheckCircle2 className="w-12 h-12 text-primary" />;
      case 'no-results':
        return <Search className="w-12 h-12 text-muted-foreground" />;
      default:
        return <Inbox className="w-12 h-12 text-muted-foreground" />;
    }
  };

  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-16 px-4 text-center',
      className
    )}>
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center border border-border">
          {getIcon()}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-sm mb-6">
        {description}
      </p>

      {cta && (
        <Button
          variant="primary"
          size="lg"
          onClick={cta.action}
          className="rounded-lg h-10 text-base font-medium"
        >
          {cta.text}
        </Button>
      )}
    </div>
  );
};

export { EmptyState };
