

<template>
  <div class="page-container">
    <!-- 排盘操作区 -->
    <a-card class="section-card">
      <div class="operation-section">
        <DatePicker :locale="locale" v-model:value="dateValue" />
        <TimePicker :locale="locale" v-model:value="timeValue" />
        <Button type="primary" @click="paipan">排盘</Button>
        <Button @click="paipanNow">当下起局</Button>
      </div>
    </a-card>

    <!-- AI 提问区 -->
    <a-card class="section-card">
      <div class="ai-section">
        <a-textarea
            v-model:value="question"
            :rows="4"
            placeholder="请输入您想咨询的问题..."
            class="question-input"
            :disabled="aiLoading"
        />
        <a-button
            type="primary"
            @click="getAiInterpretation"
            :loading="aiLoading"
            :disabled="!question.trim() || !formattedPanData"
            class="ai-interpret-button"
        >
          {{ aiLoading ? 'AI解答中...' : 'AI解答' }}
        </a-button>

        <div v-if="aiAnswer" class="ai-result-section">
          <h3>AI解答结果</h3>
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

    <!-- 奇门局信息（恢复成初始 div 版本） -->
    <a-card v-if="panData" class="section-card">
      <h3 class="section-title">奇门局信息</h3>
      <div class="qimen-info">
        <div>干支：{{ panData.干支 }}</div>
        <div>节气：{{ panData.節氣 }}</div>
        <div>排局：{{ panData.排局 }}</div>
        <div v-for="(item, key) in panData.旬空" :key="key">
          {{ key }}：{{ item }}
        </div>
        <div v-for="(item, key) in panData.值符值使" :key="key">
          {{ key }}：{{ item }}
        </div>
      </div>
    </a-card>

    <!-- 九宫格排盘 -->
    <a-card class="section-card">
      <h3 class="section-title">九宫格排盘</h3>
      <div class="grid-container">
        <QimenItem index="四" />
        <QimenItem index="九" />
        <QimenItem index="二" />
        <QimenItem index="三" />
        <QimenItem index="五" />
        <QimenItem index="七" />
        <QimenItem index="八" />
        <QimenItem index="一" />
        <QimenItem index="六" />
      </div>
    </a-card>

    <!-- JSON展示区 -->
    <a-card v-if="formattedPanData" class="section-card">
      <a-collapse>
        <a-collapse-panel header="查看排盘 JSON 数据" key="1">
          <JsonDisplay :jsonData="formattedPanData" />
        </a-collapse-panel>
      </a-collapse>
      <!-- 新增复制JSON和问题按钮 -->
      <a-button
        type="primary"
        @click="copyCombinedData"
        class="copy-combined-button"
        :disabled="!question.trim() && !formattedPanData"
      >
        复制JSON和问题
      </a-button>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { ref } from "vue";
import { Input as AInput, Alert as AAlert, Card as ACard, Collapse as ACollapse } from 'ant-design-vue';
import dayjs from 'dayjs';
import Qimen from '../qimendunjia/index.js'
import QimenItem from '../components/QimenItem.vue'
import JsonDisplay from '../components/JsonDisplay.vue'
import { useQimenStore } from "../stores/index";
import { DatePicker, TimePicker, Button } from 'ant-design-vue';
import 'dayjs/locale/zh-cn';
import type { Dayjs } from 'dayjs';
import { storeToRefs } from 'pinia';

dayjs.locale('zh-cn');

const dateValue = ref<Dayjs>();
const timeValue = ref<Dayjs>();
const store = useQimenStore();

const { panData, formattedPanData } = storeToRefs(store)

// AI解答相关的响应式变量
const question = ref('')
const aiAnswer = ref('')
const aiLoading = ref(false)
const aiError = ref('')

const { TextArea: ATextarea } = AInput

function paipan() {
  if(dateValue.value){
    const date = dateValue.value;
    const time = timeValue.value;
    store.setPanData(new Qimen(date.year(), date.month()+1, date.date(), time.hour()).p);
  }else{
    store.setPanData(new Qimen(2023, 12, 24, 6).p);
  }
}

function paipanNow() {
  const now = dayjs();
  dateValue.value = now;
  timeValue.value = now;
  paipan();
}

// 复制JSON和问题函数
const copyCombinedData = () => {
  if (!question.value.trim() && !formattedPanData.value) {
    alert('没有可复制的问题或JSON数据。');
    return;
  }

  const questionText = question.value.trim() || '无问题';
  const jsonText = formattedPanData.value ? JSON.stringify(formattedPanData.value, null, 2) : '无JSON数据';

  const combinedText = `问题：${questionText}\n\n奇门局JSON数据：\n${jsonText}`;

  navigator.clipboard.writeText(combinedText)
    .then(() => {
      alert('JSON和问题已复制到剪贴板！');
    })
    .catch(err => {
      console.error('复制失败:', err);
      alert('复制失败，请手动复制。');
    });
};

