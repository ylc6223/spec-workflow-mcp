import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ContainerSize, SpacingScale } from "@/types/design-system"

const containerVariants = cva(
  "w-full mx-auto",
  {
    variants: {
      size: {
        sm: "max-w-sm", // 384px
        md: "max-w-md", // 448px
        lg: "max-w-2xl", // 672px
        xl: "max-w-4xl", // 896px
        "2xl": "max-w-6xl", // 1152px
        "3xl": "max-w-7xl", // 1280px
        full: "max-w-full",
      },
      padding: {
        0: "",
        1: "px-1", // 4px
        2: "px-2", // 8px
        3: "px-3", // 12px
        4: "px-4", // 16px
        5: "px-5", // 20px
        6: "px-6", // 24px
        8: "px-8", // 32px
        10: "px-10", // 40px
        12: "px-12", // 48px
        16: "px-16", // 64px
        20: "px-20", // 80px
        24: "px-24", // 96px
        32: "px-32", // 128px
      },
      responsive: {
        true: "px-4 sm:px-6 lg:px-8",
        false: "",
      },
    },
    defaultVariants: {
      size: "xl",
      padding: 0,
      responsive: true,
    },
  }
)

export interface ContainerProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof containerVariants> {
  size?: ContainerSize
  padding?: SpacingScale
  responsive?: boolean
  as?: React.ElementType
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, responsive, as: Comp = "div", ...props }, ref) => {
    return (
      <Comp
        className={cn(containerVariants({ size, padding, responsive, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container, containerVariants }