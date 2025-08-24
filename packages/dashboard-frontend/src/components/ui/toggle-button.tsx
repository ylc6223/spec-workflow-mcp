import React from 'react';
import { motion } from 'motion/react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
  onPressedChange?: (pressed: boolean) => void;
  'aria-label'?: string;
}

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(({
  pressed = false,
  variant = 'ghost',
  size = 'icon',
  className,
  children,
  onPressedChange,
  onClick,
  'aria-label': ariaLabel,
  disabled,
  ...props
}, ref) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onPressedChange?.(!pressed);
      onClick?.(event);
    }
  };

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        ref={ref}
        variant={pressed ? "default" : variant}
        size={size}
        className={cn(
          "relative transition-all duration-200",
          // Unified sizing for consistency
          size === 'icon' && "h-9 w-9",
          // Enhanced hover states
          !disabled && !pressed && variant === 'ghost' && "hover:bg-accent hover:text-accent-foreground",
          !disabled && pressed && "shadow-sm ring-1 ring-primary/20",
          // Focus states
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        onClick={handleClick}
        aria-pressed={pressed}
        aria-label={ariaLabel}
        disabled={disabled}
        {...props}
      >
        <motion.div
          initial={false}
          animate={{ 
            scale: pressed ? 1.05 : 1,
            opacity: disabled ? 0.5 : 1 
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {children}
        </motion.div>
        
        {/* Active indicator */}
        {pressed && !disabled && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full"
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
        )}
      </Button>
    </motion.div>
  );
});

ToggleButton.displayName = "ToggleButton";

// Unified control button specifically for header controls (language, volume, etc.)
interface ControlToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  tooltip?: string;
}

export const ControlToggleButton = React.forwardRef<HTMLButtonElement, ControlToggleButtonProps>(({
  icon,
  active = false,
  onClick,
  disabled = false,
  className,
  'aria-label': ariaLabel,
  tooltip,
  ...props
}, ref) => {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn(
          "relative h-9 w-9 rounded-lg transition-all duration-200",
          // Base styling with improved contrast for mobile
          "border border-transparent",
          // Improved contrast for both light and dark themes
          "text-muted-foreground hover:text-foreground",
          "bg-background/50 hover:bg-accent/80 hover:border-border/50",
          // Active states with much better visibility
          active && [
            "bg-primary/10 text-primary border-primary/30",
            "hover:bg-primary/15 hover:border-primary/40",
            "shadow-sm ring-2 ring-primary/20",
            "dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/50"
          ],
          // Focus states
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Disabled states
          disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-current",
          className
        )}
        onClick={onClick}
        aria-pressed={active}
        aria-label={ariaLabel}
        title={tooltip || ariaLabel}
        disabled={disabled}
        {...props}
      >
        <motion.div
          initial={false}
          animate={{ 
            scale: active ? 1.05 : 1,
            opacity: disabled ? 0.5 : 1,
            rotate: active ? [0, -1, 1, 0] : 0
          }}
          transition={{ 
            duration: active ? 0.3 : 0.15,
            ease: "easeOut"
          }}
          className="flex items-center justify-center text-current"
        >
          {icon}
        </motion.div>
      </Button>
    </motion.div>
  );
});

ControlToggleButton.displayName = "ControlToggleButton";

// Group container for related toggle buttons
interface ToggleButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'loose';
}

export function ToggleButtonGroup({
  children,
  className,
  orientation = 'horizontal',
  spacing = 'tight'
}: ToggleButtonGroupProps) {
  const spacingMap = {
    tight: 'gap-1',
    normal: 'gap-2', 
    loose: 'gap-3'
  };

  return (
    <div
      className={cn(
        "flex items-center",
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        spacingMap[spacing],
        className
      )}
      role="group"
    >
      {children}
    </div>
  );
}