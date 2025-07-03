import React from 'react';
import Heading from './heading';
import Text from './text';
import { cn } from '../lib/utils';
import { Button } from './button';

interface ApiErrorProps {
  className?: string;
  emoji?: string;
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  retryLabel?: string;
}

const ApiError = ({
  className,
  emoji = '⚠️',
  title = 'Oops! Something went wrong',
  message = 'We encountered an issue while loading your data. This might be due to:',
  onRetry,
  showRetry = false,
  retryLabel = 'Try Again',
}: ApiErrorProps) => {
  const errorDetails = ['Temporary network issues', 'Server maintenance', 'High traffic volume'];

  return (
    <div className={cn('col-span-full animate-fade-in', className)}>
      <div className="text-center space-y-4 py-8 px-4 max-w-md mx-auto">
        <div className="text-5xl mb-4 animate-bounce [animation-duration:2s] [animation-iteration-count:infinite]">{emoji}</div>

        <Heading as="h5" className="text-destructive animate-fade-in-up [animation-duration:0.5s]">
          {title}
        </Heading>

        <Text variant="body2" textColor="muted" className="mb-3 animate-fade-in [animation-duration:0.5s] [animation-delay:0.3s] [animation-fill-mode:both]">
          {message}
        </Text>

        <ul className="text-sm text-muted-foreground text-left space-y-1 mb-4 mx-auto w-fit">
          {errorDetails.map((detail, i) => (
            <li
              key={i}
              className="flex items-start animate-fade-in [animation-fill-mode:both]"
              style={{
                animationDuration: '0.5s',
                animationDelay: `${0.5 + i * 0.2}s`,
              }}
            >
              <span className="mr-2">•</span> {detail}
            </li>
          ))}
        </ul>

        {showRetry && onRetry && (
          <div className="mt-2 animate-fade-in [animation-duration:0.5s] [animation-delay:1.1s] [animation-fill-mode:both]">
            <Button onClick={onRetry} variant="outline" className="hover:scale-105 active:scale-95 transition-transform">
              {retryLabel}
            </Button>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4 animate-fade-in [animation-duration:0.5s] [animation-delay:1.4s] [animation-fill-mode:both]">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
};

export default ApiError;
