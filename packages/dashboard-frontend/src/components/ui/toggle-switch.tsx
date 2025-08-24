import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  'aria-label'?: string;
}

const sizeVariants = {
  sm: {
    switch: 'h-5 w-9',
    thumb: 'h-4 w-4',
    translate: 'translate-x-4'
  },
  md: {
    switch: 'h-6 w-11',
    thumb: 'h-5 w-5',
    translate: 'translate-x-5'
  },
  lg: {
    switch: 'h-7 w-12',
    thumb: 'h-6 w-6',
    translate: 'translate-x-5'
  }
};

export const ToggleSwitch = React.forwardRef<HTMLButtonElement, ToggleSwitchProps>(({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  className,
  children,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const variant = sizeVariants[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative inline-flex items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          variant.switch,
          checked 
            ? "bg-primary" 
            : "bg-input",
          !disabled && "cursor-pointer"
        )}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        <motion.div
          className={cn(
            "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
            variant.thumb
          )}
          layout
          initial={false}
          animate={{
            x: checked ? 20 : 2,
            scale: checked ? 1 : 0.95
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        />
      </motion.button>
      
      {children && (
        <motion.div
          initial={false}
          animate={{ opacity: disabled ? 0.5 : 1 }}
          className="select-none"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
});

ToggleSwitch.displayName = "ToggleSwitch";

// 专用于主题切换的开关组件
interface ThemeToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggleSwitch = React.forwardRef<HTMLInputElement, ThemeToggleSwitchProps>(({
  checked,
  onChange,
  disabled = false,
  className,
  showLabel = false
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.label 
        className="switch"
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-label={checked ? "Switch to light mode" : "Switch to dark mode"}
        />
        <span className={cn(
          "slider",
          disabled && "opacity-50 cursor-not-allowed"
        )} />
      </motion.label>
      
      {showLabel && (
        <motion.span
          initial={false}
          animate={{ opacity: disabled ? 0.5 : 1 }}
          className="text-sm font-medium text-foreground select-none"
        >
          {checked ? "Dark" : "Light"}
        </motion.span>
      )}
    </div>
  );
});

ThemeToggleSwitch.displayName = "ThemeToggleSwitch";