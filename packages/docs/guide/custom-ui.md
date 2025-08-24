# 自定义UI元素使用指南

本指南展示如何在VitePress文档中添加和使用自定义HTML+CSS元素。

## 🎨 可用的自定义元素

### 1. 直接HTML+CSS

直接在Markdown中添加HTML和CSS：

```markdown
<div class="feature-card">
  <h3>自定义标题</h3>
  <p>自定义内容描述</p>
</div>

<style>
.feature-card {
  padding: 2rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}
</style>
```

**效果展示：**

<div class="feature-card">
  <h3>🎯 示例卡片</h3>
  <p>这是一个直接在Markdown中定义的自定义卡片，具有渐变背景和圆角边框。</p>
</div>

<style>
.feature-card {
  padding: 2rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  margin: 1rem 0;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.4);
}
</style>

### 2. 使用预定义CSS类

利用全局CSS文件中的预定义样式类：

```markdown
<div class="tech-stack">TypeScript</div>
<div class="gradient-text">渐变文字效果</div>
<div class="pulse-dot"></div>
```

**效果展示：**

<div style="display: flex; gap: 1rem; align-items: center; margin: 1rem 0;">
  <span class="tech-stack">TypeScript</span>
  <span class="tech-stack">Vue 3</span>
  <span class="tech-stack">Vite</span>
</div>

<div class="gradient-text" style="font-size: 1.5rem; font-weight: 600;">
  这是渐变文字效果
</div>

<div style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0;">
  <span>实时状态：</span>
  <div class="pulse-dot"></div>
  <span>在线</span>
</div>

### 3. Vue组件

使用已注册的Vue组件：

#### StatsCounter组件

```markdown
<StatsCounter :stats="[
  { number: 100, label: '用户数', icon: 'UserIcon' },
  { number: 50, label: '项目', icon: 'DocumentIcon' }
]" />
```

#### Timeline组件

```markdown
<Timeline 
  title="项目进度" 
  :items="[
    {
      title: '需求分析',
      description: '完成项目需求分析和技术选型',
      date: '2024-01-01',
      status: 'completed',
      tags: ['需求', '分析']
    },
    {
      title: '开发阶段',
      description: '进行核心功能开发',
      date: '2024-01-15',
      status: 'in-progress',
      tags: ['开发', '编码']
    }
  ]"
/>
```

## 🛠️ 创建自定义组件

### 步骤1：创建Vue组件

在 `.vitepress/components/` 目录下创建新组件：

```vue
<!-- .vitepress/components/MyComponent.vue -->
<template>
  <div class="my-component">
    <h3>{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  title: String
})
</script>

<style scoped>
.my-component {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}
</style>
```

### 步骤2：注册组件

在 `.vitepress/theme/index.js` 中注册：

```javascript
import MyComponent from '../components/MyComponent.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MyComponent', MyComponent)
  }
}
```

### 步骤3：使用组件

在Markdown中使用：

```markdown
<MyComponent title="我的标题">
  这里是组件内容
</MyComponent>
```

## 🎯 高级自定义技巧

### 1. 响应式设计

```css
@media (max-width: 768px) {
  .my-element {
    flex-direction: column;
    padding: 1rem;
  }
}
```

### 2. 暗色模式适配

```css
.my-element {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.dark .my-element {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
```

### 3. 动画效果

```css
.animated-element {
  transition: all 0.3s ease;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 4. 交互式元素

```vue
<template>
  <div 
    class="interactive-card" 
    :class="{ active: isActive }"
    @click="toggle"
  >
    <h3>{{ title }}</h3>
    <p v-if="isActive">{{ description }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  description: String
})

const isActive = ref(false)

const toggle = () => {
  isActive.value = !isActive.value
}
</script>
```

## 🎨 样式最佳实践

### 1. 使用CSS变量

```css
:root {
  --custom-primary: #3b82f6;
  --custom-secondary: #8b5cf6;
  --custom-radius: 12px;
}

.my-element {
  background: var(--custom-primary);
  border-radius: var(--custom-radius);
}
```

### 2. 组件化设计

将常用样式抽象为可复用的组件或CSS类：

```css
/* 按钮系统 */
.btn-base {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary {
  @extend .btn-base;
  background: var(--custom-primary);
  color: white;
}

.btn-outline {
  @extend .btn-base;
  border: 1px solid var(--custom-primary);
  color: var(--custom-primary);
}
```

### 3. 性能优化

```css
/* 使用 transform 代替改变 position */
.optimized-hover {
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.optimized-hover:hover {
  transform: translateY(-5px);
}

/* 避免布局重排 */
.will-change {
  will-change: transform, opacity;
}
```

## 📱 移动端适配示例

<div class="mobile-demo">
  <div class="demo-card">
    <h4>桌面端显示</h4>
    <p>完整功能和布局</p>
  </div>
  <div class="demo-card mobile-hidden">
    <h4>仅桌面端</h4>
    <p>在移动端会隐藏</p>
  </div>
</div>

<style>
.mobile-demo {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.demo-card {
  flex: 1;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  text-align: center;
}

@media (max-width: 768px) {
  .mobile-demo {
    flex-direction: column;
  }
  
  .mobile-hidden {
    display: none;
  }
}
</style>

---

通过这些方法，你可以创建丰富多彩的自定义UI元素，让文档更加生动和吸引人。记住始终保持一致的设计风格和良好的用户体验！