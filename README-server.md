# 解梦API本地服务器

这是一个基于Express.js的本地解梦API服务器，使用云雾AI进行梦境解析。

## 🚀 快速开始

### 1. 安装依赖

```bash
# 使用提供的package.json安装依赖
cp package-server.json package.json
npm install
```

或者直接安装所需依赖：

```bash
npm install express cors
```

### 2. 配置API Key

在 `localserver.js` 文件中找到以下行并替换为你的实际API key：

```javascript
"Authorization": "Bearer sk-xxxx", // 请替换为你的实际 API key
```

需要替换的位置有两处：
- `/dream` 接口（第112行）
- `/dream/simple` 接口（第206行）

### 3. 启动服务器

```bash
# 启动服务器
node localserver.js

# 或者使用开发模式（自动重启）
npm run dev
```

服务器将在 `http://localhost:3002` 启动。

## 📡 API接口

### 健康检查
```
GET /health
```

### API文档
```
GET /api-docs
```

### 详细解梦（推荐）
```
POST /dream
Content-Type: application/json

{
  "dreamContent": "梦境内容描述",
  "dreamerInfo": {
    "age": "年龄",
    "gender": "性别",
    "occupation": "职业",
    "currentSituation": "当前状况",
    "concerns": "主要关注的问题",
    "recentEvents": "近期重要事件"
  }
}
```

### 简单解梦
```
POST /dream/simple
Content-Type: application/json

{
  "content": "梦境内容"
}
```

## 🧪 测试API

运行测试脚本：

```bash
node test-dream-api.js
```

## 📝 使用示例

### 详细解梦示例

```javascript
const response = await fetch('http://localhost:3002/dream', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    dreamContent: '我梦见自己站在一座很高的山顶上，周围云雾缭绕。突然出现了一只金色的鸟，它对我说话，告诉我要勇敢地面对即将到来的挑战。',
    dreamerInfo: {
      age: '28',
      gender: '女',
      occupation: '设计师',
      currentSituation: '正在考虑创业，但对未来充满不确定性',
      concerns: '担心创业失败，害怕离开舒适圈',
      recentEvents: '最近辞职了，准备开始自己的设计工作室'
    }
  })
});

const result = await response.json();
console.log(result.content); // 解梦结果
```

### 简单解梦示例

```javascript
const response = await fetch('http://localhost:3002/dream/simple', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: '梦见自己在飞翔，感觉很自由很快乐'
  })
});

const result = await response.json();
console.log(result.content); // 解梦结果
```

## 🔧 配置说明

### 模型选择
- 详细解梦使用 `gpt-4o` 模型，提供更深入的分析
- 简单解梦使用 `gpt-4o-mini` 模型，更经济实用

### 参数调整
可以在 `localserver.js` 中调整以下参数：
- `temperature`: 控制回答的创造性（0-2之间）
- `max_tokens`: 控制回答的最大长度
- `PORT`: 服务器端口（默认3002）

## 🚨 注意事项

1. **API Key安全**: 不要将包含真实API key的代码提交到公共代码库
2. **网络连接**: 确保能够访问 `https://yunwu.ai/v1/chat/completions`
3. **端口冲突**: 如果3002端口被占用，可以修改 `PORT` 变量
4. **依赖版本**: 确保Node.js版本支持ES模块（Node.js 14+）

## 📊 响应格式

### 成功响应
```json
{
  "content": "解梦结果内容...",
  "usage": {
    "prompt_tokens": 123,
    "completion_tokens": 456,
    "total_tokens": 579
  },
  "model": "gpt-4o"
}
```

### 错误响应
```json
{
  "error": "错误描述",
  "details": "详细错误信息"
}
```

## 🔍 调试

服务器会在控制台输出详细的调试信息，包括：
- 请求接收日志
- 传给AI的完整消息
- API响应数据
- 错误信息

## 📚 扩展功能

你可以根据需要扩展以下功能：
- 添加用户认证
- 实现会话管理
- 添加解梦历史记录
- 集成数据库存储
- 添加更多解梦风格（如周公解梦、西方心理学等）

## 🤝 支持

如果遇到问题，请检查：
1. API key是否正确配置
2. 网络连接是否正常
3. 依赖是否正确安装
4. Node.js版本是否兼容

---

**祝你使用愉快！** 🌟
