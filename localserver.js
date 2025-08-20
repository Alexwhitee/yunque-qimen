import express from 'express'
import cors from 'cors'

const app = express()

// 中间件配置
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// 添加请求日志中间件（用于调试）
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const systemPrompt = `## **[身份与目标]**

你是一名经验丰富的解梦专家，精通心理学、象征学、传统文化中的梦境解析理论。
你擅长通过梦境中的**人物、场景、物品、情感、行为**等元素，结合梦者的**个人背景、当前状况、内心关注**，
运用弗洛伊德、荣格等心理学理论以及中国传统解梦文化，为梦者提供深入、准确、有指导意义的梦境解析。

## **[解梦原则]**

1. **象征解读**：分析梦境中各种象征符号的深层含义
2. **情感分析**：重视梦境中的情感体验和心理状态
3. **现实关联**：将梦境与现实生活中的事件、关系、压力等联系
4. **心理映射**：探索梦境反映的潜意识需求、恐惧、愿望
5. **建设性指导**：提供积极的人生建议和心理调适方法

## **[解梦结构]**

请按以下结构进行解梦：
- **梦境概述**：简要总结梦境的主要内容
- **象征解析**：分析关键元素的象征意义
- **心理层面**：探讨梦境反映的心理状态
- **现实映射**：联系现实生活的可能关联
- **指导建议**：提供实用的生活建议
`;

