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
-->

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


    <a-card v-if="hexagramData" class="section-card">
      <h3 class="section-title">六爻文本展示</h3>
      <a-button type="primary" @click="hexagramLLMText = hexagramToLLMTextDisplay(hexagramData)">
        生成文本
      </a-button>

      <div v-if="hexagramLLMText" class="llm-text-display">
        <pre>{{ hexagramLLMText }}</pre>
      </div>
    </a-card>



    <a-card v-if="hexagramData" class="section-card">
      <h3 class="section-title">卦象</h3>
      <div class="hexagram-display">
        <div class="hexagram-visual">
          <div class="hexagram-info-header">
            <h4>
              {{ hexagramNames[0] }}
              <span v-if="hexagramNames[1]" class="change-gua">之 {{ hexagramNames[1] }}</span>
              <span class="gua-element">{{ Element[hexagramData.element] }}</span>
            </h4>

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

    <--详细信息区 -->
    <a-card v-if="hexagramData" class="section-card">
      <h3 class="section-title">排盘详情</h3>
      <div class="detail-info">
        <div class="time-info">
          <strong>起卦时间：</strong>{{ formatTime() }}
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

//随机起卦
// function generateByRandom() {
//   const date = dateValue.value;
//   const year = date.year();
//   const month = date.month() + 1;
//   const day = date.date();
//
//   const monthGanZhi = getMonthGanZhi(year, month);
//   const dayGZ = getDayGanZhi(year, month, day);
//
//   monthDay.value = monthGanZhi;
//   dayGanZhi.value = dayGZ;
//
//   // 随机生成六爻
//   const yaos = [];
//   for (let i = 0; i < 6; i++) {
//     // 随机生成0-3的值，代表阴爻、阳爻、动阴爻、动阳爻
//     yaos.push(Math.floor(Math.random() * 4));
//   }
//
//   const sixInstance = new Six(yaos, monthGanZhi, dayGZ);
//   hexagramData.value = sixInstance;
//
//   console.log('随机起卦');
// }


function generateRandomYao() {
  const r = Math.random(); // 0 ≤ r < 1
  if (r < 3/8) return 0;   // 阴爻
  if (r < 6/8) return 1;   // 阳爻
  if (r < 7/8) return 2;   // 动阴爻
  return 3;                // 动阳爻
}

const hexagramLLMText = ref(''); // 存放 hexagramToLLMText 生成的文本


function generateByRandom() {
  const date = dateValue.value;
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  const monthGanZhi = getMonthGanZhi(year, month);
  const dayGZ = getDayGanZhi(year, month, day);

  monthDay.value = monthGanZhi;
  dayGanZhi.value = dayGZ;

  // 按概率生成六爻
  const yaos = [];
  for (let i = 0; i < 6; i++) {
    yaos.push(generateRandomYao());
  }

  const sixInstance = new Six(yaos, monthGanZhi, dayGZ);
  hexagramData.value = sixInstance;

  console.log('随机起卦', yaos);
}


// 时间转爻的算法（简化版）
// function timeToYaos(year: number, month: number, day: number, hour: number): number[] {
//   const total = year + month + day + hour;
//   const yaos = [];
//
//   for (let i = 0; i < 6; i++) {
//     const yaoValue = (total + i) % 4;
//     yaos.push(yaoValue);
//   }
//
//   return yaos;
// }


