FROM node:18-alpine

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-workspace.yaml
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# 复制所有子包的 package.json
COPY packages/core/package.json ./packages/core/
COPY packages/dashboard-backend/package.json ./packages/dashboard-backend/
COPY packages/dashboard-frontend/package.json ./packages/dashboard-frontend/
COPY packages/spec-workflow-mcp/package.json ./packages/spec-workflow-mcp/
COPY packages/vscode-extension/package.json ./packages/vscode-extension/

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 构建项目
RUN pnpm build

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["pnpm", "start"]