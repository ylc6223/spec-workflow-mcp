import * as React from "react"
import { motion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useTheme } from "@/modules/theme/ThemeProvider"
import { CardVariant } from "@/types/design-system"

const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col rounded-lg border transition-all duration-normal ease-standard",
  {
    variants: {
      variant: {
        default: "shadow-card",
        outline: "shadow-none border-2",
        elevated: "shadow-lg",
      },
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
      hoverable: {
        true: "card-hover cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      hoverable: false,
    },
  }
)

export interface CardProps 
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {
  hoverable?: boolean
  clickable?: boolean
  animation?: boolean
}

function Card({ 
  className, 
  variant, 
  padding,
  hoverable = false,
  clickable = false,
  animation = true,
  onClick,
  children,
  ...props 
}: CardProps) {
  const { shouldReduceMotion } = useTheme()
  const isInteractive = hoverable || clickable || !!onClick
  
  const cardElement = (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ variant, padding, hoverable: isInteractive }),
        isInteractive && "cursor-pointer",
        className
      )}
      onClick={onClick}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  )

  // Apply motion effects unless reduced motion is preferred
  if (animation && !shouldReduceMotion && isInteractive) {
    return (
      <motion.div
        whileHover={{ 
          scale: 1.01,
          y: -2,
        }}
        whileTap={{ scale: 0.99 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          duration: 0.2
        }}
      >
        {cardElement}
      </motion.div>
    )
  }

  return cardElement
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [&:has([data-slot=card-description])]:gap-1.5",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ 
  className, 
  level = "h3",
  ...props 
}: React.ComponentProps<"div"> & { level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }) {
  const Comp = level
  return (
    <Comp
      data-slot="card-title"
      className={cn(
        "leading-tight font-semibold tracking-tight",
        level === "h1" && "text-2xl",
        level === "h2" && "text-xl",
        level === "h3" && "text-lg",
        level === "h4" && "text-base",
        level === "h5" && "text-sm",
        level === "h6" && "text-xs",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 space-y-4", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-between px-6 pt-4 border-t border-border",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
