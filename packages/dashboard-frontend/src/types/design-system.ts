/**
 * Design System Types
 * 
 * Comprehensive TypeScript types for the Spec Workflow Dashboard design system.
 * This includes theme configuration, component variants, animation specifications,
 * and layout system types.
 */

// Theme System Types
export type ThemeMode = 'light' | 'dark' | 'system';
export type ActualTheme = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeMode;
  actualTheme: ActualTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

// Color System Types
export interface ColorScale {
  DEFAULT: string;
  foreground: string;
}

export interface ChartColors {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}

export interface DesignTokens {
  colors: {
    background: string;
    foreground: string;
    primary: ColorScale;
    secondary: ColorScale;
    destructive: ColorScale;
    muted: ColorScale;
    accent: ColorScale;
    popover: ColorScale;
    card: ColorScale;
    border: string;
    input: string;
    ring: string;
    chart: ChartColors;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  fontSize: {
    xs: [string, { lineHeight: string }];
    sm: [string, { lineHeight: string }];
    base: [string, { lineHeight: string }];
    lg: [string, { lineHeight: string }];
    xl: [string, { lineHeight: string }];
    '2xl': [string, { lineHeight: string }];
    '3xl': [string, { lineHeight: string }];
    '4xl': [string, { lineHeight: string }];
  };
}

// Component Variant Types
export type ButtonVariant = 
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

export type ButtonSize = 
  | 'default'
  | 'sm'
  | 'lg' 
  | 'icon';

export type CardVariant = 
  | 'default'
  | 'outline'
  | 'elevated';

export type InputVariant = 
  | 'default'
  | 'error'
  | 'success';

export type BadgeVariant = 
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline';

// Animation System Types
export type AnimationEasing = 
  | 'ease-standard'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out';

export type AnimationDuration = 
  | 'fast'
  | 'normal'
  | 'slow';

export interface AnimationConfig {
  duration: AnimationDuration;
  easing: AnimationEasing;
  delay?: number;
}

export type AnimationType = 
  | 'fade-in'
  | 'slide-in'
  | 'scale-in'
  | 'slide-in-left'
  | 'slide-in-right'
  | 'pulse-slow'
  | 'spin-slow';

// Layout System Types
export type ContainerSize = 
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'full';

export type GridColumns = 
  | 1 | 2 | 3 | 4 | 5 | 6 
  | 7 | 8 | 9 | 10 | 11 | 12
  | 13 | 14 | 15 | 16;

export type SpacingScale = 
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 
  | 8 | 10 | 12 | 16 | 20 | 24 
  | 32 | 40 | 48 | 56 | 64;

export interface LayoutConfig {
  container: ContainerSize;
  padding: SpacingScale;
  gap: SpacingScale;
  columns?: GridColumns;
}

// Breakpoint System
export type Breakpoint = 
  | 'xs'
  | 'sm' 
  | 'md' 
  | 'lg' 
  | 'xl' 
  | '2xl'
  | '3xl';

export interface ResponsiveConfig<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
  '3xl'?: T;
}

// Interaction States
export interface InteractionStates {
  hover?: boolean;
  focus?: boolean;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

// Component Base Props
export interface BaseComponentProps {
  className?: string;
  variant?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  animation?: AnimationType;
  animationConfig?: AnimationConfig;
}

// Enhanced Button Props
export interface EnhancedButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  leftIcon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
  loadingText?: string;
}

// Enhanced Card Props
export interface EnhancedCardProps extends BaseComponentProps {
  variant?: CardVariant;
  hoverable?: boolean;
  clickable?: boolean;
  padding?: SpacingScale;
}

// Form Component Types
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  disabled?: boolean;
  children?: NavigationItem[];
}

export interface NavigationConfig {
  items: NavigationItem[];
  collapsed?: boolean;
  variant?: 'sidebar' | 'top' | 'mobile';
}

// Data Display Types
export interface TableColumn<T = any> {
  key: keyof T;
  title: string;
  width?: number | string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface TableConfig<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
  };
  selection?: {
    type: 'checkbox' | 'radio';
    selectedRowKeys: React.Key[];
    onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  };
}

// Toast/Notification Types
export type NotificationType = 
  | 'success'
  | 'error' 
  | 'warning'
  | 'info';

export interface NotificationConfig {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  closable?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Modal/Dialog Types
export type ModalSize = 
  | 'sm' 
  | 'md' 
  | 'lg' 
  | 'xl' 
  | 'full';

export interface ModalConfig {
  size?: ModalSize;
  closable?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  centered?: boolean;
}

// Chart/Visualization Types
export interface ChartTheme {
  colors: ChartColors;
  backgroundColor: string;
  textColor: string;
  gridColor: string;
  axisColor: string;
}

// Accessibility Types
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-selected'?: boolean;
  'aria-checked'?: boolean;
  'aria-disabled'?: boolean;
  role?: string;
  tabIndex?: number;
}

// Component Factory Types
export interface ComponentFactory<T extends BaseComponentProps = BaseComponentProps> {
  create: (props: T) => React.ComponentType<T>;
  variants: Record<string, Partial<T>>;
  defaultProps: Partial<T>;
}

// Design System Context
export interface DesignSystemContextType {
  tokens: DesignTokens;
  theme: ThemeContextType;
  breakpoint: Breakpoint;
  animations: {
    enabled: boolean;
    reducedMotion: boolean;
  };
  components: {
    factory: <T extends BaseComponentProps>(
      name: string, 
      config: ComponentFactory<T>
    ) => React.ComponentType<T>;
  };
}

// Utility Types
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type PropsWithVariants<T, V extends Record<string, any>> = T & {
  variants?: Partial<V>;
};

// CSS-in-JS Style Types
export interface StyleConfig {
  base: string;
  variants?: Record<string, Record<string, string>>;
  compoundVariants?: Array<{
    conditions: Record<string, any>;
    styles: string;
  }>;
  defaultVariants?: Record<string, any>;
}

// Export everything as a single namespace for convenience
export namespace DesignSystem {
  export type Theme = ThemeMode;
  export type ActualTheme = ActualTheme;
  export type Context = DesignSystemContextType;
  export type Tokens = DesignTokens;
  export type Animation = AnimationType;
  export type Breakpoint = Breakpoint;
  export type ButtonProps = EnhancedButtonProps;
  export type CardProps = EnhancedCardProps;
  export type FormField = FormFieldProps;
  export type Navigation = NavigationConfig;
  export type Table<T = any> = TableConfig<T>;
  export type Notification = NotificationConfig;
  export type Modal = ModalConfig;
  export type Chart = ChartTheme;
  export type A11y = A11yProps;
}