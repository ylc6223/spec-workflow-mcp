# Dashboard Backend

这个包包含 Spec Workflow 仪表盘的后端服务。

## 功能

- **仪表盘服务器**：提供 Web 界面服务
- **文件监控**：监控规范文件变化
- **审批存储**：管理审批请求
- **规范解析**：解析规范文档

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

### DashboardServer

提供仪表盘服务：

```typescript
// 创建仪表盘服务器
const server = new DashboardServer({
  projectPath: '/path/to/project',
  autoOpen: true,
  port: 3000
});

// 启动服务器
const url = await server.start();

// 停止服务器
await server.stop();
```

### SpecWatcher

监控规范文件变化：

```typescript
// 创建监控器
const watcher = new SpecWatcher(projectPath, parser);

// 启动监控
await watcher.start();

// 停止监控
await watcher.stop();

// 监听变化事件
watcher.on('change', (event) => {
  // 处理变化
});