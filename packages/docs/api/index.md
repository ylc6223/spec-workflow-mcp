# API 文档概览

SpecFlow MCP 提供完整的API体系，包括MCP工具、REST API和WebSocket接口，满足不同场景的集成需求。

## 📋 API 分类

### 🔧 MCP 工具 API
与AI工具（如Claude）通过Model Context Protocol交互的核心接口。

| 工具名称 | 功能描述 | 文档链接 |
|---------|---------|----------|
| `create_spec` | 创建新的规范文档 | [详细文档](/api/mcp-tools#create-spec) |
| `list_specs` | 列出所有规范 | [详细文档](/api/mcp-tools#list-specs) |
| `get_spec` | 获取指定规范详情 | [详细文档](/api/mcp-tools#get-spec) |
| `update_task_status` | 更新任务状态 | [详细文档](/api/mcp-tools#update-task-status) |
| `get_spec_progress` | 获取规范进度 | [详细文档](/api/mcp-tools#get-spec-progress) |
| `validate_spec` | 验证规范完整性 | [详细文档](/api/mcp-tools#validate-spec) |

### 🌐 REST API
Web仪表盘和第三方集成使用的HTTP接口。

| 分类 | 端点数量 | 文档链接 |
|-----|----------|----------|
| 规范管理 | 8个端点 | [规范API](/api/core#specs) |
| 任务管理 | 6个端点 | [任务API](/api/core#tasks) |
| 统计分析 | 4个端点 | [统计API](/api/core#stats) |
| 系统管理 | 3个端点 | [系统API](/api/core#system) |

### 🔌 WebSocket API
实时数据推送和双向通信接口。

| 事件类型 | 描述 | 文档链接 |
|---------|-----|----------|
| `spec_created` | 新规范创建通知 | [WebSocket API](/api/websocket) |
| `task_updated` | 任务状态变更通知 | [WebSocket API](/api/websocket) |
| `progress_changed` | 进度变更推送 | [WebSocket API](/api/websocket) |

## 🚀 快速开始

### MCP工具使用示例

在Claude中使用MCP工具：

```markdown
# 创建新规范
请使用create_spec工具创建一个名为"user-profile"的用户功能规范

# 查看所有规范  
使用list_specs工具显示我的所有规范

# 更新任务状态
将"实现用户注册"任务标记为已完成
```

### REST API调用示例

```bash
# 获取所有规范
curl -X GET "http://localhost:3000/api/specs" \
  -H "Content-Type: application/json"

# 创建新规范
curl -X POST "http://localhost:3000/api/specs" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "payment-system",
    "type": "service",
    "description": "支付系统核心功能"
  }'

# 更新任务状态
curl -X PATCH "http://localhost:3000/api/tasks/123" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "actualHours": 4
  }'
```

### WebSocket连接示例

```javascript
// 建立WebSocket连接
const ws = new WebSocket('ws://localhost:3000/ws');

// 监听规范创建事件
ws.on('message', (data) => {
  const event = JSON.parse(data);
  if (event.type === 'spec_created') {
    console.log('新规范创建：', event.spec);
  }
});

// 订阅特定规范的更新
ws.send(JSON.stringify({
  type: 'subscribe',
  specId: 'user-auth-123'
}));
```

## 📊 数据格式

### 标准响应格式

```json
{
  "success": true,
  "data": {
    // 具体数据内容
  },
  "message": "操作成功",
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req-123456"
}
```

### 错误响应格式

```json
{
  "success": false,
  "error": {
    "code": "SPEC_NOT_FOUND",
    "message": "指定的规范不存在",
    "details": {
      "specId": "non-existent-spec"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req-123456"
}
```

## 🔐 认证授权

### API密钥认证

```bash
# 在请求头中携带API密钥
curl -X GET "http://localhost:3000/api/specs" \
  -H "X-API-Key: your-api-key-here"
```

### JWT Token认证

```bash
# 获取访问令牌
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }'

# 使用令牌访问API
curl -X GET "http://localhost:3000/api/specs" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

## 📝 数据模型

### 核心实体类型

#### 规范 (Spec)
```typescript
interface Spec {
  id: string;                    // 规范唯一标识
  name: string;                  // 规范名称
  type: 'feature' | 'service' | 'component'; // 规范类型
  status: 'draft' | 'review' | 'approved' | 'implemented'; // 状态
  description?: string;          // 规范描述
  requirements: Requirement[];   // 需求列表
  design?: Design;              // 设计文档
  tasks: Task[];                // 任务列表
  progress: SpecProgress;       // 进度信息
  metadata: SpecMetadata;       // 元数据
  createdAt: string;            // 创建时间
  updatedAt: string;            // 更新时间
}
```

#### 任务 (Task)
```typescript
interface Task {
  id: string;                   // 任务唯一标识
  specId: string;              // 所属规范ID
  title: string;               // 任务标题
  description?: string;        // 任务描述
  type: 'frontend' | 'backend' | 'database' | 'testing'; // 任务类型
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'; // 状态
  priority: 'low' | 'medium' | 'high' | 'critical'; // 优先级
  assignee?: string;           // 指派人
  estimatedHours?: number;     // 预估工时
  actualHours?: number;        // 实际工时
  dependencies: string[];      // 依赖任务ID列表
  tags: string[];             // 标签
  createdAt: string;          // 创建时间
  updatedAt: string;          // 更新时间
}
```

#### 进度 (Progress)
```typescript
interface SpecProgress {
  total: number;              // 总任务数
  completed: number;          // 已完成任务数
  inProgress: number;         // 进行中任务数
  pending: number;            // 待处理任务数
  blocked: number;            // 阻塞任务数
  percentage: number;         // 完成百分比
  estimatedCompletion?: string; // 预计完成时间
}
```

## 🔄 状态码说明

### HTTP状态码

| 状态码 | 含义 | 使用场景 |
|-------|------|----------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未授权访问 |
| 403 | Forbidden | 权限不足 |
| 404 | Not Found | 资源不存在 |
| 409 | Conflict | 资源冲突 |
| 500 | Internal Server Error | 服务器内部错误 |

### 业务错误码

| 错误码 | 含义 | 解决方案 |
|-------|------|----------|
| `SPEC_NOT_FOUND` | 规范不存在 | 检查规范ID是否正确 |
| `TASK_NOT_FOUND` | 任务不存在 | 检查任务ID是否正确 |
| `INVALID_STATUS` | 状态值无效 | 使用正确的状态枚举值 |
| `DEPENDENCY_CYCLE` | 依赖循环 | 检查任务依赖关系 |
| `STORAGE_ERROR` | 存储错误 | 检查文件权限和磁盘空间 |

## 🔧 配置选项

### API配置

```json
{
  "api": {
    "port": 3000,
    "cors": {
      "origin": ["http://localhost:3000"],
      "credentials": true
    },
    "rateLimit": {
      "windowMs": 60000,
      "max": 100
    },
    "auth": {
      "type": "jwt",
      "secret": "your-secret-key",
      "expiresIn": "24h"
    }
  }
}
```

## 📈 性能指标

### API性能基准

| 操作类型 | 平均响应时间 | QPS | 备注 |
|---------|-------------|-----|------|
| 获取规范列表 | < 50ms | 200+ | 包含缓存优化 |
| 创建规范 | < 100ms | 50+ | 涉及文件写入 |
| 更新任务状态 | < 30ms | 300+ | 纯内存操作 |
| 复杂查询 | < 200ms | 100+ | 包含关联数据 |

## 📚 更多资源

- **[MCP工具详细文档](/api/mcp-tools)** - 所有MCP工具的完整参数说明
- **[核心API参考](/api/core)** - REST API的详细接口文档  
- **[WebSocket指南](/api/websocket)** - 实时通信接口使用指南
- **[SDK和客户端库](/api/sdks)** - 各种编程语言的SDK
- **[API变更日志](/api/changelog)** - API版本更新记录

---

通过这些API，您可以构建强大的AI规范驱动开发工作流，实现与SpecFlow MCP的深度集成。