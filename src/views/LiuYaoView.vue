<template>
  <div class="page-container">
    <!-- 问题输入区 -->
    <a-card class="section-card">
      <h3 class="section-title">问题输入</h3>
      <a-textarea
        v-model:value="question"
        :rows="3"
        placeholder="请输入您想咨询的问题..."
        class="question-input"
      />
    </a-card>


    <!-- 起卦操作区（新增） -->
    <a-card class="section-card">
      <h3 class="section-title">起卦操作</h3>

      <!-- 可选：选择时间（generateByTime 会用到这两个值） -->
      <div class="operation-section" style="margin-bottom: 8px;">
        <a-date-picker v-model:value="dateValue" />
        <a-time-picker v-model:value="timeValue" format="HH:mm" />
      </div>

      <!-- 必需：三种起卦按钮，点击后会给 hexagramData 赋值，从而显示后面的卡片 -->
      <div class="operation-section">
        <a-button type="primary" @click="generateByTime">时间起卦</a-button>
        <a-button @click="generateByManual">手动起卦</a-button>
        <a-button @click="generateByRandom">随机起卦</a-button>
      </div>
    </a-card>

    <!-- 手动起卦输入 -->
    <div class="manual-section" style="margin-top: 16px;">
      <div class="yao-inputs">
        <div
            class="yao-input-row"
            v-for="(v, i) in 6"
            :key="i"
        >
          <span>第 {{ i + 1 }} 爻：</span>
          <a-select v-model:value="manualYaos[i]" style="width: 180px;">
            <a-select-option :value="0">阴爻</a-select-option>
            <a-select-option :value="1">阳爻</a-select-option>
            <a-select-option :value="2">动阴爻</a-select-option>
            <a-select-option :value="3">动阳爻</a-select-option>
          </a-select>
        </div>
      </div>

      <!-- 确定按钮 -->
      <a-button
          type="primary"
          class="manual-button"
          @click="generateByManual"
      >
        确定
      </a-button>
    </div>


    <!-- 起卦操
    <a-card class="section-card">
      <h3 class="section-title">起卦方式</h3>
      <a-tabs v-model:activeKey="activeTab" @change="onTabChange">
        <a-tab-pane key="time" tab="时间起卦">
          <div class="operation-section">
            <DatePicker :locale="locale" v-model:value="dateValue" />
            <TimePicker :locale="locale" v-model:value="timeValue" />
            <Button type="primary" @click="generateByTime">时间起卦</Button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="manual" tab="手动输入">
          <div class="manual-section">
            <div class="yao-inputs">
              <div v-for="(yao, index) in manualYaos" :key="index" class="yao-input-row">
                <span>{{ ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'][index] }}：</span>
                <a-select v-model:value="manualYaos[index]" style="width: 120px">
                  <a-select-option :value="0">阴爻</a-select-option>
                  <a-select-option :value="1">阳爻</a-select-option>
                  <a-select-option :value="2">动阴爻</a-select-option>
                  <a-select-option :value="3">动阳爻</a-select-option>
                </a-select>
              </div>
            </div>
            <Button type="primary" @click="generateByManual" class="manual-button">手动起卦</Button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="random" tab="随机起卦">
          <div class="operation-section">
            <Button type="primary" @click="generateByRandom">随机起卦</Button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <!-- AI 解读区 -->
    <a-card v-if="hexagramData" class="section-card">
      <h3 class="section-title">AI 解读</h3>
      <div class="ai-section">
        <a-button
          type="primary"
          @click="getAiInterpretation"
          :loading="aiLoading"
          :disabled="!question.trim()"
          class="ai-interpret-button"
        >
          {{ aiLoading ? 'AI解读中...' : 'AI解读' }}
        </a-button>

        <div v-if="aiAnswer" class="ai-result-section">
          <h4>AI解读结果</h4>
          <div class="ai-result-content">
            {{ aiAnswer }}
          </div>
        </div>

        <div v-if="aiError" class="ai-error-section">
          <a-alert
            :message="aiError"
            type="error"
            show-icon
            closable
            @close="aiError = ''"
          />
        </div>
      </div>
    </a-card>

    <!-- 卦象展示区 -->
    <a-card v-if="hexagramData" class="section-card">
      <h3 class="section-title">卦象</h3>
      <div class="hexagram-display">
        <div class="hexagram-visual">
          <div class="hexagram-info-header">
            <h4>{{ hexagramData.names[0] }}</h4>
            <span v-if="hexagramData.names[1]" class="change-gua">之 {{ hexagramData.names[1] }}</span>
          </div>
          <div class="yao-container">
            <div
              v-for="(yao, index) in reversedYaos"
              :key="index"
              class="yao-row"
            >
              <div class="yao-info">
                <span class="yao-number">{{ ['上', '五', '四', '三', '二', '初'][index] }}</span>
                <span class="shi-ying">{{ ['', '应', '世'][yao.sy] }}</span>
                <span class="animal">{{ Animals[yao.animal] }}</span>
                <span class="relation">{{ Relations[yao.relation] }}</span>
              </div>
              <div class="yao-visual">
                <img :src="getYaoImage(yao.type)" alt="爻" class="yao-image" />
              </div>
              <div class="yao-detail">
                <span class="zhi">{{ Zhi[yao.z] }}</span>
                <span v-if="yao.empty" class="empty">空</span>
                <span v-if="yao.m === 1" class="jian">建</span>
                <span v-if="yao.m === 2" class="po">破</span>
                <span v-if="yao.d" class="dong">动</span>
                <div v-if="yao.peace && yao.peace.length" class="fu">
                  伏{{ Zhi[yao.peace[0]] }}{{ Relations[yao.peace[1]] }}
                </div>
                <div v-if="yao.change" class="change-yao">
                  → {{ Zhi[yao.change.z] }} {{ Relations[yao.change.relation] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-card>

    <!-- 详细信息区 -->
    <a-card v-if="hexagramData" class="section-card">
      <h3 class="section-title">排盘详情</h3>
      <div class="detail-info">
        <div class="time-info">
          <strong>起卦时间：</strong>{{ formatTime() }}
        </div>
        <div class="gua-info">
          <strong>卦宫：</strong>{{ Element[hexagramData.element] }}
        </div>
        <div class="month-day-info">
          <strong>月建：</strong>{{ Gan[monthDay[0]] }}{{ Zhi[monthDay[1]] }}月　
          <strong>日辰：</strong>{{ Gan[dayGanZhi[0]] }}{{ Zhi[dayGanZhi[1]] }}日
        </div>
      </div>
    </a-card>

    <!-- JSON数据展示 -->
    <a-card v-if="hexagramData" class="section-card">
      <a-collapse>
        <a-collapse-panel header="查看详细数据" key="1">
          <JsonDisplay :jsonData="hexagramData" />
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { ref, computed } from "vue";
import {
  Card as ACard,
  DatePicker,
  TimePicker,
  Button,
  Tabs as ATabs,
  TabPane as ATabPane,
  Select as ASelect,
  SelectOption as ASelectOption,
  Input as AInput,
  Alert as AAlert,
  Collapse as ACollapse,
  CollapsePanel as ACollapsePanel
} from 'ant-design-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { Dayjs } from 'dayjs';
import { Six, GuaName, Relations, Animals, Gan, Zhi, Element } from '../liuyao/six.js';
import JsonDisplay from '../components/JsonDisplay.vue';

dayjs.locale('zh-cn');

const { TextArea: ATextarea } = AInput;

// 响应式数据
const dateValue = ref<Dayjs>(dayjs());
const timeValue = ref<Dayjs>(dayjs());
const question = ref('');
const activeTab = ref('time');
const hexagramData = ref<any>(null);
const manualYaos = ref([0, 0, 0, 0, 0, 0]);
const monthDay = ref([0, 0]);
const dayGanZhi = ref([0, 0]);

// AI相关
const aiAnswer = ref('');
const aiLoading = ref(false);
const aiError = ref('');

// 计算属性
const reversedYaos = computed(() => {
  return hexagramData.value ? [...hexagramData.value.times].reverse() : [];
});

// 方法
function onTabChange(key: string) {
  activeTab.value = key;
}

function getYaoImage(type: number): string {
  return `/src/liuyao/svgs/yao-${type}.svg`;
}

function formatTime(): string {
  const date = dateValue.value;
  const time = timeValue.value;
  return `${date.year()}年${date.month() + 1}月${date.date()}日 ${time.hour()}时`;
}

// 时间起卦
function generateByTime() {
  const date = dateValue.value;
  const time = timeValue.value;

  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();
  const hour = time.hour();

  // 计算干支
  const monthGanZhi = getMonthGanZhi(year, month);
  const dayGZ = getDayGanZhi(year, month, day);

  monthDay.value = monthGanZhi;
  dayGanZhi.value = dayGZ;

  // 时间起卦算法
  const yaos = timeToYaos(year, month, day, hour);

  const sixInstance = new Six(yaos, monthGanZhi, dayGZ);
  hexagramData.value = sixInstance;

  console.log('时间起卦:', formatTime());
}

// 手动起卦
function generateByManual() {
  const date = dateValue.value;
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  const monthGanZhi = getMonthGanZhi(year, month);
  const dayGZ = getDayGanZhi(year, month, day);

  monthDay.value = monthGanZhi;
  dayGanZhi.value = dayGZ;

  const sixInstance = new Six([...manualYaos.value], monthGanZhi, dayGZ);
  hexagramData.value = sixInstance;

  console.log('手动起卦');
}

// 随机起卦
function generateByRandom() {
  const date = dateValue.value;
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  const monthGanZhi = getMonthGanZhi(year, month);
  const dayGZ = getDayGanZhi(year, month, day);

  monthDay.value = monthGanZhi;
  dayGanZhi.value = dayGZ;

  // 随机生成六爻
  const yaos = [];
  for (let i = 0; i < 6; i++) {
    // 随机生成0-3的值，代表阴爻、阳爻、动阴爻、动阳爻
    yaos.push(Math.floor(Math.random() * 4));
  }

  const sixInstance = new Six(yaos, monthGanZhi, dayGZ);
  hexagramData.value = sixInstance;

  console.log('随机起卦');
}

// 时间转爻的算法（简化版）
function timeToYaos(year: number, month: number, day: number, hour: number): number[] {
  const total = year + month + day + hour;
  const yaos = [];

  for (let i = 0; i < 6; i++) {
    const yaoValue = (total + i) % 4;
    yaos.push(yaoValue);
  }

  return yaos;
}

// 获取月干支（简化算法）
function getMonthGanZhi(year: number, month: number): [number, number] {
  const gan = (year * 12 + month) % 10;
  const zhi = (month - 1) % 12;
  return [gan, zhi];
}

// 获取日干支（简化算法）
function getDayGanZhi(year: number, month: number, day: number): [number, number] {
  const totalDays = year * 365 + month * 30 + day;
  const gan = totalDays % 10;
  const zhi = totalDays % 12;
  return [gan, zhi];
}

// AI解读功能
const getAiInterpretation = async () => {
  if (!question.value.trim() || !hexagramData.value) {
    return;
  }

  aiLoading.value = true;
  aiError.value = '';
  aiAnswer.value = '';

  const liuyaoPrompt = `你是一位精通六爻占卜的大师，请根据提供的六爻卦象数据，结合用户的问题，给出专业的解读分析。

请从以下几个方面进行分析：
1. 卦象基本含义
2. 世爻应爻分析
3. 用神取用
4. 动爻变化
5. 六亲关系
6. 综合判断

请给出具体、实用的建议。`;

  try {
    const body = {
      "messages": [
        {
          "role": "system",
          "content": liuyaoPrompt
        },
        {
          "role": "user",
          "content": `用户问题：${question.value}\n\n六爻卦象数据：${JSON.stringify({
            names: hexagramData.value.names(),
            element: Element[hexagramData.value.element],
            times: hexagramData.value.times,
            monthDay: `${Gan[monthDay.value[0]]}${Zhi[monthDay.value[1]]}月`,
            dayGanZhi: `${Gan[dayGanZhi.value[0]]}${Zhi[dayGanZhi.value[1]]}日`
          }, null, 2)}`
        }
      ],
      "stream": false,
      "model": "glm-4-flash",
      "temperature": 0.7,
      "max_tokens": 40000
    };

    const response = await fetch("https://nas-ai.4ce.cn/v1/chat/completions", {
      "headers": {
        "authorization": "sk-L8W2WtnCtdwG6nctF975D0E770144dE5Be3123Fa16720a03",
        "content-type": "application/json"
      },
      "body": JSON.stringify(body),
      "method": "POST"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      aiAnswer.value = data.choices[0].message.content;
    } else {
      throw new Error('API返回数据格式异常');
    }

  } catch (err: any) {
    console.error('AI解读请求失败:', err);
    aiError.value = `AI解读失败: ${err.message}`;
  } finally {
    aiLoading.value = false;
  }
};
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-card {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1f2937;
}

.question-input {
  width: 100%;
  font-size: 16px;
  border-radius: 8px;
}

.operation-section {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.manual-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.yao-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.yao-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.manual-button {
  align-self: flex-start;
}

.ai-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ai-interpret-button {
  width: 200px;
  height: 45px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
}

.ai-result-section {
  margin-top: 16px;
}

.ai-result-content {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 10px;
  border-left: 4px solid #667eea;
  white-space: pre-wrap;
  line-height: 1.6;
}

.hexagram-display {
  display: flex;
  justify-content: center;
}

.hexagram-visual {
  max-width: 800px;
  width: 100%;
}

.hexagram-info-header {
  text-align: center;
  margin-bottom: 24px;
}

.hexagram-info-header h4 {
  font-size: 1.5rem;
  margin: 0;
  color: #1f2937;
}

.change-gua {
  font-size: 1.1rem;
  color: #6b7280;
  margin-left: 16px;
}

.yao-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.yao-row {
  display: grid;
  grid-template-columns: 200px 320px 1fr;
  align-items: center;
  gap: 16px;
  padding: 8px;
  border-radius: 8px;
  background: #f9fafb;
}

.yao-info {
  display: flex;
  gap: 12px;
  font-size: 14px;
}

.yao-number {
  font-weight: 600;
  color: #374151;
  min-width: 20px;
}

.shi-ying {
  color: #dc2626;
  font-weight: 600;
  min-width: 20px;
}

.animal {
  color: #059669;
  min-width: 20px;
}

.relation {
  color: #7c3aed;
  min-width: 20px;
}

.yao-visual {
  display: flex;
  justify-content: center;
}

.yao-image {
  width: 320px;
  height: 60px;
}

.yao-detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
}

.zhi {
  font-weight: 600;
  color: #1f2937;
}

.empty {
  color: #dc2626;
  font-size: 12px;
}

.jian {
  color: #059669;
  font-size: 12px;
}

.po {
  color: #dc2626;
  font-size: 12px;
}

.dong {
  color: #7c3aed;
  font-size: 12px;
}

.fu {
  color: #6b7280;
  font-size: 12px;
}

.change-yao {
  color: #dc2626;
  font-size: 12px;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 15px;
  line-height: 1.6;
}

.time-info, .gua-info, .month-day-info {
  padding: 8px 0;
}

@media (max-width: 768px) {
  .yao-row {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .yao-info {
    justify-content: center;
  }
}
</style>
