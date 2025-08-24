# Spec Workflow MCP

这个包是 Spec Workflow 的主入口，提供 MCP (Model Context Protocol) 服务器功能。

## 功能

- **MCP 服务器**：实现 Model Context Protocol 服务
- **命令行界面**：提供命令行工具
- **仪表盘集成**：与仪表盘服务集成

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

## 使用方法

### 命令行

```bash
# 启动 MCP 服务器
spec-workflow-mcp

# 启动 MCP 服务器并自动打开仪表盘
spec-workflow-mcp --AutoStartDashboard

# 指定项目路径
spec-workflow-mcp ~/projects/my-app

# 仅启动仪表盘
spec-workflow-mcp --dashboard

# 指定端口
spec-workflow-mcp --AutoStartDashboard --port 3000
```

### API

```typescript
// 创建 MCP 服务器
const server = new SpecWorkflowMCPServer();

// 初始化服务器
await server.initialize(projectPath, {
  autoStart: true,
  port: 3000
});

// 启动仪表盘监控
server.startDashboardMonitoring();

// 停止服务器
await server.stop();