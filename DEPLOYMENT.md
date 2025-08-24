# 部署指南 - SPEC Workflow MCP Documentation

本指南描述如何将VitePress文档部署到Vercel。

## 📋 准备工作

### 1. 推送代码到GitHub
确保代码已推送到你的GitHub仓库：
```bash
git add .
git commit -m "feat: add Vercel deployment configuration"
git push origin main
```

### 2. 安装Vercel CLI (可选)
如果要使用脚本部署，需要安装Vercel CLI：
```bash
npm install -g vercel
```

## 🚀 部署方式

### 方式1: Vercel Dashboard (推荐)

1. **登录Vercel Dashboard**
   - 访问 https://vercel.com
   - 使用GitHub账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的GitHub仓库
   - 点击 "Import"

3. **配置项目设置**
   - **Project Name**: `spec-workflow-mcp-docs`
   - **Framework Preset**: `Other` (不要选择VitePress预设)
   - **Root Directory**: `.` (保持默认)
   - **Build Command**: `cd packages/docs && pnpm install && pnpm build`
   - **Output Directory**: `packages/docs/.vitepress/dist`
   - **Install Command**: `pnpm install`

4. **环境变量设置**
   - `NODE_VERSION`: `18`

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建和部署完成

### 方式2: 命令行部署

使用项目提供的部署脚本：

```bash
# 构建并部署到预览环境
pnpm deploy

# 构建并部署到生产环境  
pnpm deploy:prod

# 只构建，不部署
pnpm deploy:build-only

# 显示帮助信息
node scripts/deploy.js --help
```

### 方式3: 自动部署

推送代码后，Vercel会自动部署：
- **主分支 (main)**: 自动部署到生产环境
- **其他分支**: 自动部署到预览环境

## 📁 项目结构

```
spec-workflow-mcp/
├── packages/docs/                 # VitePress文档源码
│   ├── .vitepress/
│   │   ├── config.js              # VitePress配置
│   │   ├── components/            # Vue组件
│   │   │   └── Intro-Visual.vue   # 主要可视化组件
│   │   └── dist/                  # 构建输出(自动生成)
│   ├── guide/                     # 指南文档
│   ├── api/                       # API文档
│   └── index.md                   # 首页
├── vercel.json                    # Vercel配置文件
├── .vercelignore                  # Vercel忽略文件
├── scripts/deploy.js              # 部署脚本
└── DEPLOYMENT.md                  # 本文档
```

## 🔧 配置文件说明

### vercel.json
```json
{
  "buildCommand": "cd packages/docs && pnpm install && pnpm build",
  "outputDirectory": "packages/docs/.vitepress/dist",
  "installCommand": "pnpm install"
}
```

### .vercelignore
过滤不必要的文件，优化部署速度：
- 排除源码目录
- 排除测试文件
- 排除大型媒体文件
- 保留文档构建输出

## 🔍 故障排除

### 常见问题

1. **构建失败: "command not found: pnpm"**
   - 解决：在Vercel项目设置中添加环境变量 `ENABLE_EXPERIMENTAL_COREPACK=1`

2. **构建失败: "No such file or directory"**
   - 检查 `buildCommand` 中的路径是否正确
   - 确认 `packages/docs` 目录存在

3. **页面显示404**
   - 检查 `outputDirectory` 设置是否正确
   - 确认构建输出目录为 `packages/docs/.vitepress/dist`

4. **静态资源加载失败**
   - 检查 `base` 配置（如果使用子路径部署）
   - 确认静态资源路径正确

### 调试步骤

1. **本地测试构建**
   ```bash
   cd packages/docs
   pnpm install
   pnpm build
   pnpm preview
   ```

2. **检查构建输出**
   ```bash
   ls -la packages/docs/.vitepress/dist/
   ```

3. **查看Vercel构建日志**
   - 在Vercel Dashboard中查看详细的构建和部署日志

## 📝 更新文档

1. **修改文档内容**
   - 编辑 `packages/docs/` 目录下的Markdown文件
   - 修改Vue组件 `packages/docs/.vitepress/components/`

2. **本地预览**
   ```bash
   pnpm dev:docs
   ```

3. **推送更改**
   ```bash
   git add .
   git commit -m "docs: update documentation"
   git push origin main
   ```

4. **自动部署**
   - Vercel会自动检测推送并重新部署

## 🎯 性能优化

- ✅ 静态资源缓存 (1年)
- ✅ 构建输出优化
- ✅ 不必要文件过滤
- ✅ CDN加速分发

---

**提示**: 首次部署后，记录下Vercel分配的域名，可以在项目设置中配置自定义域名。