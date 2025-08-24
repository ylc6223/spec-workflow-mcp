import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ThemeContextType, ThemeMode, ActualTheme, DesignTokens } from '@/types/design-system';
import './tailwind.css';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Design tokens based on CSS variables
const getDesignTokens = (): DesignTokens => ({
  colors: {
    background: {
      DEFAULT: 'hsl(var(--background))',
      deep: 'hsl(var(--background-deep))'
    },
    foreground: 'hsl(var(--foreground))',
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))'
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))'
    },
    destructive: {
      DEFAULT: 'hsl(var(--destructive))',
      foreground: 'hsl(var(--destructive-foreground))'
    },
    success: {
      DEFAULT: 'hsl(var(--success))',
      foreground: 'hsl(var(--success-foreground))'
    },
    warning: {
      DEFAULT: 'hsl(var(--warning))',
      foreground: 'hsl(var(--warning-foreground))'
    },
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))'
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))',
      hover: 'hsl(var(--accent-hover))'
    },
    heavy: {
      DEFAULT: 'hsl(var(--heavy))',
      foreground: 'hsl(var(--heavy-foreground))'
    },
    popover: {
      DEFAULT: 'hsl(var(--popover))',
      foreground: 'hsl(var(--popover-foreground))'
    },
    card: {
      DEFAULT: 'hsl(var(--card))',
      foreground: 'hsl(var(--card-foreground))'
    },
    sidebar: {
      DEFAULT: 'hsl(var(--sidebar))',
      deep: 'hsl(var(--sidebar-deep))'
    },
    header: 'hsl(var(--header))',
    menu: 'hsl(var(--menu))',
    overlay: 'hsl(var(--overlay))',
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    chart: {
      1: 'hsl(var(--chart-1))',
      2: 'hsl(var(--chart-2))',
      3: 'hsl(var(--chart-3))',
      4: 'hsl(var(--chart-4))',
      5: 'hsl(var(--chart-5))'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem', 
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem'
  },
  borderRadius: {
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
    full: '9999px'
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }]
  }
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'system';
    
    const saved = localStorage.getItem('theme');
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved as ThemeMode;
    }
    return 'system';
  });

  const [actualTheme, setActualTheme] = useState<ActualTheme>(() => {
    if (typeof window === 'undefined') return 'light';
    
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme as ActualTheme;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tokens] = useState<DesignTokens>(getDesignTokens);

  // Apply theme changes with smooth transitions
  const applyThemeChange = useCallback((newTheme: ActualTheme, skipTransition: boolean = false) => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    const transitionDuration = shouldReduceMotion ? 0 : 300;
    
    if (!skipTransition && newTheme !== actualTheme && !shouldReduceMotion) {
      setIsTransitioning(true);
      
      // Temporarily disable all transitions during theme switching
      root.classList.add('theme-switching');
      
      // Apply the theme classes immediately
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      setActualTheme(newTheme);
      
      // Force reflow to ensure class changes are applied
      root.offsetHeight;
      
      // Re-enable transitions after theme classes are applied
      const timeoutId = setTimeout(() => {
        root.classList.remove('theme-switching');
        setIsTransitioning(false);
      }, 16); // One frame delay to ensure smooth transition
      
      return () => clearTimeout(timeoutId);
    } else {
      // Immediate theme change for reduced motion or skip transition
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      setActualTheme(newTheme);
    }
  }, [actualTheme, shouldReduceMotion]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Determine the effective theme
    let effectiveTheme: ActualTheme;
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      effectiveTheme = theme as ActualTheme;
    }
    
    // Apply theme change if different
    if (effectiveTheme !== actualTheme) {
      applyThemeChange(effectiveTheme);
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, actualTheme, applyThemeChange]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const newTheme: ActualTheme = mediaQuery.matches ? 'dark' : 'light';
      if (newTheme !== actualTheme) {
        applyThemeChange(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, actualTheme, applyThemeChange]);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    root.classList.add(actualTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const themeSequence: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = themeSequence.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeSequence.length;
    setTheme(themeSequence[nextIndex]);
  }, [theme]);

  const value = useMemo(
    () => ({ 
      theme, 
      actualTheme, 
      setTheme, 
      toggleTheme, 
      isTransitioning,
      tokens,
      shouldReduceMotion: !!shouldReduceMotion 
    }),
    [theme, actualTheme, toggleTheme, isTransitioning, tokens, shouldReduceMotion]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType & { 
  tokens: DesignTokens; 
  shouldReduceMotion: boolean;
} {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx as ThemeContextType & { 
    tokens: DesignTokens; 
    shouldReduceMotion: boolean;
  };
}


