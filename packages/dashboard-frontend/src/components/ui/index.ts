/**
 * Enhanced UI Components Export
 * 
 * This file exports all the enhanced UI components that follow the design system
 * specifications. These components integrate with the theme system, support
 * animations, accessibility features, and responsive design.
 */

// Base Components
export { Button, IconButton, buttonVariants } from './button'
export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
  CardAction 
} from './card'

// Layout Components
export { Container, containerVariants } from './container'
export { Grid, GridItem, gridVariants, gridItemVariants } from './grid'
export { Stack, HStack, VStack, Center, stackVariants } from './stack'

// Motion Components
export { 
  MotionWrapper, 
  FadeIn, 
  SlideIn, 
  ScaleIn, 
  SlideInLeft, 
  SlideInRight,
  StaggerContainer,
  StaggerItem 
} from './motion-wrapper'

// Toggle Components
export { ToggleSwitch, ThemeToggleSwitch } from './toggle-switch'
export { ToggleButton, ControlToggleButton, ToggleButtonGroup } from './toggle-button'

// Existing shadcn/ui components (re-exported for convenience)
export { Badge } from './badge'
export { Input } from './input'
export { Label } from './label'
export { Select } from './select'
export { Separator } from './separator'
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
  SheetDescription 
} from './sheet'
export { Tooltip } from './tooltip'
export { Progress } from './progress'
export { Skeleton } from './skeleton'
export { AlertDialog } from './alert-dialog'
export { Dialog } from './dialog'
export { DropdownMenu } from './dropdown-menu'
export { NavigationMenu } from './navigation-menu'
export { Popover } from './popover'
export { Command } from './command'
export { Table } from './table'
export { Slider } from './slider'
export { Sonner } from './sonner'

// Design System Types (for external use)
export type { CardProps } from './card'
export type { ButtonProps } from './button'
export type { ContainerProps } from './container'
export type { GridProps, GridItemProps } from './grid'
export type { StackProps } from './stack'
export type { MotionWrapperProps, StaggerContainerProps, StaggerItemProps } from './motion-wrapper'