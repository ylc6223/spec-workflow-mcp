# Spec Workflow Dashboard 设计系统

> 一个基于现代技术栈的高品质管理后台设计系统

## 目录

- [概述](#概述)
- [设计原则](#设计原则)
- [色彩系统](#色彩系统)
- [主题系统](#主题系统)
- [组件规范](#组件规范)
- [布局系统](#布局系统)
- [交互规范](#交互规范)
- [动画系统](#动画系统)
- [技术实现](#技术实现)

## 概述

Spec Workflow Dashboard 设计系统基于 shadcn/ui 组件库构建，结合 Tailwind CSS 和现代 React 技术栈，为规格工作流管理提供优雅、高效的用户界面。

### 技术栈

- **框架**: React 18 + TypeScript
- **样式**: Tailwind CSS v4 + CSS-in-JS
- **组件库**: shadcn/ui
- **主题系统**: CSS Variables + 暗色模式支持
- **构建工具**: Vite
- **国际化**: React i18next

## 设计原则

### 1. 简洁优雅
- 追求简洁而不失功能性的界面设计
- 使用现代扁平化设计语言
- 减少不必要的装饰元素

### 2. 一致性
- 统一的视觉语言和交互模式
- 可预测的用户体验
- 标准化的组件行为

### 3. 可访问性
- 支持键盘导航
- 合理的色彩对比度
- 屏幕阅读器友好

### 4. 响应式设计
- 移动优先的设计理念
- 灵活的栅格系统
- 自适应的组件布局

## 色彩系统

### 主色调

基于 HSL 色彩模式的语义化色彩系统，支持明暗主题切换：

#### 亮色主题

```css
:root {
  /* 背景色 */
  --background: 0 0% 100%;          /* #ffffff */
  --foreground: 222.2 84% 4.9%;     /* #0f172a */
  
  /* 主要色彩 */
  --primary: 221.2 83.2% 53.3%;     /* #3b82f6 */
  --primary-foreground: 210 40% 98%; /* #f8fafc */
  
  /* 次要色彩 */
  --secondary: 210 40% 96%;          /* #f1f5f9 */
  --secondary-foreground: 222.2 84% 4.9%; /* #0f172a */
  
  /* 静音色彩 */
  --muted: 210 40% 96%;              /* #f1f5f9 */
  --muted-foreground: 215.4 16.3% 46.9%; /* #64748b */
  
  /* 强调色彩 */
  --accent: 210 40% 96%;             /* #f1f5f9 */
  --accent-foreground: 222.2 84% 4.9%; /* #0f172a */
  
  /* 警告色彩 */
  --destructive: 0 84.2% 60.2%;      /* #ef4444 */
  --destructive-foreground: 210 40% 98%; /* #f8fafc */
  
  /* 边框和输入 */
  --border: 214.3 31.8% 91.4%;       /* #e2e8f0 */
  --input: 214.3 31.8% 91.4%;        /* #e2e8f0 */
  --ring: 221.2 83.2% 53.3%;         /* #3b82f6 */
}
```

#### 暗色主题

```css
.dark {
  --background: 222.2 84% 4.9%;      /* #0f172a */
  --foreground: 210 40% 98%;         /* #f8fafc */
  
  --primary: 217.2 91.2% 59.8%;      /* #60a5fa */
  --primary-foreground: 222.2 84% 4.9%; /* #0f172a */
  
  --secondary: 217.2 32.6% 17.5%;    /* #1e293b */
  --secondary-foreground: 210 40% 98%; /* #f8fafc */
  
  --muted: 217.2 32.6% 17.5%;        /* #1e293b */
  --muted-foreground: 215 20.2% 65.1%; /* #94a3b8 */
  
  --accent: 217.2 32.6% 17.5%;       /* #1e293b */
  --accent-foreground: 210 40% 98%;  /* #f8fafc */
  
  --destructive: 0 62.8% 30.6%;      /* #dc2626 */
  --destructive-foreground: 210 40% 98%; /* #f8fafc */
  
  --border: 217.2 32.6% 17.5%;       /* #1e293b */
  --input: 217.2 32.6% 17.5%;        /* #1e293b */
  --ring: 224.3 76.3% 94.1%;         /* #f1f5f9 */
}
```

### 图表色彩

专门为数据可视化设计的色彩系统：

```css
/* 亮色主题图表色彩 */
--chart-1: 12 76% 61%;   /* #e76f51 橙红色 */
--chart-2: 173 58% 39%;  /* #2a9d8f 青绿色 */
--chart-3: 197 37% 24%;  /* #264653 深青色 */
--chart-4: 43 74% 66%;   /* #e9c46a 金黄色 */
--chart-5: 27 87% 67%;   /* #f4a261 暖橙色 */

/* 暗色主题图表色彩 */
--chart-1: 220 70% 50%;  /* #3b82f6 蓝色 */
--chart-2: 160 60% 45%;  /* #10b981 绿色 */
--chart-3: 30 80% 55%;   /* #f59e0b 琥珀色 */
--chart-4: 280 65% 60%;  /* #8b5cf6 紫色 */
--chart-5: 340 75% 55%;  /* #ef4444 红色 */
```

## 主题系统

### 主题切换

基于 CSS 变量和类名切换的主题系统，支持：

- **亮色主题**: 默认主题，适合日间使用
- **暗色主题**: 护眼主题，适合夜间使用
- **系统主题**: 跟随系统设置自动切换

### 平滑过渡

所有主题切换都包含平滑的过渡动画：

```css
* {
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              color 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 组件规范

### 基础组件

#### 按钮 (Button)

**变体类型**：
- `default`: 主要操作按钮
- `destructive`: 危险操作按钮
- `outline`: 次要操作按钮
- `secondary`: 辅助操作按钮
- `ghost`: 幽灵按钮
- `link`: 链接样式按钮

**尺寸规格**：
- `default`: 标准尺寸 (h-10 px-4 py-2)
- `sm`: 小尺寸 (h-9 px-3)
- `lg`: 大尺寸 (h-11 px-8)
- `icon`: 图标按钮 (h-10 w-10)

#### 卡片 (Card)

**组成结构**：
- `Card`: 卡片容器
- `CardHeader`: 头部区域
- `CardTitle`: 标题文本
- `CardDescription`: 描述文本
- `CardContent`: 内容区域
- `CardFooter`: 底部区域

#### 输入框 (Input)

**类型支持**：
- `text`: 文本输入
- `password`: 密码输入
- `email`: 邮箱输入
- `number`: 数字输入
- `search`: 搜索输入

#### 选择器 (Select)

**组成结构**：
- `Select`: 选择器容器
- `SelectTrigger`: 触发按钮
- `SelectContent`: 下拉内容
- `SelectItem`: 选项条目
- `SelectSeparator`: 分隔线

### 复合组件

#### 数据表格 (Table)

**特性**：
- 响应式设计
- 排序功能
- 筛选功能
- 分页控制
- 行选择
- 自定义列宽

#### 导航菜单 (Navigation)

**类型**：
- 顶部导航
- 侧边栏导航
- 面包屑导航
- 标签页导航

#### 模态框 (Dialog)

**变体**：
- 信息展示
- 确认对话
- 表单输入
- 全屏弹窗

## 布局系统

### 栅格系统

基于 Tailwind CSS 的 12 列栅格系统：

```css
/* 断点定义 */
sm: 640px    /* 小屏幕 */
md: 768px    /* 中等屏幕 */
lg: 1024px   /* 大屏幕 */
xl: 1280px   /* 超大屏幕 */
2xl: 1536px  /* 超超大屏幕 */
```

### 容器规格

- **固定容器**: `max-w-7xl mx-auto px-4`
- **流体容器**: `w-full px-4`
- **内容区域**: `max-w-4xl mx-auto`

### 间距系统

基于 4px 基准的间距系统：

```css
/* 内边距 */
p-1: 4px     p-6: 24px
p-2: 8px     p-8: 32px
p-3: 12px    p-10: 40px
p-4: 16px    p-12: 48px
p-5: 20px    p-16: 64px

/* 外边距 */
m-1: 4px     m-6: 24px
m-2: 8px     m-8: 32px
m-3: 12px    m-10: 40px
m-4: 16px    m-12: 48px
m-5: 20px    m-16: 64px
```

## 交互规范

### 悬停状态

所有可交互元素都应提供明确的悬停反馈：

```css
.interactive-element:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
```

### 焦点状态

键盘导航和可访问性支持：

```css
.focusable:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

### 激活状态

点击反馈和状态指示：

```css
.clickable:active {
  transform: scale(0.98);
}
```

### 禁用状态

不可用元素的视觉处理：

```css
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

## 动画系统

### 过渡曲线

使用标准化的缓动函数：

```css
/* 标准过渡 */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);

/* 进入动画 */
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* 退出动画 */
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* 强调动画 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### 动画持续时间

```css
/* 快速过渡 - 适用于悬停状态 */
--duration-fast: 150ms;

/* 标准过渡 - 适用于大多数交互 */
--duration-normal: 300ms;

/* 慢速过渡 - 适用于复杂动画 */
--duration-slow: 500ms;
```

### 常用动画效果

#### 淡入淡出

```css
.fade-in {
  animation: fadeIn 0.3s var(--ease-standard);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### 滑动效果

```css
.slide-in {
  animation: slideIn 0.3s var(--ease-standard);
}

@keyframes slideIn {
  from { transform: translateY(-8px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

#### 缩放效果

```css
.scale-in {
  animation: scaleIn 0.2s var(--ease-standard);
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

## 技术实现

### CSS 变量系统

利用 CSS 自定义属性实现主题切换和样式复用：

```css
/* 定义变量 */
:root {
  --primary: 221.2 83.2% 53.3%;
}

/* 使用变量 */
.button-primary {
  background-color: hsl(var(--primary));
}
```

### Tailwind CSS 配置

```javascript
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
}
```

### 组件架构

基于组合式组件设计模式：

```tsx
// 基础组件
export const Card = ({ className, ...props }) => (
  <div className={cn("rounded-lg border bg-card", className)} {...props} />
);

// 复合组件
export const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);
```

### 类型系统

完整的 TypeScript 类型定义：

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

### 状态管理

使用 Context API 进行主题状态管理：

```tsx
const ThemeContext = createContext<{
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}>();
```

## 最佳实践

### 组件开发

1. **遵循单一职责原则**
2. **使用 forwardRef 支持 ref 传递**
3. **提供完整的 TypeScript 类型**
4. **支持 className 合并**
5. **包含适当的 aria 属性**

### 样式管理

1. **优先使用 Tailwind 实用类**
2. **复杂样式使用 CSS 变量**
3. **保持样式的一致性**
4. **避免内联样式**
5. **合理使用 CSS-in-JS**

### 性能优化

1. **使用 React.memo 优化重渲染**
2. **合理使用 useMemo 和 useCallback**
3. **避免不必要的状态更新**
4. **使用虚拟滚动处理大列表**
5. **合理的代码拆分策略**

## 维护指南

### 版本管理

- 遵循语义化版本控制
- 及时更新依赖包
- 保持向下兼容性

### 文档更新

- 组件 API 变更时同步更新文档
- 提供使用示例
- 记录破坏性变更

### 测试策略

- 单元测试覆盖核心组件
- 集成测试验证交互功能
- 视觉回归测试确保样式一致性

---

## 总结

Spec Workflow Dashboard 设计系统提供了一套完整的设计语言和技术实现方案，确保了产品的一致性、可维护性和用户体验。通过模块化的组件架构和灵活的主题系统，能够快速响应业务需求变化，为规格工作流管理提供强有力的技术支撑。