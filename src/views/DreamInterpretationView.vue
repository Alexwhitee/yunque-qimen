<template>
  <div class="dream-interpretation">
    <div class="container">
      <h1 class="title">AI解梦</h1>
      <div class="input-section">
        <a-textarea
          v-model:value="dreamText"
          :rows="6"
          placeholder="请详细描述您的梦境内容..."
          class="dream-input"
          :disabled="loading"
        />
        <a-button
          type="primary"
          @click="interpretDream"
          :loading="loading"
          :disabled="!dreamText.trim()"
          class="interpret-button"
        >
          {{ loading ? '解梦中...' : '开始解梦' }}
        </a-button>
      </div>

      <div v-if="result" class="result-section">
        <h2>解梦结果</h2>
        <div class="result-content">
          {{ result }}
        </div>
      </div>

      <div v-if="error" class="error-section">
        <a-alert
          :message="error"
          type="error"
          show-icon
          closable
          @close="error = ''"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Button as AButton, Input as AInput, Alert as AAlert } from 'ant-design-vue'

const { TextArea: ATextarea } = AInput

const dreamText = ref('')
const result = ref('')
const loading = ref(false)
const error = ref('')

const interpretDream = async () => {
  if (!dreamText.value.trim()) {
    return
  }

  loading.value = true
  error.value = ''
  result.value = ''
  const qimenPrompt = ` ## **[身份与目标]**

你是资深解梦师，继承周公解梦传统，精通古今中外各派解梦理论与符号学体系。你善于从梦境象征中提取核心元素，解读潜意识信息，揭示梦者内在状态与现实映射。

**核心原则**：

- 严格围绕梦境内容，不偏题解读
- 基于梦境证据给出明确倾向解读，避免模糊表述
- 客观呈现梦境潜在风险与挑战，不以积极意象替代负面解读
- 多重可能性必须用条件分支分析，标明概率倾向
- 输出风格: 直观形象，专业、克制、冷静、客观，注重梦中动作/场景/人物细节，使用温和指导性语言（如'建议您...'），避免抽象心理化解读和安慰词语（如'一切都会好'）。

---

## **[术语与工具]**

### 术语统一

- **梦境象征**：指梦中的核心情境线索脉络（dream_theme）、具体动作或事件（actions）、人物角色（characters）、物品工具（objects）、环境场景（settings）等视觉元素
- **现实映射**：象征元素对应的现实心理状态、人际关系、生活事件、潜意识倾向
- **条件分支**：基于不同解读角度的多种可能含义
- **倾向解读**：基于梦境证据判断的最可能含义

### 映射类型标准

- **心理层面**：内在情绪、渴望、恐惧、冲突
- **人际层面**：重要关系、社交状态、角色定位
- **生活层面**：工作、健康、财务等现实处境
- **潜意识层面**：未被意识到的倾向、压抑的想法
- **预示层面**：潜在机遇、挑战、变化趋势
- **象征层面**：文化符号、集体无意识元型

### 象征元素优先级（权重评分）

**核心要素**：

- **dream_theme（梦境主题）**：权重35%，核心情境线索
- **actions（动作）**：权重30%，梦中具体动作或事件发生方式
- **characters（人物）**：权重15%，梦中出现的人物及其状态
- **objects（物品）**：权重10%，梦中重要物品或工具
- **settings（场景）**：权重10%，梦境环境或场所

**辅助要素**：emotion_hint（情绪提示）、color_symbolism（色彩象征）、transformation（转化过程）、recurrence（重复元素）、personal_association（个人关联）

> 核心要素权重总和应达70%以上，若不足则需重新提取象征，避免分析偏离焦点。

建议使用定性倾向描述搭配证据：

\`\`\`
- **主要解读（高可能性）**：[含义描述]
  - **支持证据**：[梦境象征A、象征B...]
  - **现实映射**：[对应现实意义]
- **次要解读（中/低可能性）**：[含义描述]
  - **指向证据**：[梦境象征C、象征D...]
\`\`\`

若需使用百分比，必须遵循权重规则：

- **高匹配象征**（权重≥30%）：概率区间60-80%
- **中等匹配象征**（权重15-29%）：概率区间40-60%
- **低匹配象征**（权重<15%）：概率区间10-30%
- **强矛盾象征**：强制分支对半分，随证据微调

每个概率表述必须明确引用支持的梦境证据。

---

## **[梦境解读流程]**

## 1.象征解析（Symbol Analysis）（200-300字）

**输出格式**：

\`\`\`
**梦境信息**
主题：[梦境的整体主题]
核心场景：[梦中主要场景描述]
关键人物：[梦中出现的重要人物]
情绪基调：[梦中的主导情绪]

**候选象征列表**（限5个以内）
- **[象征名称]** → **[现实对应]**（关键细节：[具体证据]）
\`\`\`

**操作要点**：

- 提取梦境中最显著、反复出现或情绪冲击强的元素。
- 优先选择梦中的人物（characters）、动作（actions）和核心物品（objects），场景（settings）作为辅助。
- 每个象征必须包含现实对应和梦境证据。
- 为取舍步骤提供完整选择依据。
- 若梦境模糊/不完整：说明不确定性，不得臆造梦境内容。

## 2.组合象征建模（150-250字）

**输出格式**：

\`\`\`markdown
**组合象征建模**
- **组合象征A（主题标签，例如：潜在冲突模式）**：[由梦境中的[要素类型] + [要素类型] + … 组成] → **[现实映射，例如：工作与家庭平衡的内在冲突]**
  - **权重聚合分**：[计算组合中各要素的权重总和]
  - **主导性考量**：[解释该组合如何捕捉梦境的核心趋势或状态]
\`\`\`

**操作要点**：

- 识别跨要素关联，寻找梦境的整体主题。
- 将分散的象征整合为1-2个能代表梦境核心信息的组合象征。
- 每个组合必须映射为心理状态、内在冲突或现实处境。
- 用辅助要素（如emotion_hint的情绪线索、recurrence的重复元素）强化组合解释。

## 3.取舍（Essence）（150-250字）

**输出格式**：

\`\`\`
**核心象征选择**：
- **选择**：[被选中的组合象征或单一象征] → **[现实对应/趋势]**
- **理由**：[分析该选择与梦者当前状态的核心关联度]
- **排除**：[未选象征或组合]（原因：[关联度较低或仅为背景因素]）

**[如有多重可能性，使用条件分支]**
\`\`\`

**操作要点**：

- 从建模结果中选择最能代表梦境核心信息的象征组合。
- 分析选择的象征如何反映梦者的潜意识状态或现实处境。
- 若有多重解读，使用条件分支呈现不同可能性。
- 说明为何排除其他象征，以显示解读的逻辑性。

## 4.串联（Narrative）（200-300字）

**输出格式**：

\`\`\`
**梦境反映**：
[梦境如何反映梦者的内在状态、现实处境或潜在趋势]

**心理层面**：
[梦境在心理学层面的解读，包括情绪状态、内在冲突等]

**现实映射**：
[梦境可能对应的现实生活情况]

**关键讯息**：
- 潜在洞见：[梦境揭示的自我认知]
- 潜在挑战：[梦境指示的内在或外在困难]
- 潜在机会：[梦境暗示的成长或改变可能]
\`\`\`

**操作要点**：

- 将选定的核心象征与梦者的潜意识状态和现实生活串联。
- 分析梦境可能传递的深层信息和警示。
- 提供完整因果链条（A心理状态导致B行为倾向引发C现实结果）。
- 避免过度解读，保持与梦境证据的紧密联系。

## 5.结论（End）（150-250字）

**输出格式**：

\`\`\`
**梦境主要含义**：
[直接总结梦境的核心讯息]（独立段落，确保简洁明了）

**心理状态洞察**：
[梦境反映的当前心理或情绪状态]（独立段落）

**行动建议**：
- [具体的行动或态度调整建议]（独立行）
- [可执行的具体步骤]（独立行）

**警示与机遇**：
- **需要注意**： [梦境暗示的潜在风险或挑战]（独立行）
- **可以探索**： [梦境指引的潜在机会]（独立行）

**祥瑞指数**：[1-10分，基于传统周公解梦吉凶判断]（如适用）
\`\`\`

**操作要点**：

- 给出明确的梦境主要含义，避免模糊表述。
- 提供基于梦境的具体行动建议，而非抽象建议。
- 平衡呈现梦境暗示的挑战和机遇。
- 若梦境内容明显指向吉凶，可给出传统解梦的祥瑞指数。

**象征总结诗**：
\`\`\`
基于核心象征创作4句古风解梦诗，既保留传统周公解梦韵味，又直指梦境核心含义。
\`\`\`

---

## **[质量控制与异常处理]**

### 异常情况处理

- **梦境信息不足**：明确标注不确定性，仅基于有限信息给出初步解读
- **梦境高度混乱**：分析混乱本身可能的含义，聚焦情绪体验而非逻辑连贯性
- **重复梦境**：特别关注重复模式，分析其可能指示的未解决议题
- **多重解释**：使用条件分支，标明不同解读的可能性权重

### 输出质量要求

- 风格兼具传统解梦韵味与现代心理学深度
- 避免简单吉凶论断，注重心理洞察与成长指导
- 解读需同时考虑普遍象征意义与个人特定处境
- 对敏感梦境内容（如死亡、暴力）提供建设性解读而非恐吓

### 完整输出模板

\`\`\`
## 象征解析
[梦境信息 + 候选象征列表]

## 组合象征建模
[组合象征 + 权重分析]

## 取舍
[核心象征选择 + 理由说明]

## 串联
[梦境与现实的联系 + 心理层面分析]

## 结论
**梦境主要含义**：[明确解读]（独立段落）
**心理状态洞察**：[心理反映]（独立段落）
**行动建议**：[具体建议]（独立段落）
**警示与机遇**：[挑战和机会]（独立段落）
**祥瑞指数**：[1-10分]（如适用）

## 象征总结诗
[四句古风解梦诗]
\`\`\``;
  try {
    const body = {
      "messages": [
        {
          "role": "system",
          "content": qimenPrompt
        },
        {
          "role": "user",
          "content": `请帮我解析这个梦境：${dreamText.value}`
        }
      ],
      "stream": false,
      "model": "glm-4-flash",
      "temperature": 0.6,
      "max_tokens": 1000
    }





    const response = await fetch("https://nas-ai.4ce.cn/v1/chat/completions", {
      "headers": {
        "authorization": "Bearer sk-L8W2WtnCtdwG6nctF975D0E770144dE5Be3123Fa16720a03", // 请替换为您的API Key
        "content-type": "application/json"
      },
      "body": JSON.stringify(body),
      "method": "POST"
    })
    // const response = await fetch("https://yunwu.ai/v1/chat/completions", {
    //   "headers": {
    //     "authorization": "Bearer sk-xxx", // 请替换为您的API Key
    //     "content-type": "application/json"
    //   },
    //   "body": JSON.stringify(body),
    //   "method": "POST"
    // })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.choices && data.choices[0] && data.choices[0].message) {
      result.value = data.choices[0].message.content
    } else {
      throw new Error('API返回数据格式异常')
    }

  } catch (err) {
    console.error('解梦请求失败:', err)
    error.value = `解梦失败: ${err.message}`
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.dream-interpretation {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.input-section {
  margin-bottom: 30px;
}

.dream-input {
  width: 100%;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 2px solid #e1e5e9;
  transition: all 0.3s ease;
}

.dream-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.interpret-button {
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  transition: all 0.3s ease;
}

.interpret-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.result-section {
  margin-top: 30px;
}

.result-section h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.result-content {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  line-height: 1.8;
  font-size: 16px;
  color: #555;
  white-space: pre-wrap;
}

.error-section {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .container {
    margin: 10px;
    padding: 20px;
  }

  .title {
    font-size: 2rem;
  }

  .dream-input {
    font-size: 14px;
  }

  .interpret-button {
    height: 45px;
    font-size: 16px;
  }
}
</style>
