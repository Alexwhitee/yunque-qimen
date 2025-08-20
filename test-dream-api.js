// 解梦API测试文件
// 使用方法: node test-dream-api.js

const testDreamAPI = async() => {
    const baseURL = 'http://localhost:3002';

    console.log('🧪 开始测试解梦API...\n');

    // 测试1: 健康检查
    console.log('1️⃣ 测试健康检查...');
    try {
        const healthResponse = await fetch(`${baseURL}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ 健康检查通过:', healthData.status);
    } catch (error) {
        console.log('❌ 健康检查失败:', error.message);
        return;
    }

    // 测试2: 简单解梦
    console.log('\n2️⃣ 测试简单解梦...');
    try {
        const simpleDreamResponse = await fetch(`${baseURL}/dream/simple`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: '我梦见自己在天空中飞翔，感觉很自由很快乐，下面是美丽的山川河流。'
            })
        });

        const simpleDreamData = await simpleDreamResponse.json();
        if (simpleDreamResponse.ok) {
            console.log('✅ 简单解梦成功');
            console.log('📝 解梦结果:', simpleDreamData.content.substring(0, 100) + '...');
        } else {
            console.log('❌ 简单解梦失败:', simpleDreamData.error);
        }
    } catch (error) {
        console.log('❌ 简单解梦请求失败:', error.message);
    }

    // 测试3: 详细解梦
    console.log('\n3️⃣ 测试详细解梦...');
    try {
        const detailedDreamResponse = await fetch(`${baseURL}/dream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dreamContent: '我梦见自己站在一座很高的山顶上，周围云雾缭绕。突然出现了一只金色的鸟，它对我说话，告诉我要勇敢地面对即将到来的挑战。然后我就醒了。',
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

        const detailedDreamData = await detailedDreamResponse.json();
        if (detailedDreamResponse.ok) {
            console.log('✅ 详细解梦成功');
            console.log('📝 解梦结果:', detailedDreamData.content.substring(0, 150) + '...');
            console.log('📊 Token使用:', detailedDreamData.usage);
        } else {
            console.log('❌ 详细解梦失败:', detailedDreamData.error);
        }
    } catch (error) {
        console.log('❌ 详细解梦请求失败:', error.message);
    }

    console.log('\n🎉 测试完成！');
};

// 运行测试
testDreamAPI().catch(console.error);