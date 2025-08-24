import * as React from "react"
import { motion, HTMLMotionProps, Variants } from "motion/react"

import { useTheme } from "@/modules/theme/ThemeProvider"
import { animationVariants, transitions, createAccessibleVariants } from "@/lib/animations"
import { AnimationType } from "@/types/design-system"

export interface MotionWrapperProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  animation?: AnimationType
  delay?: number
  duration?: number
  disabled?: boolean
  variants?: Variants
  as?: React.ElementType
}

const MotionWrapper = React.forwardRef<HTMLDivElement, MotionWrapperProps>(
  ({ 
    animation = "fade-in",
    delay = 0,
    duration,
    disabled = false,
    variants: customVariants,
    as: Component = "div",
    children,
    ...props 
  }, ref) => {
    const { shouldReduceMotion } = useTheme()
    
    // Get the appropriate animation variants
    const getVariants = (): Variants => {
      if (customVariants) {
        return createAccessibleVariants(customVariants, shouldReduceMotion)
      }
      
      const variantKey = animation.replace(/-/g, "") as keyof typeof animationVariants
      const variants = animationVariants[variantKey] || animationVariants.fadeIn
      
      return createAccessibleVariants(variants, shouldReduceMotion)
    }
    
    // Get transition configuration
    const getTransition = () => {
      const baseTransition = transitions.smooth
      
      return {
        ...baseTransition,
        delay,
        duration: duration !== undefined ? duration : baseTransition.duration,
      }
    }
    
    // If animations are disabled or reduced motion is preferred, render static div
    if (disabled || shouldReduceMotion) {
      const StaticComponent = Component
      return (
        <StaticComponent ref={ref} {...props}>
          {children}
        </StaticComponent>
      )
    }
    
    const MotionComponent = motion.create(Component)
    
    return (
      <MotionComponent
        ref={ref}
        variants={getVariants()}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={getTransition()}
        {...props}
      >
        {children}
      </MotionComponent>
    )
  }
)
MotionWrapper.displayName = "MotionWrapper"

// Specialized motion components for common use cases
const FadeIn = React.forwardRef<HTMLDivElement, Omit<MotionWrapperProps, "animation">>(
  (props, ref) => <MotionWrapper ref={ref} animation="fade-in" {...props} />
)
FadeIn.displayName = "FadeIn"

const SlideIn = React.forwardRef<HTMLDivElement, Omit<MotionWrapperProps, "animation">>(
  (props, ref) => <MotionWrapper ref={ref} animation="slide-in" {...props} />
)
SlideIn.displayName = "SlideIn"

const ScaleIn = React.forwardRef<HTMLDivElement, Omit<MotionWrapperProps, "animation">>(
  (props, ref) => <MotionWrapper ref={ref} animation="scale-in" {...props} />
)
ScaleIn.displayName = "ScaleIn"

const SlideInLeft = React.forwardRef<HTMLDivElement, Omit<MotionWrapperProps, "animation">>(
  (props, ref) => <MotionWrapper ref={ref} animation="slide-in-left" {...props} />
)
SlideInLeft.displayName = "SlideInLeft"

const SlideInRight = React.forwardRef<HTMLDivElement, Omit<MotionWrapperProps, "animation">>(
  (props, ref) => <MotionWrapper ref={ref} animation="slide-in-right" {...props} />
)
SlideInRight.displayName = "SlideInRight"

// Stagger animation component for lists
export interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  stagger?: number
  disabled?: boolean
}

const StaggerContainer = React.forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ stagger = 0.1, disabled = false, children, ...props }, ref) => {
    const { shouldReduceMotion } = useTheme()
    
    if (disabled || shouldReduceMotion) {
      return <div ref={ref} {...props}>{children}</div>
    }
    
    return (
      <motion.div
        ref={ref}
        variants={{
          initial: {},
          animate: {
            transition: {
              staggerChildren: stagger,
            },
          },
          exit: {
            transition: {
              staggerChildren: stagger / 2,
              staggerDirection: -1,
            },
          },
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
StaggerContainer.displayName = "StaggerContainer"

export interface StaggerItemProps extends HTMLMotionProps<"div"> {
  disabled?: boolean
}

const StaggerItem = React.forwardRef<HTMLDivElement, StaggerItemProps>(
  ({ disabled = false, children, ...props }, ref) => {
    const { shouldReduceMotion } = useTheme()
    
    if (disabled || shouldReduceMotion) {
      return <div ref={ref} {...props}>{children}</div>
    }
    
    return (
      <motion.div
        ref={ref}
        variants={animationVariants.staggerItem}
        transition={transitions.smooth}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
StaggerItem.displayName = "StaggerItem"

export { 
  MotionWrapper, 
  FadeIn, 
  SlideIn, 
  ScaleIn, 
  SlideInLeft, 
  SlideInRight,
  StaggerContainer,
  StaggerItem 
}