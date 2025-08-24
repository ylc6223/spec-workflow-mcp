# Spec Workflow MCP 示例项目

这是一个简单的示例项目，展示如何使用 Spec Workflow MCP 进行规范驱动的开发。

## 项目结构

```
simple-project/
├── README.md                 # 项目说明
├── spec/                     # 规范文档目录
│   ├── requirements.md       # 需求规范
│   ├── design.md             # 设计规范
│   └── tasks.md              # 任务列表
└── src/                      # 源代码目录
    └── index.js              # 入口文件
```

## 使用方法

1. 启动 Spec Workflow MCP 服务器：

```bash
cd ../..  # 返回到项目根目录
pnpm start -- --workingDir examples/simple-project
```

2. 打开浏览器访问仪表盘：http://localhost:3000

3. 在仪表盘中查看和管理规范文档、任务和进度。

## 开发流程

1. 编辑 `spec/requirements.md` 文件，定义项目需求
2. 使用 MCP 生成设计规范和任务列表
3. 按照任务列表进行开发
4. 使用 MCP 跟踪开发进度和规范遵循情况