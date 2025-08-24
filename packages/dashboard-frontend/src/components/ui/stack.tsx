import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { SpacingScale } from "@/types/design-system"

const stackVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        row: "flex-row",
        "row-reverse": "flex-row-reverse",
        col: "flex-col",
        "col-reverse": "flex-col-reverse",
      },
      gap: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2", 
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
        12: "gap-12",
        16: "gap-16",
        20: "gap-20",
        24: "gap-24",
        32: "gap-32",
        40: "gap-40",
        48: "gap-48",
        56: "gap-56",
        64: "gap-64",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      wrap: {
        true: "flex-wrap",
        false: "flex-nowrap",
        reverse: "flex-wrap-reverse",
      },
    },
    defaultVariants: {
      direction: "row",
      gap: 4,
      align: "start",
      justify: "start",
      wrap: false,
    },
  }
)

export interface StackProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof stackVariants> {
  gap?: SpacingScale
  as?: React.ElementType
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap, align, justify, wrap, as: Comp = "div", ...props }, ref) => {
    return (
      <Comp
        className={cn(stackVariants({ direction, gap, align, justify, wrap, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"

// Convenience components for common layouts
const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, "direction">>(
  ({ ...props }, ref) => {
    return <Stack ref={ref} direction="row" {...props} />
  }
)
HStack.displayName = "HStack"

const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, "direction">>(
  ({ ...props }, ref) => {
    return <Stack ref={ref} direction="col" {...props} />
  }
)
VStack.displayName = "VStack"

const Center = React.forwardRef<HTMLDivElement, Omit<StackProps, "align" | "justify">>(
  ({ ...props }, ref) => {
    return <Stack ref={ref} align="center" justify="center" {...props} />
  }
)
Center.displayName = "Center"

export { Stack, HStack, VStack, Center, stackVariants }