import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          // Base layout and sizing
          "relative grow overflow-hidden rounded-full",
          // Orientation-specific sizing
          "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
          // Background and visual styling
          "bg-muted border border-border",
          // Inner shadow for depth
          "shadow-inner",
          // Smooth transitions
          "transition-colors duration-200"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            // Positioning
            "absolute",
            // Orientation-specific sizing
            "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
            // Visual styling
            "bg-primary rounded-full",
            // Subtle shadow for depth
            "shadow-sm",
            // Smooth transitions
            "transition-all duration-200"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            // Base styles with higher specificity
            "block size-6 shrink-0 rounded-full",
            // Background and border
            "bg-background border-primary border-2",
            // Shadow for depth
            "shadow-lg",
            // Focus and interaction states
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background",
            // Hover states
            "hover:shadow-xl hover:scale-105",
            // Active state
            "active:scale-95",
            // Transitions
            "transition-all duration-200 ease-out",
            // Disabled state
            "disabled:pointer-events-none disabled:opacity-50",
            // Force higher z-index to ensure thumb appears above track
            "relative z-10",
            // Ensure proper cursor
            "cursor-pointer"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
