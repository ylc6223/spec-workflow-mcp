# Spec Workflow Core

这个包包含 Spec Workflow MCP 的核心功能模块。

## 功能

- **路径工具**：提供项目路径管理功能
- **会话管理**：管理仪表盘会话
- **任务解析**：解析和管理任务
- **归档服务**：管理规范文档的归档和恢复

## 安装

```bash
pnpm install
```

## 构建

```bash
pnpm build
```

## 测试

```bash
pnpm test
```

## API

### PathUtils

提供路径管理功能：

```typescript
// 获取工作流根目录
PathUtils.getWorkflowRoot(projectPath: string): string

// 获取规范路径
PathUtils.getSpecPath(projectPath: string, specName: string): string

// 获取归档规范路径
PathUtils.getArchiveSpecPath(projectPath: string, specName: string): string
```

### SessionManager

管理仪表盘会话：

```typescript
// 创建会话
sessionManager.createSession(dashboardUrl: string): Promise<void>

// 获取仪表盘 URL
sessionManager.getDashboardUrl(): Promise<string | undefined>
```

### TaskParser

解析和管理任务：

```typescript
// 从 Markdown 解析任务
parseTasksFromMarkdown(content: string): TaskParserResult

// 更新任务状态
updateTaskStatus(content: string, taskId: string, newStatus: 'pending' | 'in-progress' | 'completed'): string