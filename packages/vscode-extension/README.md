# VS Code Extension for Spec Workflow

这个包包含 Spec Workflow 的 VS Code 扩展。

## 功能

- **规范管理**：直接在 VS Code 中管理规范文档
- **任务跟踪**：跟踪和更新任务状态
- **审批流程**：处理审批请求
- **仪表盘集成**：启动和连接到仪表盘

## 安装

```bash
pnpm install
```

## 构建

```bash
pnpm build
```

## 开发

```bash
pnpm dev
```

## 使用方法

1. 在 VS Code 中安装扩展
2. 打开包含 Spec Workflow 项目的文件夹
3. 使用命令面板 (`Ctrl+Shift+P` 或 `Cmd+Shift+P`) 访问 Spec Workflow 命令
4. 使用侧边栏图标访问 Spec Workflow 面板

## 命令

- `Spec Workflow: 启动仪表盘` - 启动仪表盘服务器
- `Spec Workflow: 创建新规范` - 创建新的规范文档
- `Spec Workflow: 查看任务` - 查看和管理任务
- `Spec Workflow: 处理审批` - 处理待审批的请求