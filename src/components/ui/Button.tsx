import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type || "button"}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          {
            'bg-accent text-white hover:bg-accent-hover': variant === 'primary',
            'bg-surface border border-border text-text-primary hover:bg-border': variant === 'secondary',
            'border border-border bg-transparent hover:bg-surface text-text-primary': variant === 'outline',
            'bg-transparent hover:bg-surface text-text-primary': variant === 'ghost',
            'h-9 px-4 text-xs': size === 'sm',
            'h-11 px-8 text-sm': size === 'md',
            'h-14 px-10 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
