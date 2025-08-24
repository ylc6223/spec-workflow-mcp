import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { GridColumns, SpacingScale, ResponsiveConfig } from "@/types/design-system"

const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2", 
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        7: "grid-cols-7",
        8: "grid-cols-8",
        9: "grid-cols-9",
        10: "grid-cols-10",
        11: "grid-cols-11",
        12: "grid-cols-12",
        13: "grid-cols-13",
        14: "grid-cols-14",
        15: "grid-cols-15",
        16: "grid-cols-16",
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
      rows: {
        1: "grid-rows-1",
        2: "grid-rows-2",
        3: "grid-rows-3",
        4: "grid-rows-4",
        5: "grid-rows-5",
        6: "grid-rows-6",
        none: "grid-rows-none",
      },
      autoRows: {
        auto: "auto-rows-auto",
        min: "auto-rows-min",
        max: "auto-rows-max",
        fr: "auto-rows-fr",
      },
      autoCols: {
        auto: "auto-cols-auto",
        min: "auto-cols-min",
        max: "auto-cols-max",
        fr: "auto-cols-fr",
      },
      flow: {
        row: "grid-flow-row",
        col: "grid-flow-col",
        "row-dense": "grid-flow-row-dense",
        "col-dense": "grid-flow-col-dense",
      }
    },
    defaultVariants: {
      cols: 12,
      gap: 4,
    },
  }
)

export interface GridProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof gridVariants> {
  cols?: GridColumns | ResponsiveConfig<GridColumns>
  gap?: SpacingScale | ResponsiveConfig<SpacingScale>
  responsive?: boolean
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, rows, autoRows, autoCols, flow, responsive, ...props }, ref) => {
    // Handle responsive grid columns
    const getResponsiveCols = () => {
      if (typeof cols === "object" && cols !== null) {
        const breakpoints = Object.entries(cols)
        return breakpoints.map(([breakpoint, value]) => {
          const prefix = breakpoint === "xs" ? "" : `${breakpoint}:`
          return `${prefix}grid-cols-${value}`
        }).join(" ")
      }
      return ""
    }

    // Handle responsive gap
    const getResponsiveGap = () => {
      if (typeof gap === "object" && gap !== null) {
        const breakpoints = Object.entries(gap)
        return breakpoints.map(([breakpoint, value]) => {
          const prefix = breakpoint === "xs" ? "" : `${breakpoint}:`
          return `${prefix}gap-${value}`
        }).join(" ")
      }
      return ""
    }

    const responsiveClasses = responsive ? 
      `${getResponsiveCols()} ${getResponsiveGap()}` : ""

    return (
      <div
        className={cn(
          gridVariants({
            cols: typeof cols === "number" ? cols : undefined,
            gap: typeof gap === "number" ? gap : undefined,
            rows,
            autoRows,
            autoCols,
            flow,
          }),
          responsiveClasses,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

const gridItemVariants = cva(
  "",
  {
    variants: {
      colSpan: {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        5: "col-span-5",
        6: "col-span-6",
        7: "col-span-7",
        8: "col-span-8",
        9: "col-span-9",
        10: "col-span-10",
        11: "col-span-11",
        12: "col-span-12",
        full: "col-span-full",
      },
      colStart: {
        1: "col-start-1",
        2: "col-start-2",
        3: "col-start-3",
        4: "col-start-4",
        5: "col-start-5",
        6: "col-start-6",
        7: "col-start-7",
        8: "col-start-8",
        9: "col-start-9",
        10: "col-start-10",
        11: "col-start-11",
        12: "col-start-12",
        13: "col-start-13",
        auto: "col-start-auto",
      },
      rowSpan: {
        1: "row-span-1",
        2: "row-span-2",
        3: "row-span-3",
        4: "row-span-4",
        5: "row-span-5",
        6: "row-span-6",
        full: "row-span-full",
      },
      rowStart: {
        1: "row-start-1",
        2: "row-start-2",
        3: "row-start-3",
        4: "row-start-4",
        5: "row-start-5",
        6: "row-start-6",
        auto: "row-start-auto",
      },
    },
  }
)

export interface GridItemProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof gridItemVariants> {
  colSpan?: number | "full" | ResponsiveConfig<number | "full">
  responsive?: boolean
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, colStart, rowSpan, rowStart, responsive, ...props }, ref) => {
    // Handle responsive column span
    const getResponsiveColSpan = () => {
      if (typeof colSpan === "object" && colSpan !== null) {
        const breakpoints = Object.entries(colSpan)
        return breakpoints.map(([breakpoint, value]) => {
          const prefix = breakpoint === "xs" ? "" : `${breakpoint}:`
          return `${prefix}col-span-${value}`
        }).join(" ")
      }
      return ""
    }

    const responsiveClasses = responsive ? getResponsiveColSpan() : ""

    return (
      <div
        className={cn(
          gridItemVariants({
            colSpan: typeof colSpan === "number" || colSpan === "full" ? colSpan : undefined,
            colStart,
            rowSpan,
            rowStart,
          }),
          responsiveClasses,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
GridItem.displayName = "GridItem"

export { Grid, GridItem, gridVariants, gridItemVariants }