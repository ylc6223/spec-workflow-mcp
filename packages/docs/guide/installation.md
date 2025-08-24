# 安装指南

SpecFlow MCP 提供多种安装方式，满足不同使用场景的需求。

## 🚀 快速安装

### 方式一：NPM 全局安装（推荐）

```bash
# 安装SpecFlow MCP服务器
npm install -g @specflow/spec-workflow-mcp

# 验证安装
specflow-mcp --version
```

### 方式二：本地项目安装

```bash
# 在项目中安装
npm install @specflow/spec-workflow-mcp

# 使用 npx 运行
npx specflow-mcp start
```

## 🔧 环境要求

### 系统要求
- **Node.js**: 18.0.0 或更高版本
- **操作系统**: Windows, macOS, Linux
- **内存**: 建议 2GB 以上

### 依赖检查

```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本  
npm --version
```

## ⚡ 启动服务

### 基础启动

```bash
# 启动 MCP 服务器
specflow-mcp start

# 指定端口启动
specflow-mcp start --port 3000
```

### 启动完整功能

```bash
# 启动包含Web仪表盘
specflow-mcp start --with-dashboard

# 自动打开浏览器
specflow-mcp start --with-dashboard --auto-open
```

## 🔗 Claude 集成配置

### 1. 配置 Claude Desktop

在 Claude Desktop 的 MCP 配置文件中添加：

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "specflow": {
      "command": "specflow-mcp",
      "args": ["start"],
      "env": {
        "SPECFLOW_PROJECT_ROOT": "/path/to/your/project"
      }
    }
  }
}
```

### 2. 环境变量配置

```bash
# 设置项目根目录
export SPECFLOW_PROJECT_ROOT="/path/to/your/project"

# 设置仪表盘端口（可选）
export SPECFLOW_DASHBOARD_PORT="3000"

# 启用调试模式（可选）
export SPECFLOW_DEBUG="true"
```

## 📱 VSCode 扩展安装

### 从 Marketplace 安装

1. 打开 VSCode
2. 按 `Ctrl+Shift+X` 打开扩展市场
3. 搜索 "SpecFlow MCP"
4. 点击安装

### 手动安装

```bash
# 下载并安装 .vsix 文件
code --install-extension specflow-mcp-x.x.x.vsix
```

## 🏗️ 开发环境安装

如需参与开发或自定义功能：

```bash
# 克隆仓库
git clone https://github.com/your-username/specflow-mcp.git

# 进入目录
cd specflow-mcp

# 安装依赖
pnpm install

# 构建项目
pnpm build

# 启动开发模式
pnpm dev
```

## 🔍 验证安装

### 检查服务状态

```bash
# 检查服务是否运行
curl http://localhost:3000/api/health

# 查看日志
specflow-mcp logs
```

### 测试 MCP 连接

在 Claude 中输入：
```
请列出当前可用的 MCP 工具
```

如果看到 SpecFlow 相关工具，说明安装成功。

## ⚠️ 常见问题

### 端口冲突
```bash
# 查看端口占用
lsof -i :3000

# 使用其他端口
specflow-mcp start --port 3001
```

### 权限问题
```bash
# macOS/Linux 权限问题
sudo npm install -g @specflow/spec-workflow-mcp

# 或使用 nvm 管理 Node.js
nvm use 18
```

### Node.js 版本问题
```bash
# 升级 Node.js 到支持版本
nvm install 18
nvm use 18
```

## 🔄 更新升级

```bash
# 检查当前版本
specflow-mcp --version

# 更新到最新版本
npm update -g @specflow/spec-workflow-mcp

# 重启服务
specflow-mcp restart
```

## 🗑️ 卸载

```bash
# 卸载全局安装
npm uninstall -g @specflow/spec-workflow-mcp

# 清理配置文件（可选）
rm ~/.specflow/config.json
```

## 📞 获取帮助

如果遇到安装问题：

1. 查看 [故障排除指南](/guide/troubleshooting)
2. 提交 [GitHub Issue](https://github.com/your-username/specflow-mcp/issues)
3. 加入 [Discord 社区](https://discord.gg/specflow)

---

安装完成后，建议阅读 [快速开始指南](/guide/quick-start) 了解基本使用方法。