function timeToYaos(year: number, month: number, day: number, hour: number): number[] {
  const total = year + month + day + hour;
  const yaos = [];

  for (let i = 0; i < 6; i++) {
    // 先算一个“种子数”
    const seed = (total + i * 17) % 1000;  // 1000以内的整数，保证随时间和i变化
    const r = seed / 1000;  // 映射到 0~1

    // 按概率映射
    if (r < 3/8) yaos.push(0);   // 阴爻
    else if (r < 6/8) yaos.push(1); // 阳爻
    else if (r < 7/8) yaos.push(2); // 动阴爻
    else yaos.push(3);            // 动阳爻
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

const hexagramNames = computed(() => {
  return hexagramData.value ? hexagramData.value.names() : [];
});



// function hexagramToLLMTextDisplay(hexagramData: any) {
//   const GP = ['阴爻', '阳爻', '动阴爻', '动阳爻'];
//   const lines: string[] = [];
//
//   // 使用 page 上的 dateValue / timeValue
//   lines.push(`公历日期: ${dateValue.value.format('YYYY-MM-DD HH:mm')}`);
//
//   // 月日干支
//   lines.push(`月建: ${Gan[monthDay.value[0]]}${Zhi[monthDay.value[1]]}月`);
//   lines.push(`日辰: ${Gan[dayGanZhi.value[0]]}${Zhi[dayGanZhi.value[1]]}日`);
//
//   // 卦名
//   if (hexagramData.names) {
//     lines.push(`主卦: ${hexagramData.names()[0]}`);
//     if (hexagramData.names()[1]) lines.push(`变卦: ${hexagramData.names()[1]}`);
//   }
//
//   // 爻信息
//   for (let i = 5; i >= 0; i--) {
//     const yao = hexagramData.times[i];
//     const yaoName = ['初爻','二爻','三爻','四爻','五爻','上爻'][i];
//     const sy = ['无', '应', '世'][yao.sy];
//     const zhi = Zhi[yao.z];
//     const r = Relations[yao.relation];
//     const animal = Animals[yao.animal];
//     const typeName = GP[yao.type];
//
//     // === 新状态显示逻辑 ===
//     let statusArr: string[] = [];
//     if (yao.m === 1) statusArr.push('建位');
//     else if (yao.m === 2) statusArr.push('破位');
//
//     if (yao.empty) statusArr.push('空亡');
//     if (statusArr.length === 0) statusArr.push('正常');
//     const statusStr = statusArr.join('/');
//
//     const fu = (yao.peace && yao.peace.length) ? `伏神: ${Zhi[yao.peace[0]]}${Relations[yao.peace[1]]}` : '';
//     const change = yao.change ? `变爻: ${Zhi[yao.change.z]} ${Relations[yao.change.relation]}` : '';
//
//     const line = `${yaoName}: 世应: ${sy}, 爻类型: ${typeName}, 六神: ${animal}, 六亲: ${r}, 地支: ${zhi}, 状态: ${statusStr}${fu ? ', ' + fu : ''}${change ? ', ' + change : ''}`;
//     lines.push(line);
//   }
//
//   return lines.join('\n');
// }


/**
 * 将完整的六爻数据转换为适合LLM阅读的详细文本格式。
 * @param {any} hexagramData - 经过完整计算的 Six 类的实例
 * @returns {string} - 格式化后的多行文本字符串
 */
function hexagramToLLMTextDisplay(hexagramData) {











  /**
   * 墓库地支到其所墓五行的映射表
   * key: 地支索引, value: [五行索引]
   */
  const TOMB_ZHI_TO_ELEMENTS_MAP = {
    10: [2],       // 戌 墓 火
    7:  [1],       // 未 墓 木
    1:  [4],       // 丑 墓 金
    4:  [0, 3],    // 辰 墓 水、土
  };


  /**
   * 化进神的地支映射表
   * key: 动爻地支, value: 变爻地支
   */
  const EVOLUTION_ADVANCE_MAP = {
    11: 0,  // 亥 -> 子
    2: 3,   // 寅 -> 卯
    5: 6,   // 巳 -> 午
    8: 9,   // 申 -> 酉
    1: 4,   // 丑 -> 辰
    4: 7,   // 辰 -> 未
    7: 10,  // 未 -> 戌
  };

  /**
   * 化退神的地支映射表
   * key: 动爻地支, value: 变爻地支
   */
  const EVOLUTION_RETREAT_MAP = {
    0: 11,  // 子 -> 亥
    3: 2,   // 卯 -> 寅
    6: 5,   // 午 -> 巳
    9: 8,   // 酉 -> 申
    4: 1,   // 辰 -> 丑
    7: 4,   // 未 -> 辰
    10: 7,  // 戌 -> 未
  };


// ... 在文件顶部的常量区域，与其他 EVOLUTION_* MAP 放在一起 ...

  /**
   * 化反吟的地支映射表 (六冲关系)
   * key: 动爻地支, value: 变爻地支
   */
  const EVOLUTION_FANYIN_MAP = {
    0: 6,   // 子 -> 午
    6: 0,   // 午 -> 子
    1: 7,   // 丑 -> 未
    7: 1,   // 未 -> 丑
    2: 8,   // 寅 -> 申
    8: 2,   // 申 -> 寅
    3: 9,   // 卯 -> 酉
    9: 3,   // 酉 -> 卯
    4: 10,  // 辰 -> 戌
    10: 4,  // 戌 -> 辰
    5: 11,  // 巳 -> 亥
    11: 5,  // 亥 -> 巳
  };

  /**
   * 月令关系码到中文描述的映射表
   */
  const MONTH_RELATION_MAP = {
    14: '月破兼爻克月',
    15: '月破兼月克',
    22: '月合兼月生',
    23: '月合兼泄气',
    24: '月合但爻克月',
    25: '月合但月克',
    31: '临月建', // 简化名称以适应显示
    32: '月生',
    33: '月泄',
    34: '爻克月',
    35: '月克',
    // 逻辑上不可能出现的代码可以省略，或留空
    0: '' // 默认值
  };

  /**
   * 日辰关系码到中文描述的映射表
   */
  const DAY_RELATION_MAP = {
    14: '日冲兼爻克日',
    15: '日冲兼克', // 日辰冲克通常直接称为“日冲”或“暗动”
    22: '日合兼生',
    23: '日合兼泄',
    24: '日合但克日',
    25: '日合但被克',
    31: '临日建',
    32: '日生',
    33: '日泄',
    34: '爻克日',
    35: '日克',
    0: '' // 默认值
  };



  /**
   * 64卦对应的名字
   * 规律：对角线为八纯卦，每行都包含同一个八宫的专有名词
   */
  const GuaName = [
    '坤为地', '地雷复', '地水师', '地泽临', '地山谦', '地火明夷', '地风升', '地天泰',
    '雷地豫', '震为雷', '雷水解', '雷泽归妹', '雷山小过', '雷火丰', '雷风恒', '雷天大壮',
    '水地比', '水雷屯', '坎为水', '水泽节', '水山蹇', '水火既济', '水风井', '水天需',
    '泽地萃', '泽雷随', '泽水困', '兑为泽', '泽山咸', '泽火革', '泽风大过', '泽天夬',
    '山地剥', '山雷颐', '山水蒙', '山泽损', '艮为山', '山火贲', '山风蛊', '山天大畜',
    '火地晋', '火雷噬嗑', '火水未济', '火泽睽', '火山旅', '离为火', '火风鼎', '火天大有',
    '风地观', '风雷益', '风水涣', '风泽中孚', '风山渐', '风火家人', '巽为风', '风天小畜',
    '天地否', '天雷无妄', '天水讼', '天泽履', '天山遁', '天火同人', '天风姤', '乾为天',
  ];

  const GuaGong  = [0,0,2,0,3,2,1,0,1,1,1,3,3,2,1,0,0,2,2,2,3,2,1,0,3,1,3,3,3,2,1,0,7,6,5,4,4,4,6,4,7,6,5,4,5,5,5,7,7,6,5,4,4,6,6,6,7,6,5,4,7,5,7,7];
  const GuaXiang = [0,1,7,2,5,6,4,3,1,0,2,7,6,5,3,4,7,2,0,1,4,3,5,6,2,7,1,0,3,4,6,5,5,6,4,3,0,1,7,2,6,5,3,4,1,0,2,7,4,3,5,6,7,2,0,1,3,4,6,5,2,7,1,0];

  /**
   * 先天八卦对应的五行索引
   */
  const Gong2Element = [3, 1, 0, 4, 3, 2, 1, 4];

  /**
   * 象中的世爻位置(应爻位置在[世爻位置 + 3] % 6)
   */
  const Xiang4Yao = [5, 0, 1, 2, 3, 4, 3, 2];

  /**
   * 卦的地支
   */
  const GuaZ = [
    // 为内卦地支  // 为外挂地支
    [[7,  5,  3], [1, 11,   9]], // 坤
    [[0,  2,  4], [6,  8,  10]], // 震
    [[2,  4,  6], [8, 10,   0]], // 坎
    [[5,  3,  1], [11, 9,   7]], // 兑
    [[4,  6,  8], [10, 0,   2]], // 艮
    [[3,  1, 11], [9,  7,   5]], // 离
    [[1, 11,  9], [7,  5,   3]], // 巽
    [[0,  2,  4], [6,  8,  10]], // 乾
  ];

  /**
   * 卦的六亲(依次对应印比伤才杀)
   */
  const Relations = ['父', '兄', '子', '才', '官'];


  /**
   * 六兽起点，分别从甲乙丙丁...依次对应
   */
  const AnimalStart = [0,0,1,1,2,3,4,4,5,5];

  /**
   * 六兽
   */
  const Animals = ['青', '朱', '勾', '蛇', '白', '玄'];


  const Gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

  const Zhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  const Element = ['水', '木', '火', '土', '金'];
  const Zhi2Element = [0, 3, 1, 1, 3, 2, 2, 3, 4, 4, 3, 0];
  const ZHI_COMBINE_MAP = {0: 1, 1: 0, 2: 11, 11: 2, 3: 10, 10: 3, 4: 9, 9: 4, 5: 8, 8: 5, 6: 7, 7: 6};
// export class Attr {
//     constructor() {
//         /**
//          * @type {number} 地支
//          */
//         this.z = undefined
//
//         /**
//          * @type {number} 六亲
//          */
//         this.relation = undefined
//
//         /**
//          * @type {number} 旬空(0无，1有)
//          */
//         this.empty = 0
//
//         /**
//          * @type {number} 0无/1-月建/2-月破
//          */
//         this.m = 0
//
//         /**
//          * @type {number} 0无/1-暗动
//          */
//         this.d = 0
//     }
// }












  // --- 依赖的常量和辅助函数 (确保这些在作用域内) ---
  const GP_TEXT = ['静阴爻', '静阳爻', '动阴爻', '动阳爻'];
  const WASTED_EVOLUTION_MAP = { 2: '回头克', 3: '化退', 4: '化破' };
  const YAO_NAMES = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];


  const formatTombMask = (mask) => {
    if (mask === 0) return '';
    const targets = [];
    // 新增：首先检查第6位 (卦宫)
    if ((mask >> 6) & 1) {
      targets.push('卦宫');
    }
    // 检查第0-5位 (六个爻)
    for (let i = 0; i < 6; i++) {
      if ((mask >> i) & 1) {
        targets.push(YAO_NAMES[i]);
      }
    }

    return targets.length > 0 ? `此爻可墓: ${targets.join(', ')}` : '';
  };

  // --- 开始构建输出 ---
  const lines = [];

  // --- 1. 打印头部信息 ---
  lines.push(`占卜时间: ${Gan[hexagramData.month[0]]}${Zhi[hexagramData.month[1]]}月 ${Gan[hexagramData.day[0]]}${Zhi[hexagramData.day[1]]}日`);
  const guaNames = hexagramData.names();
  const guaElement = Element[hexagramData.element];
  lines.push(`卦象: ${guaNames.join(" 之 ")} (属${guaElement})`);
  lines.push('----------------------------------');

  // --- 2. 循环打印每一爻的详细信息 ---
  for (let i = 5; i >= 0; i--) {
    const yao = hexagramData.times[i];
    const yaoName = YAO_NAMES[i];
    const sy = ['','(应)','(世)'][yao.sy];

    // --- 2a. 构建主信息行 ---
    let mainLine = `${yaoName}${sy}: ${Animals[yao.animal]} ${Relations[yao.relation]} ${Zhi[yao.z]} (${GP_TEXT[yao.type]})`;

    // 如果是动爻，添加变爻和动变关系
    if (yao.change) {
      mainLine += ` -> 变: ${Relations[yao.change.relation]} ${Zhi[yao.change.z]}`;

      let evolutionParts = [];
      if (yao.evolution === 1) evolutionParts.push('化进');
      else if (yao.evolution === 3) evolutionParts.push('伏吟');
      else if (yao.evolution === 4) evolutionParts.push('反吟');

      if (yao.wastedEvolution > 1) {
        evolutionParts.push(WASTED_EVOLUTION_MAP[yao.wastedEvolution]);
      }

      if (evolutionParts.length > 0) {
        mainLine += ` [动变: ${evolutionParts.join(', ')}]`;
      }
    }
    lines.push(mainLine);

    // --- 2b. 构建附属信息列表 ---
    const subDetails = [];

    // 伏神 (飞神就是本爻)
    if (yao.peace.length) {
      subDetails.push(`伏神: ${Zhi[yao.peace[0]]}${Relations[yao.peace[1]]}`);
    }

    // 旬空状态
    if (Math.floor(yao.empty / 10) === 2) {
      const emptyType = (yao.empty % 10 === 1) ? '真空' : '假空';
      subDetails.push(`旬空 (${emptyType})`);
    }

    // 暗动
    if (yao.d === 1) {
      subDetails.push('暗动');
    }

    // 月令与日辰关系
    const monthDesc = MONTH_RELATION_MAP[yao.m15] || '';
    if (monthDesc) subDetails.push(monthDesc);

    const dayDesc = DAY_RELATION_MAP[yao.d15] || '';
    if (dayDesc) subDetails.push(dayDesc);

    // 本爻入墓信息
    const tombInfo = formatTombMask(yao.tombTargetMask);
    if (tombInfo) subDetails.push(tombInfo);

    // 变爻入墓信息
    if (yao.change && yao.change.tombTargetMask > 0) {
      const changeTombInfo = formatTombMask(yao.change.tombTargetMask);
      subDetails.push(`变爻${changeTombInfo}`);
    }

    // 出空信息
    if (yao.exitEmpty) {
      const formatGanZhi = (gz) => Gan[gz[0]] + Zhi[gz[1]];
      const naturalStr = formatGanZhi(yao.exitEmpty.natural);
      const fillStr = Zhi[yao.exitEmpty.fill[1]];
      const clashStr = Zhi[yao.exitEmpty.clash[1]];
      subDetails.push(`出空: 自然出空(${naturalStr}), 填实(${fillStr}), 冲实(${clashStr})`);
    }

    // 如果有附属信息，则格式化并添加
    if (subDetails.length > 0) {
      lines.push(`  - 状态: ${subDetails.join(' | ')}`);
    }
  }
  lines.push('----------------------------------');

  return lines.join('\n');
}




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
    // 使用 hexagramToLLMTextDisplay 生成卦象文本
    const hexagramText = hexagramToLLMTextDisplay(hexagramData.value);

    const body = {
      "messages": [
        {
          "role": "system",
          "content": liuyaoPrompt
        },
        {
          "role": "user",
          "content": `用户问题：${question.value}\n\n六爻卦象信息：\n${hexagramText}`
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* 调整元素之间的间距 */
}

.change-gua {
  font-size: 1.1rem;
  color: #6b7280;
}

.gua-element {
  font-size: 1.1rem;
  color: #059669; /* 为五行信息设置一个不同的颜色 */
  font-weight: 600;
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



.llm-text-display {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 10px;
  border-left: 4px solid #667eea;
  white-space: pre-wrap;
  line-height: 1.6;
  margin-top: 12px;
  font-size: 14px;
  color: #1f2937;
}

</style>
