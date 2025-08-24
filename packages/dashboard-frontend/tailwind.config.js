/** @type {import('@tailwindcss/postcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: {
          DEFAULT: "hsl(var(--input))",
          placeholder: "hsl(var(--input-placeholder))",
          background: "hsl(var(--input-background))",
        },
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          deep: "hsl(var(--background-deep))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          hover: "hsl(var(--accent-hover))",
        },
        heavy: {
          DEFAULT: "hsl(var(--heavy))",
          foreground: "hsl(var(--heavy-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          deep: "hsl(var(--sidebar-deep))",
        },
        header: "hsl(var(--header))",
        menu: "hsl(var(--menu))",
        overlay: "hsl(var(--overlay))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['var(--font-size-base, 1rem)', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-in': 'fadeIn var(--duration-normal) var(--ease-standard)',
        'slide-in': 'slideIn var(--duration-normal) var(--ease-standard)',
        'scale-in': 'scaleIn var(--duration-fast) var(--ease-standard)',
        'slide-in-left': 'slideInFromLeft var(--duration-normal) var(--ease-out)',
        'slide-in-right': 'slideInFromRight var(--duration-normal) var(--ease-out)',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 2s linear infinite',
        // Drawer animations
        'slide-in-from-right': 'slideInFromRightDrawer var(--duration-normal) var(--ease-out)',
        'slide-out-to-right': 'slideOutToRightDrawer var(--duration-normal) var(--ease-in)',
        'slide-in-from-left': 'slideInFromLeftDrawer var(--duration-normal) var(--ease-out)',
        'slide-out-to-left': 'slideOutToLeftDrawer var(--duration-normal) var(--ease-in)',
        'slide-in-from-top': 'slideInFromTopDrawer var(--duration-normal) var(--ease-out)',
        'slide-out-to-top': 'slideOutToTopDrawer var(--duration-normal) var(--ease-in)',
        'slide-in-from-bottom': 'slideInFromBottomDrawer var(--duration-normal) var(--ease-out)',
        'slide-out-to-bottom': 'slideOutToBottomDrawer var(--duration-normal) var(--ease-in)',
      },
      transitionTimingFunction: {
        'ease-standard': 'var(--ease-standard)',
        'ease-in': 'var(--ease-in)',
        'ease-out': 'var(--ease-out)',
        'ease-in-out': 'var(--ease-in-out)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 hsl(var(--foreground) / 0.05)',
        'card': '0 1px 3px 0 hsl(var(--foreground) / 0.1), 0 1px 2px 0 hsl(var(--foreground) / 0.06)',
        'card-hover': '0 4px 6px -1px hsl(var(--foreground) / 0.1), 0 2px 4px -1px hsl(var(--foreground) / 0.06)',
        'lg': '0 10px 15px -3px hsl(var(--foreground) / 0.1), 0 4px 6px -2px hsl(var(--foreground) / 0.05)',
        'xl': '0 20px 25px -5px hsl(var(--foreground) / 0.1), 0 10px 10px -5px hsl(var(--foreground) / 0.04)',
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    // Tailwind CSS v4 使用 ESM 导入方式
    (await import('@tailwindcss/typography')).default(),
  ],
};