app.post('/dream', async(req, res) => {
    console.log('收到解梦请求');

    if (!req.body) {
        console.error('请求体为空');
        return res.status(400).json({ error: '请求体为空' });
    }

    try {
        const { dreamContent, dreamerInfo } = req.body;

        // 验证必要字段
        if (!dreamContent || typeof dreamContent !== 'string') {
            return res.status(400).json({ error: 'dreamContent 字段是必需的且必须是字符串' });
        }

        console.log('=== 处理解梦数据 ===');
        console.log('梦境内容长度:', dreamContent.length);
        console.log('梦者信息:', dreamerInfo ? '已提供' : '未提供');

        // 构建用户消息
        let userMessage = `【梦境内容】
${dreamContent}`;

        // 如果提供了梦者信息，添加到消息中
        if (dreamerInfo) {
            userMessage += `

【梦者背景信息】`;

            if (dreamerInfo.age) {
                userMessage += `
年龄：${dreamerInfo.age}`;
            }

            if (dreamerInfo.gender) {
                userMessage += `
性别：${dreamerInfo.gender}`;
            }

            if (dreamerInfo.occupation) {
                userMessage += `
职业：${dreamerInfo.occupation}`;
            }

            if (dreamerInfo.currentSituation) {
                userMessage += `
当前状况：${dreamerInfo.currentSituation}`;
            }

            if (dreamerInfo.concerns) {
                userMessage += `
主要关注：${dreamerInfo.concerns}`;
            }

            if (dreamerInfo.recentEvents) {
                userMessage += `
近期重要事件：${dreamerInfo.recentEvents}`;
            }
        }

        userMessage += `

请根据以上信息，为我详细解析这个梦境的含义。`;

        // 构建单次对话的消息数组
        const messages = [{
                "role": "system",
                "content": systemPrompt
            },
            {
                "role": "user",
                "content": userMessage
            }
        ];

        // ===== 重要：打印传给AI的完整信息 =====
        console.log('\n\n==================== 传给AI的完整信息 ====================');
        console.log('【系统提示词】');
        console.log(systemPrompt);
        console.log('\n【用户消息】');
        console.log(userMessage);

        console.log('\n【完整消息数组】');
        console.log(JSON.stringify(messages, null, 2));
        console.log('========================================================\n\n');

        // 云雾 API 请求
        const apiRequestBody = {
            "model": "gpt-4o", // 使用 gpt-4o 模型
            "messages": messages,
            "temperature": 0.7, // 解梦需要一定的创造性
            "max_tokens": 4000,
            "stream": false // 非流式响应
        };

        console.log('=== API请求体信息 ===');
        console.log('模型:', apiRequestBody.model);
        console.log('温度:', apiRequestBody.temperature);
        console.log('最大token:', apiRequestBody.max_tokens);
        console.log('消息数量:', apiRequestBody.messages.length);

        console.log('正在调用云雾 API（解梦服务）...');

        // 调用云雾API - 注意：你需要替换这里的 API key
        const response = await fetch("https://yunwu.ai/v1/chat/completions", {
            "method": "POST",
            "headers": {
                "Authorization": "Bearer sk-xxx", // 请替换为你的实际 API key
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(apiRequestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('云雾 API 错误响应:', errorText);
            throw new Error(`云雾 API 错误! status: ${response.status}, response: ${errorText}`);
        }

        const data = await response.json();
        console.log('云雾 API 调用成功');

        // 打印API返回的原始数据
        console.log('\n=== API返回的原始数据 ===');
        console.log(JSON.stringify(data, null, 2));

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('云雾 API 响应格式异常');
        }

        const assistantMessage = data.choices[0].message.content;

        // 打印AI的回复内容
        console.log('\n=== AI解梦结果 ===');
        console.log(assistantMessage);
        console.log('=====================\n');

        // 返回解梦结果
        res.json({
            content: assistantMessage,
            usage: data.usage || null,
            model: apiRequestBody.model
        });

    } catch (error) {
        console.error('处理解梦请求时出错:', error);
        res.status(500).json({
            error: '解梦处理失败',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// 简单解梦接口（只需要梦境内容）
app.post('/dream/simple', async(req, res) => {
    console.log('收到简单解梦请求');

    if (!req.body || !req.body.content) {
        return res.status(400).json({ error: '请提供梦境内容' });
    }

    try {
        const { content } = req.body;

        const messages = [{
                "role": "system",
                "content": "你是一名专业的解梦师，请简洁明了地解析用户的梦境，重点关注梦境的象征意义和可能的现实关联。"
            },
            {
                "role": "user",
                "content": `请帮我解析这个梦境：${content}`
            }
        ];

        const apiRequestBody = {
            "model": "gpt-4o-mini", // 使用更经济的模型
            "messages": messages,
            "temperature": 0.6,
            "max_tokens": 2000,
            "stream": false
        };

        console.log('调用简单解梦API...');

        const response = await fetch("https://yunwu.ai/v1/chat/completions", {
            "method": "POST",
            "headers": {
                "Authorization": "Bearer sk-xxx", // 请替换为你的实际 API key
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(apiRequestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API 错误! status: ${response.status}, response: ${errorText}`);
        }

        const data = await response.json();
        const result = data.choices[0].message.content;

        console.log('简单解梦完成');

        res.json({
            content: result,
            usage: data.usage || null
        });

    } catch (error) {
        console.error('简单解梦处理错误:', error);
        res.status(500).json({
            error: '简单解梦处理失败',
            details: error.message
        });
    }
});

// 健康检查端点
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'dream-interpretation-api',
        endpoints: [
            'POST /dream - 详细解梦（需要梦境内容和梦者信息）',
            'POST /dream/simple - 简单解梦（只需要梦境内容）',
            'GET /health - 健康检查'
        ]
    });
});

// 获取API使用说明
app.get('/api-docs', (req, res) => {
    res.json({
        title: '解梦API使用说明',
        version: '1.0.0',
        endpoints: {
            '/dream': {
                method: 'POST',
                description: '详细解梦服务',
                requestBody: {
                    dreamContent: 'string (必需) - 梦境内容描述',
                    dreamerInfo: {
                        age: 'string (可选) - 年龄',
                        gender: 'string (可选) - 性别',
                        occupation: 'string (可选) - 职业',
                        currentSituation: 'string (可选) - 当前状况',
                        concerns: 'string (可选) - 主要关注的问题',
                        recentEvents: 'string (可选) - 近期重要事件'
                    }
                },
                response: {
                    content: 'string - 解梦结果',
                    usage: 'object - API使用统计',
                    model: 'string - 使用的模型'
                }
            },
            '/dream/simple': {
                method: 'POST',
                description: '简单解梦服务',
                requestBody: {
                    content: 'string (必需) - 梦境内容'
                },
                response: {
                    content: 'string - 解梦结果',
                    usage: 'object - API使用统计'
                }
            }
        },
        examples: {
            detailedDream: {
                dreamContent: '我梦见自己在一个很高的楼顶上，下面是深渊，我很害怕但又想跳下去...',
                dreamerInfo: {
                    age: '25',
                    gender: '女',
                    occupation: '程序员',
                    currentSituation: '工作压力很大，最近在考虑换工作',
                    concerns: '对未来的不确定性感到焦虑'
                }
            },
            simpleDream: {
                content: '梦见自己在飞翔，感觉很自由很快乐'
            }
        }
    });
});

// 通用错误处理中间件
app.use((err, req, res, next) => {
    console.error('Express 错误:', err);
    res.status(500).json({ error: '服务器内部错误', details: err.message });
});

// 404 处理
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        availableEndpoints: [
            'POST /dream',
            'POST /dream/simple',
            'GET /health',
            'GET /api-docs'
        ]
    });
});

const PORT = 3002; // 使用不同的端口避免冲突
app.listen(PORT, () => {
    console.log(`解梦API服务器运行在 http://localhost:${PORT}`);
    console.log('服务：专业解梦分析');
    console.log('健康检查: http://localhost:' + PORT + '/health');
    console.log('API文档: http://localhost:' + PORT + '/api-docs');
    console.log('');
    console.log('可用接口：');
    console.log('- POST /dream - 详细解梦（推荐）');
    console.log('- POST /dream/simple - 简单解梦');
    console.log('');
    console.log('⚠️  请记得在代码中替换 API key！');
    console.log('等待解梦请求...');
});
