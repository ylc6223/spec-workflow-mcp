/**
 * Animation Utilities
 * 
 * Centralized animation configurations and utilities for the design system.
 * This file provides consistent animation presets, easing functions, and 
 * motion configurations that can be used throughout the application.
 */

import { Variants, Transition } from "motion/react"
import { AnimationType, AnimationConfig, AnimationEasing, AnimationDuration } from "@/types/design-system"

// Standard easing curves
export const easingCurves = {
  standard: [0.4, 0, 0.2, 1] as const,
  in: [0.4, 0, 1, 1] as const,
  out: [0, 0, 0.2, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
} as const

// Animation durations in milliseconds
export const durations = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const

// Standard transition configurations
export const transitions = {
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  } as Transition,
  
  smooth: {
    type: "tween",
    duration: 0.3,
    ease: easingCurves.standard,
  } as Transition,
  
  quick: {
    type: "tween", 
    duration: 0.15,
    ease: easingCurves.out,
  } as Transition,
  
  gentle: {
    type: "tween",
    duration: 0.5,
    ease: easingCurves.inOut,
  } as Transition,
} as const

// Common animation variants
export const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  } as Variants,
  
  slideIn: {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  } as Variants,
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  } as Variants,
  
  slideInLeft: {
    initial: { opacity: 0, x: -16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
  } as Variants,
  
  slideInRight: {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 },
  } as Variants,
  
  slideInUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 },
  } as Variants,
  
  slideInDown: {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  } as Variants,
  
  bounceIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    },
    exit: { opacity: 0, scale: 0.3 },
  } as Variants,
  
  // Stagger animations for lists
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  } as Variants,
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  } as Variants,
} as const

// Interactive animation presets
export const interactionAnimations = {
  button: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: transitions.spring,
  },
  
  card: {
    whileHover: { 
      scale: 1.01, 
      y: -2,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    whileTap: { scale: 0.99 },
    transition: transitions.smooth,
  },
  
  icon: {
    whileHover: { 
      scale: 1.1,
      rotate: [0, -5, 5, 0],
    },
    whileTap: { scale: 0.9 },
    transition: transitions.quick,
  },
  
  fab: {
    whileHover: { 
      scale: 1.05,
      boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.3)",
    },
    whileTap: { scale: 0.95 },
    transition: transitions.spring,
  },
} as const

// Page transition animations
export const pageTransitions = {
  default: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: transitions.smooth,
  },
  
  slide: {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
    transition: transitions.smooth,
  },
  
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.smooth,
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
    transition: transitions.smooth,
  },
} as const

// Utility functions
export const createAnimationConfig = (
  type: AnimationType,
  config?: Partial<AnimationConfig>
): { variants: Variants; transition: Transition } => {
  const variants = animationVariants[type.replace(/-/g, "") as keyof typeof animationVariants] || animationVariants.fadeIn
  
  const transition: Transition = {
    duration: durations[config?.duration || "normal"] / 1000,
    ease: easingCurves[config?.easing || "standard"],
    delay: config?.delay || 0,
  }
  
  return { variants, transition }
}

export const getTransitionForDuration = (duration: AnimationDuration): Transition => {
  return {
    duration: durations[duration] / 1000,
    ease: easingCurves.standard,
  }
}

export const getEasingFunction = (easing: AnimationEasing): number[] => {
  return [...easingCurves[easing]]
}

// Animation state management utilities
export const createLoadingAnimation = (duration: number = 2000) => ({
  animate: {
    rotate: 360,
    transition: {
      duration: duration / 1000,
      repeat: Infinity,
      ease: "linear",
    },
  },
})

export const createPulseAnimation = (duration: number = 2000) => ({
  animate: {
    opacity: [1, 0.5, 1],
    scale: [1, 1.05, 1],
    transition: {
      duration: duration / 1000,
      repeat: Infinity,
      ease: easingCurves.inOut,
    },
  },
})

export const createBounceAnimation = (intensity: number = 0.1) => ({
  animate: {
    y: [0, -intensity * 20, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: easingCurves.out,
    },
  },
})

// Reduced motion utilities
export const getAccessibleAnimation = (
  animation: any, 
  shouldReduceMotion: boolean
) => {
  if (shouldReduceMotion) {
    // Return a simplified animation or no animation at all
    return {
      ...animation,
      transition: {
        duration: 0.01, // Effectively instant
      },
    }
  }
  return animation
}

export const createAccessibleVariants = (
  variants: Variants,
  shouldReduceMotion: boolean
): Variants => {
  if (shouldReduceMotion) {
    return {
      initial: variants.initial,
      animate: variants.initial, // Skip animation, go directly to end state
      exit: variants.initial,
    }
  }
  return variants
}