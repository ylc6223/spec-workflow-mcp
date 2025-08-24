# SpecFlow MCP Monorepo

AI规范驱动开发平台 - 构建AI敏捷开发闭环，让每一行代码都有据可循。

## 项目结构

本项目采用 monorepo 结构，包含以下子包：

- `packages/core`: 核心功能模块，包含路径工具、会话管理、任务解析等
- `packages/dashboard-backend`: 仪表盘后端服务
- `packages/dashboard-frontend`: 仪表盘前端界面
- `packages/spec-workflow-mcp`: 主包，MCP 服务器入口
- `packages/vscode-extension`: VS Code 扩展

## 安装

```bash
# 安装依赖
pnpm install
```

## 构建

```bash
# 构建所有包
pnpm build

# 构建特定包
pnpm build:core
pnpm build:backend
pnpm build:frontend
pnpm build:mcp
pnpm build:extension
```

## 开发

```bash
# 启动开发模式
pnpm dev

# 启动仪表盘开发模式
pnpm dev:dashboard
```

## 运行

```bash
# 启动 MCP 服务器
pnpm start
```

## 许可证

GPL-3.0