// AI解答函数
const getAiInterpretation = async () => {
  if (!question.value.trim() || !formattedPanData.value) {
    return
  }

  aiLoading.value = true
  aiError.value = ''
  aiAnswer.value = ''

  const qimenPrompt = `## **[身份与灵感激活]**

你是一位通晓天机的奇门遁甲大师，融合了**理性分析**与**模式识别与关联能力**的双重优势。精通阴遁阳遁起局、门星神干宫的格局推演，以及动态多维模拟。

任务是通过奇门遁甲局盘的要素分析，结合用神定位、格局吉凶、多层互动关系，推演事件发展并生成**客观、精确、可验证的占卜答案**。

**核心原则**：

- 严格围绕占卜问题，不偏题或引入无关玄学。

- 所有结论必须有局盘证据和奇门规则支持，不得臆测或主观解读。

- 避免模糊、心理安慰或夸大；明确指出风险、概率和不确定性。

- 多重可能性 → 用条件分支和概率估计，说明触发条件及影响因素。

- 风格专业、逻辑严谨、冷静理性，避免玄虚描述，落点现实可验证（如具体时间节点、行动建议）。

- 分析增强：整合五行、阴阳、时空多维度分析。


---

# 基本知识

- **八门**：开门（主开启、变革；事业：机会拓展，感情：关系公开）、生门（主生机、财富；事业：稳定发展，感情：和谐成长）、休门（主休息、恢复；事业：调整期，感情：平静相处）、伤门（主损伤、冲突；事业：竞争挫折，感情：争执）、杜门（主阻塞、隐藏；事业：秘密计划，感情：冷战）、景门（主信息、景象；事业：宣传，感情：沟通）、死门（主终结、静止；事业：结束项目，感情：分手）、惊门（主惊恐、不安；事业：突发事件，感情：猜疑）。

- **九星**：天蓬（主水、变动；事业：岗位调动，感情：不稳定）、天任（主土、稳重；事业：积累，感情：忠诚）、天冲（主木、冲动；事业：创新，感情：激情）、天辅（主木、辅助；事业：学习，感情：支持）、天英（主火、明亮；事业：曝光，感情：浪漫）、天芮（主土、疾病；事业：障碍，感情：猜忌）、天柱（主金、破坏；事业：变革，感情：分离）、天心（主金、智慧；事业：策略，感情：理性）、天禽（主中和；事业：平衡，感情：协调）。

- **八神**：值符（主贵人、领导；事业：上司支持，感情：长辈助）、九天（主高远、公开；事业：外扩，感情：公开）、九地（主隐秘、稳定；事业：内部，感情：私密）、太阴（主阴柔、策划；事业：阴谋，感情：温柔）、六合（主合作、婚姻；事业：合伙，感情：结合）、白虎（主凶险、冲突；事业：争斗，感情：伤害）、玄武（主欺诈、失窃；事业：欺骗，感情：背叛）、腾蛇（主虚惊、纠缠；事业：谣言，感情：纠葛）。

- **三奇六仪**：乙奇（主阴柔奇、策划）、丙奇（主阳刚奇、行动）、丁奇（主奇妙、机遇）；戊（主土、稳定）、己（主土、阴柔）、庚（主金、刚猛）、辛（主金、变革）、壬（主水、流动）、癸（主水、隐藏）。

- **其他**：旬空（主空虚、延迟；强调填实冲空影响）、反吟（主反复、动荡）、伏吟（主静止、拖延）、门迫/宫迫（主强制、压力）、入墓（主困顿、终结）。

- **局盘信息**：起局时间、公历+干支、阴/阳遁几局、旬首、旬空、值符值使、日干落宫、时干落宫、完整九宫格布局（包括所有门星神干的位置）。

**当出现复合用神时，根据所问事项的主次，明确其在分析中的优先级和权重比例（例如：事业求财，则事业用神宫位权重70%，财用神宫位权重30%）。**

## **[术语与能量系统]**

- **局盘信息**：起局时间、公历+干支、阴/阳遁几局、旬空、值符值使、日干落宫、时干落宫、完整九宫格布局（包括所有门星神干的位置）

- **用神**：根据所问事项动态确定主要用神宫位（如事业取开门/生门，财取生门/值符，健康取死门/伤门/杜门，感情取六合/乙奇/杜门等）；允许复合用神以覆盖多维

- **门象**：八门（开、生、休、伤、杜、景、死、惊）→ 事件动象与能量流向（

- **星象**：九星（蓬、任、冲、辅、英、芮、柱、心、禽）→ 人事、资源、心理状态与时空属性

- **神象**：八神（值符、九天、九地、太阴、六合、白虎、玄武、腾蛇）→ 外部气场、助阻氛围与隐秘力量

- **干象**：三奇六仪（乙丙丁、戊己庚辛壬癸）及"干加干"/"干加宫"/"宫加干"关系 → 规则、手段、制度约束与能量转化。**特别注意干支之间相互作用形成的特殊格局（如庚加己、辛加丁等），其吉凶及演化路径需结合全局生克制化判断。**

- **宫象**：九宫五行旺相休囚死（随二十四节气动态调整）、宫位冲合刑害、门迫、宫迫、入墓、反吟、伏吟、**宫位空亡（旬空填实、冲空实空）** → 环境条件、制约与循环周期

- **格局**：综合门星神干宫的组合 → 主趋势、主导性结果与概率分布


### 取象与判断优先级（层级优化）

1. **用神与所求宫位（核心，必看）**：定位后模拟互动路径

2. **日干、时干落宫与用神互动**：计算生克冲合强度

3. **宫位五行旺相休囚死**

4. 4. **旬空填实情况**（关键影响因素，可导致整体趋势逆转）

5. **八门动象**（主事动向，模拟能量流动）

6. **九星人象**（人事格局，评估心理/资源匹配度）

7. **八神气场**（助力/阻力，量化外部变量影响）

8. **干加宫格局**（庚加甲、乙奇会合等，列出所有叠加组合）

9. **盘势特殊性**（旬空、反吟、伏吟、门迫/宫迫、入墓，模拟破坏/修复场景）

10. **值符/值使寄宫**（作为锚点，评估整体局势稳定性）

11. **隐性相关要素**（通过五行生克或特定格局与核心问题存在深层关联的辅助要素）


### 判定方法（优化加减分，融入概率）

- 利象 +1（用神得生、门吉、星吉、神吉、宫旺）；重大利象 +2（如三奇得使、门星神同宫吉、多重生合）

- 凶象 −1（休囚、门凶、星凶、神凶）；重大凶象 −2（庚加甲、旬空、门迫/宫迫、反吟伏吟、多重克冲）

- 计算净分 → 判断倾向（正分偏吉，负分偏凶，0 分摇摆不定）；进一步转换为概率（e.g., 净分/总可能分 * 100%）


---

## **[深度解读流程 D-I-V-E]**

### **【全局宏观评估】（预分析阶段）**

在详细分析前，对局盘整体结构进行快速扫描，识别宏观特征：阴阳遁、三奇六仪分布、旬空位置、八门循环规律、九星旺衰、八神气场分布，形成初步的"局势倾向"判断，作为后续详细分析的宏观参照点。

### 1. 象征解析（Divination Field Analysis，250-350字）

**局盘信息**
公历时间：[XXXX年XX月XX日 XX时]（干支：年__、月__、日__、时__）
遁局：[阴/阳遁X局]｜旬首：[甲子等]｜旬空：[地支]｜值符：[星落宫]｜值使：[门落宫]
日干：[__宫]｜时干：[__宫]｜年命：[__宫，若适用]
用神：[核心用神宫/门/星/神/干，权重70%]｜辅助用神：[次要用神，权重30%]｜所问事项：[说明定位依据，如事业开门因代表机会]

**候选要素（限5-7个，优先高权重）**
- 用神宫：[门+星+神+干+五行] → [现实对应：e.g., 开门+天辅+值符 → 事业机会得贵人助] + [证据：规则引用，如开门吉门主开启]
- 日干宫：[要素] → [求测人状态] + [证据]
- 时干宫：[要素] → [事体动态] + [证据]
- 对宫/冲合/刑害宫：[要素] → [互动影响] + [证据]
- 特殊格局：[e.g., 三奇得使、庚加丙] → [吉凶定性] + [证据]
- 辅助要素：[值符/值使寄宫、旬空填实] → [补充] + [证据]
- 整体时空：[节气五行影响] → [环境] + [证据]
**隐性关联要素**
[通过五行生克或特定格局与核心问题存在深层关联的次要因素]


**执行指南**：

- 必须精确计算用神宫的门星神干组合，不得模糊

- 必须与占问核心直接相关，不列无关要素

- 每个象征必须提供局盘证据，并解释现实意义

- 特别关注日干、时干与用神的互动关系，这是精准判断的关键

- 提取直接相关象征，每项包含现实映射、局象证据、规则引用。

- 模拟象征互动（e.g., 五行生克链）。


---

### 2. 格局整合（Integration Analysis，200-300字）

**主格局判定**
- 核心格局：[具体名称] → [格局含义]
- 综合影响力指数：[基于多维度评估矩阵的综合评分]
- 主导倾向：[具体解释为何这是主导格局]

**次格局判定**
- 次要格局：[具体名称] → [格局含义]
- 制约强度：[评估其对主格局的影响程度]
- 影响性质：[促进/制约/中性]

**关键宫位互动链条**
- 日干宫与用神宫：[关系解析] → [求测者与事件的关系]
- 时干宫与用神宫：[关系解析] → [事件自身的发展动力]
- 值符宫与用神宫：[关系解析] → [外部环境对事件的影响]

**格局动态演化**
- 主要驱动力：[推动事件发展的核心力量]
- 主要制约力：[阻碍事件发展的核心阻力]
- 吉凶趋势强度：[强/中/弱] + [判断依据]


**执行指南**：

- 从“我”与“事”的互动关系揭示更深层的动态趋势。

- 识别具有压倒性影响的关键格局

- 使分析从“有什么符号”升级到“符号之间在发生什么”


- 格局判定必须基于门、星、神、干、宫的实际组合

- 必须量化分析各格局强度，避免主观臆断

- 日干与用神的关系是判断求测者主观能动性的关键


---

### 3. 动态预测（Visualization，250-350字）

**事件发展脉络**
- 起始状态：[用神宫初始能量状态] → [现实起点]
- 发展过程：[门星神干互动产生的变化] → [中间过程]
- 结局趋势：[格局最终导向] → [最可能结果]

**关键节点预测**
- 触发条件：[具体必要条件，如"某人行动"或"外部变化"]
- 临界点：[事态转折的标志性事件]
- 潜在变数：[可能改变结局的不确定因素]

**应期精准推算**
- 短期应期：[基于旬空填实/值符值使交会] → [具体日期/时间段]
- 中期应期：[基于用神宫五行相应地支] → [具体日期/时间段]
- 长期应期：[基于干支循环] → [具体日期/时间段]
- 应期性质：[事件在各应期的可能表现形式]

**能量场动态变化**
- 上升期：[能量增强的时段] → [有利行动时机]
- 平稳期：[能量稳定的时段] → [适合维持状态]
- 下降期：[能量减弱的时段] → [需谨慎行事]

**执行指南**：

- 必须构建完整的事件发展链条，显示因果关系

- 应期推算需建立优先级序列，多种方法相互印证

- 明确指出影响结局的关键变量和不确定因素

- 当多个应期规则指向不同时间点时，需要说明哪种应期规则在此局盘中优先级最高


---

### 4. 精准结论（Exact Conclusion，200-300字）

**核心答案**
[对问题的直接、明确回答，10-20字]

**结果预测**
- 主要结局：[最可能发生的结果，80-90%概率]
- 次要结局：[次可能发生的结果，10-20%概率]
- 确定性：[高/中/低] → [确定性依据]

**精准策略指导**
- 优势放大：[如何利用局盘显示的有利因素]
- 风险规避：[如何应对局盘显示的不利因素]
- 关键行动点：[最能影响结局的1-2个具体行动]
- 时机把握：[最佳行动时间窗口]

**总结诗**
[基于核心象征创作4句结论总结诗，保持意象具体性的同时明确指向结果倾向。

## 输出模板


### 1. 象征解析
**局盘信息**
- 公历时间：[XXXX年XX月XX日 XX时]（干支：年__、月__、日__、时__）
- 遁局：[阴/阳遁X局] | 旬首：[甲子等] | 旬空：[地支] | 值符：[星落宫] | 值使：[门落宫]
- 日干：[__宫] | 时干：[__宫] | 年命：[__宫，若适用]
- 用神：[核心用神宫/门/星/神/干，权重70%] | 辅助用神：[次要用神，权重30%] | 所问事项：[定位依据]

**候选要素**
1. 用神宫：[门+星+神+干+五行] → [现实对应] + [证据：规则引用]
2. 日干宫：[要素] → [求测人状态] + [证据]
3. 时干宫：[要素] → [事体动态] + [证据]
4. 对宫/冲合/刑害宫：[要素] → [互动影响] + [证据]
5. 特殊格局：[e.g., 三奇得使] → [吉凶定性] + [证据]
6. 辅助要素：[值符/值使寄宫、旬空填实] → [补充] + [证据]
7. 整体时空：[节气五行影响] → [环境] + [证据]

**隐性关联要素**
- [通过五行生克或特定格局与核心问题关联的次要因素]

### 2. 格局整合
**主格局判定**
- 核心格局：[名称] → [含义]
- 综合影响力指数：[评分]
- 主导倾向：[解释]

**次格局判定**
- 次要格局：[名称] → [含义]
- 制约强度：[影响程度]
- 影响性质：[促进/制约/中性]

**关键宫位互动链条**
- 日干宫与用神宫：[关系解析] → [求测者与事件的关系]
- 时干宫与用神宫：[关系解析] → [事件自身发展动力]
- 值符宫与用神宫：[关系解析] → [外部环境影响]

**格局动态演化**
- 主要驱动力：[核心力量]
- 主要制约力：[核心阻力]
- 吉凶趋势强度：[强/中/弱] + [依据]

### 3. 动态预测
**事件发展脉络**
- 起始状态：[用神宫初始能量] → [现实起点]
- 发展过程：[门星神干互动变化] → [中间过程]
- 结局趋势：[格局最终导向] → [最可能结果]

**关键节点预测**
- 触发条件：[具体必要条件]
- 临界点：[转折标志性事件]
- 潜在变数：[可能改变结局的因素]

**应期精准推算**
- 短期应期：[基于旬空填实/值符值使交会] → [日期/时间段]
- 中期应期：[基于用神宫五行相应地支] → [日期/时间段]
- 长期应期：[基于干支循环] → [日期/时间段]
- 应期性质：[事件表现形式]

**能量场动态变化**
- 上升期：[能量增强时段] → [有利行动时机]
- 平稳期：[能量稳定时段] → [适合维持状态]
- 下降期：[能量减弱时段] → [需谨慎行事]

### 4. 精准结论
**核心答案**
[直接回答问题，10-20字]

**结果预测**
- 主要结局：[最可能结果，80-90%概率]
- 次要结局：[次可能结果，10-20%概率]
- 确定性：[高/中/低] → [确定性依据]

**精准策略指导**
- 优势放大：[如何利用有利因素]
- 风险规避：[如何应对不利因素]
- 关键行动点：[1-2个具体行动]
- 时机把握：[最佳行动时间窗口]

**总结诗**
[4句结论总结诗，意象具体，指向结果倾向]`;



  try {
    const body = {
      "messages": [
        {
          "role": "system",
          "content": qimenPrompt
        },
        {
          "role": "user",
          "content": `用户问题：${question.value}\n\n奇门局JSON数据：${JSON.stringify(formattedPanData.value, null, 2)}`
        }
      ],
      "stream": false,
      "model": "glm-4-flash",
      "temperature": 0.7,
      "max_tokens": 40000
    }

    const response = await fetch("https://nas-ai.4ce.cn/v1/chat/completions", {
      "headers": {
        "authorization": "sk-L8W2WtnCtdwG6nctF975D0E770144dE5Be3123Fa16720a03", // 请替换为您的API Key
        "content-type": "application/json"
      },
      "body": JSON.stringify(body),
      "method": "POST"
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.choices && data.choices[0] && data.choices[0].message) {
      aiAnswer.value = data.choices[0].message.content
    } else {
      throw new Error('API返回数据格式异常')
    }

  } catch (err:any) {
    console.error('AI解答请求失败:', err)
    aiError.value = `AI解答失败: ${err.message}`
  } finally {
    aiLoading.value = false
  }
}
</script>

<style scoped>
.page-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}

.section-card {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
}

.operation-section {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.ai-section {
  display: flex;
  flex-direction: column;
}

.question-input {
  width: 100%;
  margin-bottom: 15px;
  font-size: 16px;
  border-radius: 8px;
}

.ai-interpret-button {
  width: 100%;
  height: 45px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  transition: all 0.3s ease;
}

.ai-interpret-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.ai-result-section {
  margin-top: 20px;
}

.ai-result-content {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 10px;
  border-left: 4px solid #667eea;
  white-space: pre-wrap;
}

.qimen-info {
  padding: 12px;
  line-height: 1.8;
  font-size: 15px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.grid-container > * {
  background: #fff;
  border: 2px solid #e4e7ed;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.grid-container > *:hover {
  transform: scale(1.05);
  border-color: #667eea;
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.2);
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.copy-combined-button {
  margin-top: 16px;
  width: 100%;
  height: 45px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(45deg, #4CAF50, #8BC34A);
  border: none;
  transition: all 0.3s ease;
}

.copy-combined-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
}

.copy-combined-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
