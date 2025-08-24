"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Hook to handle body scroll locking for sheet
function useScrollLock(isOpen: boolean) {
  React.useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      const body = document.body;
      
      // Set data attribute for CSS styling
      body.setAttribute('data-sheet-open', 'true');
      
      // Lock scroll position
      body.style.top = `-${scrollY}px`;
      
      return () => {
        // Restore scroll position
        body.removeAttribute('data-sheet-open');
        body.style.top = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);
}

function Sheet({ open, onOpenChange, ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  // Lock body scroll when sheet is open
  useScrollLock(open || false);
  
  return <DialogPrimitive.Root data-slot="sheet" open={open} onOpenChange={onOpenChange} {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />
}

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
})
SheetOverlay.displayName = "SheetOverlay"

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left"
  }
>(({ side = "left", className, children, ...props }, ref) => {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "group/sheet-content bg-background border shadow-xl fixed z-50 flex flex-col overflow-hidden",
          // Right side sheet (default for mobile navigation)
          side === "right" && [
            "inset-y-0 right-0 h-full w-full max-w-xs border-l",
            "sm:w-80 sm:max-w-sm"
          ],
          // Left side sheet
          side === "left" && [
            "inset-y-0 left-0 h-full w-full max-w-xs border-r",
            "sm:w-80 sm:max-w-sm"
          ],
          // Top sheet
          side === "top" && [
            "inset-x-0 top-0 h-auto max-h-[80vh] rounded-b-lg border-b"
          ],
          // Bottom sheet
          side === "bottom" && [
            "inset-x-0 bottom-0 h-auto max-h-[80vh] rounded-t-lg border-t"
          ],
          className
        )}
        onAnimationEnd={(e) => {
          // Handle animation end to ensure proper state cleanup
          if (e.animationName.includes("slideOut") || e.animationName.includes("fadeOut")) {
            // Animation completed, the element will be removed from DOM
          }
        }}
        {...props}
      >
        {/* Drag handle for bottom sheet */}
        {side === "bottom" && (
          <div className="bg-muted mx-auto mt-4 h-2 w-[100px] shrink-0 rounded-full" />
        )}
        {children}
        <SheetClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none h-8 w-8 flex items-center justify-center">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </DialogPrimitive.Content>
    </SheetPortal>
  )
})
SheetContent.displayName = "SheetContent"

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-2 p-6 pb-4 flex-shrink-0 group-data-[vaul-drawer-direction=bottom]/sheet-content:text-center group-data-[vaul-drawer-direction=top]/sheet-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-3 p-6 pt-4 flex-shrink-0", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
