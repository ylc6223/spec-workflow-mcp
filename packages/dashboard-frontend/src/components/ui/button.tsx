import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, MotionProps } from "motion/react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { useTheme } from "@/modules/theme/ThemeProvider"
import { ButtonVariant, ButtonSize } from "@/types/design-system"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-98",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 hover:shadow-md",
        outline:
          "border border-input bg-background shadow-subtle hover:bg-accent hover:text-accent-foreground hover:shadow-card",
        secondary:
          "bg-secondary text-secondary-foreground shadow-subtle hover:bg-secondary/80 hover:shadow-card",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-subtle",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ComponentType<{ className?: string }>
  rightIcon?: React.ComponentType<{ className?: string }>
  animation?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    loadingText,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    animation = true,
    disabled,
    children,
    ...props 
  }, ref) => {
    const { shouldReduceMotion } = useTheme()
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    
    const buttonContent = (
      <>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          LeftIcon && <LeftIcon className="h-4 w-4" />
        )}
        
        {loading && loadingText ? loadingText : children}
        
        {!loading && RightIcon && <RightIcon className="h-4 w-4" />}
      </>
    )
    
    const buttonElement = (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          loading && "gap-2",
          LeftIcon && !loading && "gap-2",
          RightIcon && !loading && "gap-2",
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {buttonContent}
      </Comp>
    )

    // Apply motion effects unless reduced motion is preferred or disabled
    if (animation && !shouldReduceMotion && !asChild) {
      return (
        <motion.div
          whileHover={!isDisabled ? { scale: 1.02 } : undefined}
          whileTap={!isDisabled ? { scale: 0.98 } : undefined}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 17,
            duration: 0.15 
          }}
        >
          {buttonElement}
        </motion.div>
      )
    }

    return buttonElement
  }
)
Button.displayName = "Button"

// Enhanced icon button variant
const IconButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'leftIcon' | 'rightIcon'> & {
  icon: React.ComponentType<{ className?: string }>
  'aria-label': string
}>(({ icon: Icon, children, size = "icon", ...props }, ref) => {
  return (
    <Button ref={ref} size={size} {...props}>
      <Icon className="h-4 w-4" />
      <span className="sr-only">{children}</span>
    </Button>
  )
})
IconButton.displayName = "IconButton"

export { Button, IconButton, buttonVariants }