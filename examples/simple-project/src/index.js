// 待办事项管理应用入口文件

// 导入依赖
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 创建 Express 应用
const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 数据库连接
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app')
  .then(() => console.log('MongoDB 连接成功'))
  .catch(err => console.error('MongoDB 连接失败:', err));

// 定义待办事项模型
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  category: { type: String },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todo', todoSchema);

// API 路由
const router = express.Router();

// 获取所有待办事项
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取单个待办事项
router.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: '待办事项未找到' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 创建待办事项
router.post('/todos', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    dueDate: req.body.dueDate
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新待办事项
router.put('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: '待办事项未找到' });
    
    if (req.body.title) todo.title = req.body.title;
    if (req.body.description) todo.description = req.body.description;
    if (req.body.status) todo.status = req.body.status;
    if (req.body.category) todo.category = req.body.category;
    if (req.body.dueDate) todo.dueDate = req.body.dueDate;
    todo.updatedAt = Date.now();
    
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除待办事项
router.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: '待办事项未找到' });
    
    await todo.remove();
    res.json({ message: '待办事项已删除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 使用路由
app.use('/api', router);

// 前端静态文件（生产环境）
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});