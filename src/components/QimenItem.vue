<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="wrapper">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="wrapper-item">&ndash;&gt;-->
<!--&lt;!&ndash;            <span >{{ viewData.暗干 }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;            <span>{{ viewData.八神 }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;            <span class="placeholder">空</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="wrapper-item">&ndash;&gt;-->
<!--&lt;!&ndash;            <span class="placeholder">空 </span>&ndash;&gt;-->
<!--&lt;!&ndash;            <span v-if="viewData.八门" style="font-size: 24px;" :style="{ color: getFontColor('八门', viewData.八门) }">{{ viewData.八门 }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;            <span v-else style="font-size: 24px;" :style="{ color: getFontColor('八门', viewData.八门) }" class="placeholder">空</span>&ndash;&gt;-->
<!--&lt;!&ndash;            <span class="placeholder"> 马</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="wrapper-item">&ndash;&gt;-->
<!--&lt;!&ndash;            <span v-if="viewData.天盘1" :style="{ color: getFontColor('天干', viewData.天盘1) }">{{ viewData.天盘1 }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;            <span v-else class="placeholder">空</span>&ndash;&gt;-->
<!--&lt;!&ndash;            <span :style="{ color: getFontColor('九星', viewData.九星) }">{{ viewData.九星 }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;            <span :style="{ color: getFontColor('天干', viewData.天盘) }">{{ viewData.天盘 }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="wrapper-item">&ndash;&gt;-->
<!--&lt;!&ndash;            <span class="placeholder">符</span>&ndash;&gt;-->
<!--&lt;!&ndash;            <span>{{ index }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;            <span :style="{ color: getFontColor('天干', viewData.地盘) }">{{ viewData.地盘 }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<script setup>&ndash;&gt;-->
<!--&lt;!&ndash;import { computed, defineProps, reactive } from "vue";&ndash;&gt;-->
<!--&lt;!&ndash;import { useQimenStore } from "../stores/index";&ndash;&gt;-->
<!--&lt;!&ndash;import Config from "../qimendunjia/config";&ndash;&gt;-->
<!--&lt;!&ndash;const props = defineProps(&ndash;&gt;-->
<!--&lt;!&ndash;    { index: String }&ndash;&gt;-->
<!--&lt;!&ndash;);&ndash;&gt;-->



<!--&lt;!&ndash;// 奇门盘数据&ndash;&gt;-->
<!--&lt;!&ndash;const store = useQimenStore()&ndash;&gt;-->
<!--&lt;!&ndash;const index = props.index;&ndash;&gt;-->

<!--&lt;!&ndash;// 获取当前八卦方位&ndash;&gt;-->
<!--&lt;!&ndash;const bagua = Config.gongs_code[index];&ndash;&gt;-->
<!--&lt;!&ndash;const viewData =  store.getGongViewData(bagua);&ndash;&gt;-->

<!--&lt;!&ndash;// 五行颜色对照表&ndash;&gt;-->
<!--&lt;!&ndash;const wuxingColor = {&ndash;&gt;-->
<!--&lt;!&ndash;    金: '#f28413',&ndash;&gt;-->
<!--&lt;!&ndash;    木: '#167318',&ndash;&gt;-->
<!--&lt;!&ndash;    水: '#08059c',&ndash;&gt;-->
<!--&lt;!&ndash;    火: '#bf403a',&ndash;&gt;-->
<!--&lt;!&ndash;    土: '#87561e',&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;// 所有符号的五行属性对照表&ndash;&gt;-->
<!--&lt;!&ndash;const wuxingMap = {&ndash;&gt;-->
<!--&lt;!&ndash;    八门: {&ndash;&gt;-->
<!--&lt;!&ndash;        "休": '水',&ndash;&gt;-->
<!--&lt;!&ndash;        "死": '土',&ndash;&gt;-->
<!--&lt;!&ndash;        "傷": '木',&ndash;&gt;-->
<!--&lt;!&ndash;        "杜": '木',&ndash;&gt;-->
<!--&lt;!&ndash;        "開": '金',&ndash;&gt;-->
<!--&lt;!&ndash;        "驚": '金',&ndash;&gt;-->
<!--&lt;!&ndash;        "生": '土',&ndash;&gt;-->
<!--&lt;!&ndash;        "景": '火',&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    八神: {},&ndash;&gt;-->
<!--&lt;!&ndash;    九星: {&ndash;&gt;-->
<!--&lt;!&ndash;        "蓬": '水',&ndash;&gt;-->
<!--&lt;!&ndash;        "芮": '土',&ndash;&gt;-->
<!--&lt;!&ndash;        "沖": '木',&ndash;&gt;-->
<!--&lt;!&ndash;        "輔": '木',&ndash;&gt;-->
<!--&lt;!&ndash;        "禽": '土',&ndash;&gt;-->
<!--&lt;!&ndash;        "心": '金',&ndash;&gt;-->
<!--&lt;!&ndash;        "柱": '金',&ndash;&gt;-->
<!--&lt;!&ndash;        "任": '土',&ndash;&gt;-->
<!--&lt;!&ndash;        "英": '火',&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    天干: {&ndash;&gt;-->
<!--&lt;!&ndash;        甲: '木',&ndash;&gt;-->
<!--&lt;!&ndash;        乙: '木',&ndash;&gt;-->
<!--&lt;!&ndash;        丙: '火',&ndash;&gt;-->
<!--&lt;!&ndash;        丁: '火',&ndash;&gt;-->
<!--&lt;!&ndash;        戊: '土',&ndash;&gt;-->
<!--&lt;!&ndash;        己: '土',&ndash;&gt;-->
<!--&lt;!&ndash;        庚: '金',&ndash;&gt;-->
<!--&lt;!&ndash;        辛: '金',&ndash;&gt;-->
<!--&lt;!&ndash;        壬: '水',&ndash;&gt;-->
<!--&lt;!&ndash;        癸: '水',&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/**&ndash;&gt;-->
<!--&lt;!&ndash; * 根据类型和符号获取五行对应的颜色&ndash;&gt;-->
<!--&lt;!&ndash; * @param {*} type 类型：八门、九星、天干 &ndash;&gt;-->
<!--&lt;!&ndash; * @param {*} value 值&ndash;&gt;-->
<!--&lt;!&ndash; */&ndash;&gt;-->
<!--&lt;!&ndash;function getFontColor(type, value) {&ndash;&gt;-->
<!--&lt;!&ndash;    const wuxing = wuxingMap[type][value]&ndash;&gt;-->
<!--&lt;!&ndash;    return wuxingColor[wuxing];&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->
<!--&lt;!&ndash;  &ndash;&gt;-->
<!--&lt;!&ndash;<style>&ndash;&gt;-->
<!--&lt;!&ndash;.wrapper {}&ndash;&gt;-->

<!--&lt;!&ndash;.wrapper-item {&ndash;&gt;-->
<!--&lt;!&ndash;    display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;    justify-content: space-between;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;/** 占位 */&ndash;&gt;-->
<!--&lt;!&ndash;.placeholder {&ndash;&gt;-->
<!--&lt;!&ndash;    visibility: hidden;&ndash;&gt;-->
<!--&lt;!&ndash;    margin: 0;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->
<!--&lt;!&ndash; &ndash;&gt;-->


<!--<template>-->
<!--  <div class="wrapper">-->
<!--    &lt;!&ndash; 第一行：暗干、八神、空亡状态 &ndash;&gt;-->
<!--    <div class="wrapper-item">-->
<!--      <span>{{ viewData.暗干 }}</span>-->
<!--      <span>{{ viewData.八神 }}</span>-->
<!--      <span v-if="viewData.空亡" class="status-indicator void">空</span>-->
<!--      <span v-else class="placeholder">空</span>-->
<!--    </div>-->

<!--    &lt;!&ndash; 第二行：门迫状态、八门、马星 &ndash;&gt;-->
<!--    <div class="wrapper-item">-->
<!--      <span v-if="viewData.门迫" class="status-indicator pressed">迫</span>-->
<!--      <span v-else class="placeholder">迫</span>-->
<!--      <span v-if="viewData.八门" style="font-size: 24px;" :style="{ color: getFontColor('八门', viewData.八门) }">{{ viewData.八门 }}</span>-->
<!--      <span v-else style="font-size: 24px;" class="placeholder">空</span>-->
<!--      <span class="placeholder">马</span>-->
<!--    </div>-->

<!--    &lt;!&ndash; 第三行：天盘1、九星、天盘（主天干） &ndash;&gt;-->
<!--    <div class="wrapper-item">-->
<!--      <span v-if="viewData.天盘1" :style="{ color: getFontColor('天干', viewData.天盘1) }">{{ viewData.天盘1 }}</span>-->
<!--      <span v-else class="placeholder">空</span>-->
<!--      <span :style="{ color: getFontColor('九星', viewData.九星) }">{{ viewData.九星 }}</span>-->
<!--      <span :style="{ color: getFontColor('天干', viewData.天盘) }" class="heaven-stem">-->
<!--                {{ viewData.天盘 }}-->
<!--                <span v-if="isPunished" class="punishment-indicator">击</span>-->
<!--            </span>-->
<!--    </div>-->

<!--    &lt;!&ndash; 第四行：符使标记、宫位、地盘 &ndash;&gt;-->
<!--    <div class="wrapper-item">-->
<!--      <span class="placeholder">符</span>-->
<!--      <span class="gong-index">{{ index }}</span>-->
<!--      <span :style="{ color: getFontColor('天干', viewData.地盘) }">{{ viewData.地盘 }}</span>-->
<!--    </div>-->

<!--    &lt;!&ndash; 第五行：宫位五行信息 &ndash;&gt;-->
<!--    <div class="wrapper-item five-element-row">-->
<!--            <span class="five-element" :style="{ color: getFontColor('宫位五行', viewData.宫位五行) }">-->
<!--                {{ viewData.宫位五行 }}行-->
<!--            </span>-->
<!--      <span class="life-cycle-info">{{ lifeCycleDisplay }}</span>-->
<!--      <span class="placeholder">占位</span>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { computed, defineProps } from "vue";-->
<!--import { useQimenStore } from "../stores/index";-->
<!--import Config from "../qimendunjia/config";-->

<!--const props = defineProps({-->
<!--  index: String-->
<!--});-->

<!--// 奇门盘数据-->
<!--const store = useQimenStore();-->
<!--const index = props.index;-->

<!--// 获取当前八卦方位-->
<!--const bagua = Config.gongs_code[index];-->
<!--const viewData = store.getGongViewData(bagua);-->

<!--// 从格式化数据中获取详细信息-->
<!--const formattedData = computed(() => {-->
<!--  return store.formattedPanData?.palaces?.[bagua] || {};-->
<!--});-->

<!--// 判断天干是否被击刑-->
<!--const isPunished = computed(() => {-->
<!--  const heavenStem = viewData.value?.天盘;-->
<!--  if (!heavenStem || !formattedData.value.life_cycle?.heaven?.[heavenStem]) {-->
<!--    return false;-->
<!--  }-->

<!--  const lifeCycleData = formattedData.value.life_cycle.heaven[heavenStem];-->
<!--  return lifeCycleData.some(item => item.heaven_stem_punishment_desc === '六击');-->
<!--});-->

<!--// 生旺墓显示信息-->
<!--const lifeCycleDisplay = computed(() => {-->
<!--  const heavenStem = viewData.value?.天盘;-->
<!--  if (!heavenStem || !formattedData.value.life_cycle?.heaven?.[heavenStem]) {-->
<!--    return '';-->
<!--  }-->

<!--  const lifeCycleData = formattedData.value.life_cycle.heaven[heavenStem];-->
<!--  if (lifeCycleData.length > 0 && lifeCycleData[0].stage) {-->
<!--    return lifeCycleData[0].stage; // 显示第一个生旺墓状态-->
<!--  }-->
<!--  return '';-->
<!--});-->

<!--// 五行颜色对照表-->
<!--const wuxingColor = {-->
<!--  金: '#f28413',-->
<!--  木: '#167318',-->
<!--  水: '#08059c',-->
<!--  火: '#bf403a',-->
<!--  土: '#87561e',-->
<!--};-->

<!--// 所有符号的五行属性对照表-->
<!--const wuxingMap = {-->
<!--  八门: {-->
<!--    "休": '水',-->
<!--    "死": '土',-->
<!--    "傷": '木',-->
<!--    "杜": '木',-->
<!--    "開": '金',-->
<!--    "驚": '金',-->
<!--    "生": '土',-->
<!--    "景": '火',-->
<!--  },-->
<!--  八神: {},-->
<!--  九星: {-->
<!--    "蓬": '水',-->
<!--    "芮": '土',-->
<!--    "沖": '木',-->
<!--    "輔": '木',-->
<!--    "禽": '土',-->
<!--    "心": '金',-->
<!--    "柱": '金',-->
<!--    "任": '土',-->
<!--    "英": '火',-->
<!--  },-->
<!--  天干: {-->
<!--    甲: '木',-->
<!--    乙: '木',-->
<!--    丙: '火',-->
<!--    丁: '火',-->
<!--    戊: '土',-->
<!--    己: '土',-->
<!--    庚: '金',-->
<!--    辛: '金',-->
<!--    壬: '水',-->
<!--    癸: '水',-->
<!--  },-->
<!--  宫位五行: {-->
<!--    金: '金',-->
<!--    木: '木',-->
<!--    水: '水',-->
<!--    火: '火',-->
<!--    土: '土',-->
<!--  }-->
<!--};-->

<!--/**-->
<!-- * 根据类型和符号获取五行对应的颜色-->
<!-- * @param {string} type 类型：八门、九星、天干、宫位五行-->
<!-- * @param {string} value 值-->
<!-- */-->
<!--function getFontColor(type, value) {-->
<!--  const wuxing = wuxingMap[type]?.[value];-->
<!--  return wuxing ? wuxingColor[wuxing] : '#000000';-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.wrapper {-->
<!--  border: 1px solid #d9d9d9;-->
<!--  padding: 4px;-->
<!--  height: 100%;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  justify-content: space-between;-->
<!--  background-color: white;-->
<!--  font-size: 12px;-->
<!--}-->

<!--.wrapper-item {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin: 1px 0;-->
<!--}-->

<!--.five-element-row {-->
<!--  font-size: 10px;-->
<!--  border-top: 1px solid #f0f0f0;-->
<!--  padding-top: 2px;-->
<!--}-->

<!--/* 状态指示器 */-->
<!--.status-indicator {-->
<!--  font-size: 10px;-->
<!--  padding: 1px 3px;-->
<!--  border-radius: 2px;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.status-indicator.void {-->
<!--  background-color: #ff4d4f;-->
<!--  color: white;-->
<!--}-->

<!--.status-indicator.pressed {-->
<!--  background-color: #faad14;-->
<!--  color: white;-->
<!--}-->

<!--/* 天干击刑标记 */-->
<!--.heaven-stem {-->
<!--  position: relative;-->
<!--  display: inline-block;-->
<!--}-->

<!--.punishment-indicator {-->
<!--  position: absolute;-->
<!--  top: -8px;-->
<!--  right: -8px;-->
<!--  font-size: 8px;-->
<!--  color: #ff4d4f;-->
<!--  background-color: white;-->
<!--  border: 1px solid #ff4d4f;-->
<!--  border-radius: 50%;-->
<!--  width: 12px;-->
<!--  height: 12px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  line-height: 1;-->
<!--}-->

<!--/* 宫位索引 */-->
<!--.gong-index {-->
<!--  font-weight: bold;-->
<!--  font-size: 14px;-->
<!--}-->

<!--/* 五行信息 */-->
<!--.five-element {-->
<!--  font-weight: bold;-->
<!--}-->

<!--.life-cycle-info {-->
<!--  font-size: 10px;-->
<!--  color: #666;-->
<!--}-->

<!--/* 占位符 */-->
<!--.placeholder {-->
<!--  visibility: hidden;-->
<!--  margin: 0;-->
<!--}-->
<!--</style>-->


<template>
  <div class="wrapper">
    <!-- 第一行：暗干、八神、空亡状态 -->
    <div class="wrapper-item">
      <span v-if="viewData.暗干" :style="{ color: getFontColor('天干', viewData.暗干) }">{{ viewData.暗干 }}</span>
      <span v-else class="placeholder">空</span>
      <span class="eight-god">{{ getFullEightGodName(viewData.八神) }}</span>
      <span v-if="viewData.空亡" class="status-indicator void">空亡</span>
      <span v-else class="placeholder">空亡</span>
    </div>

    <!-- 第二行：门迫状态、八门、马星 -->
    <div class="wrapper-item">
      <span v-if="viewData.门迫" class="status-indicator pressed">门迫</span>
      <span v-else class="placeholder">门迫</span>
      <span v-if="viewData.八门"
            style="font-size: 20px;"
            :style="{ color: getFontColor('八门', viewData.八门) }"
            class="eight-door">
        {{ getFullEightDoorName(viewData.八门) }}
      </span>
<!--      &lt;!&ndash; 驛馬显示 &ndash;&gt;-->
<!--      <span v-if="viewData.驛馬" class="status-indicator yima">驿马</span>-->
<!--      <span v-else class="placeholder">驿马</span>-->


<!--      <div v-if="store.panData" class="wrapper">-->
<!--        ...-->
<!--        &lt;!&ndash; 驿马显示 &ndash;&gt;-->
<!--        <span v-if="viewData.驛馬" class="status-indicator yima">驿马</span>-->
<!--        <span v-else class="placeholder">驿马</span>-->
<!--        ...-->
<!--      </div>-->
    </div>

    <!-- 第三行：天盘1、九星、天盘（主天干） -->
    <div class="wrapper-item">
      <span v-if="viewData.天盘1"
            :style="{ color: getFontColor('天干', viewData.天盘1) }"
            :class="{ 'tomb-stem': isInTomb('天盘1', viewData.天盘1) }">
        {{ viewData.天盘1 }}
      </span>
      <span v-else class="placeholder">空</span>
      <span class="nine-star" :style="{ color: getFontColor('九星', viewData.九星) }">
        {{ getFullNineStarName(viewData.九星) }}
      </span>
      <span :style="{ color: getFontColor('天干', viewData.天盘) }"
            :class="{ 'tomb-stem': isInTomb('天盘', viewData.天盘) }"
            class="heaven-stem">
        {{ viewData.天盘 }}
        <span v-if="isPunished" class="punishment-indicator">六击</span>
      </span>
    </div>

    <!-- 第四行：符使标记、宫位、地盘 -->
    <div class="wrapper-item">
      <span class="fu-shi-marker">
        <span v-if="isQimenFu" class="status-indicator fu">奇门符</span>
        <span v-else-if="isQimenShi" class="status-indicator shi">奇门使</span>
        <span v-else class="placeholder">符使</span>
      </span>
      <span class="gong-index">
  {{ index }} {{ gongwei[index] }}
</span>
      <span :style="{ color: getFontColor('天干', viewData.地盘) }"
            :class="{ 'tomb-stem': isInTomb('地盘', viewData.地盘) }">
        {{ viewData.地盘 }}
      </span>
    </div>

    <!-- 第五行：宫位五行、天盘生旺墓、地盘生旺墓 -->
    <div class="wrapper-item five-element-row">
      <span class="five-element" :style="{ color: getFontColor('宫位五行', viewData.宫位五行) }">
        {{ viewData.宫位五行 }}
      </span>
      <span class="life-cycle-info">
        <span v-if="heavenLifeCycle" class="heaven-lifecycle">天盘:{{ heavenLifeCycle }}</span>
        <span v-if="earthLifeCycle" class="earth-lifecycle">地盘:{{ earthLifeCycle }}</span>
      </span>
      <span class="door-status">
        <span v-if="viewData.门迫" class="door-pressed-info">此门受迫</span>
        <span v-else class="door-normal-info">门位正常</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useQimenStore } from "../stores/index";
import Config from "../qimendunjia/config";

const props = defineProps({
  index: String
});

// 奇门盘数据
const store = useQimenStore();
const index = props.index;

// 获取当前八卦方位
const bagua = Config.gongs_code[index];
const viewData = store.getGongViewData(bagua);
// 从格式化数据中获取详细信息
const formattedData = computed(() => {
  return store.formattedPanData?.palaces?.[bagua] || {};
});


// 如果写在 <script setup> 里
const gongwei = {
  一: '坎宫',
  二: '坤宫',
  三: '震宫',
  四: '巽宫',
  五: '中宫',
  六: '乾宫',
  七: '兑宫',
  八: '艮宫',
  九: '离宫'
};

// 八门完整名称映射
const eightDoorNames = {
  "休": "休门",
  "死": "死门",
  "傷": "伤门",
  "杜": "杜门",
  "開": "开门",
  "驚": "惊门",
  "生": "生门",
  "景": "景门"
};

// 九星完整名称映射
const nineStarNames = {
  "蓬": "天蓬",
  "芮": "天芮",
  "沖": "天冲",
  "輔": "天辅",
  "禽": "天禽",
  "心": "天心",
  "柱": "天柱",
  "任": "天任",
  "英": "天英"
};

// 八神完整名称映射
const eightGodNames = {
  "符": "值符",
  "蛇": "腾蛇",
  "陰": "太阴",
  "合": "六合",
  "玄": "玄武",
  "虎": "白虎",
  "地": "九地",
  "天": "九天"
};

// 获取八门完整名称
function getFullEightDoorName(door) {
  return eightDoorNames[door] || door || '';
}

// 获取九星完整名称
function getFullNineStarName(star) {
  return nineStarNames[star] || star || '';
}

// 获取八神完整名称
function getFullEightGodName(god) {
  return eightGodNames[god] || god || '';
}

// 判断是否为奇门符
const isQimenFu = computed(() => {
  // 这里需要根据你的数据结构来判断
  // 示例逻辑，请根据实际情况修改
  return formattedData.value.is_qimen_fu || false;
});

// 判断是否为奇门使
const isQimenShi = computed(() => {
  // 这里需要根据你的数据结构来判断
  // 示例逻辑，请根据实际情况修改
  return formattedData.value.is_qimen_shi || false;
});

// 判断天干是否被击刑
const isPunished = computed(() => {
  const heavenStem = viewData.value?.天盘;
  if (!heavenStem || !formattedData.value.life_cycle?.heaven?.[heavenStem]) {
    return false;
  }

  const lifeCycleData = formattedData.value.life_cycle.heaven[heavenStem];
  return lifeCycleData.some(item => item.heaven_stem_punishment_desc === '击刑');
});

// 天盘生旺墓显示信息
const heavenLifeCycle = computed(() => {
  const heavenStem = viewData.value?.天盘;
  if (!heavenStem || !formattedData.value.life_cycle?.heaven?.[heavenStem]) {
    return '';
  }

  const lifeCycleData = formattedData.value.life_cycle.heaven[heavenStem];
  if (lifeCycleData.length > 0 && lifeCycleData[0].stage) {
    return lifeCycleData[0].stage;
  }
  return '';
});

// 地盘生旺墓显示信息
const earthLifeCycle = computed(() => {
  const earthStem = viewData.value?.地盘;
  if (!earthStem || !formattedData.value.life_cycle?.earth?.[earthStem]) {
    return '';
  }

  const lifeCycleData = formattedData.value.life_cycle.earth[earthStem];
  if (lifeCycleData.length > 0 && lifeCycleData[0].stage) {
    return lifeCycleData[0].stage;
  }
  return '';
});

// 判断天干是否入墓
const isInTomb = (type, stem) => {
  if (!stem) return false;

  let lifeCycleData = null;

  if (type === '天盘' || type === '天盘1') {
    lifeCycleData = formattedData.value.life_cycle?.heaven?.[stem];
  } else if (type === '地盘') {
    lifeCycleData = formattedData.value.life_cycle?.earth?.[stem];
  }

  if (!lifeCycleData || lifeCycleData.length === 0) return false;

  // 检查是否有"墓"状态
  return lifeCycleData.some(item => item.stage === '墓');
};

// 五行颜色对照表
const wuxingColor = {
  金: '#f28413',
  木: '#167318',
  水: '#08059c',
  火: '#bf403a',
  土: '#87561e',
};

// 所有符号的五行属性对照表
const wuxingMap = {
  八门: {
    "休": '水',
    "死": '土',
    "傷": '木',
    "杜": '木',
    "開": '金',
    "驚": '金',
    "生": '土',
    "景": '火',
  },
  八神: {},
  九星: {
    "蓬": '水',
    "芮": '土',
    "沖": '木',
    "輔": '木',
    "禽": '土',
    "心": '金',
    "柱": '金',
    "任": '土',
    "英": '火',
  },
  天干: {
    甲: '木',
    乙: '木',
    丙: '火',
    丁: '火',
    戊: '土',
    己: '土',
    庚: '金',
    辛: '金',
    壬: '水',
    癸: '水',
  },
  宫位五行: {
    金: '金',
    木: '木',
    水: '水',
    火: '火',
    土: '土',
  }
};

/**
 * 根据类型和符号获取五行对应的颜色
 * @param {string} type 类型：八门、九星、天干、宫位五行
 * @param {string} value 值
 */
function getFontColor(type, value) {
  const wuxing = wuxingMap[type]?.[value];
  return wuxing ? wuxingColor[wuxing] : '#000000';
}
</script>

<style scoped>
.wrapper {
  border: 1px solid #d9d9d9;
  padding: 4px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  font-size: 12px;
}

.wrapper-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1px 0;
}

.five-element-row {
  font-size: 10px;
  border-top: 1px solid #f0f0f0;
  padding-top: 2px;
}

/* 状态指示器 */
.status-indicator {
  font-size: 9px;
  padding: 1px 2px;
  border-radius: 2px;
  font-weight: bold;
  white-space: nowrap;
}

.status-indicator.void {
  background-color: #ff4d4f;
  color: white;
}

.status-indicator.pressed {
  background-color: #faad14;
  color: white;
}

.status-indicator.fu {
  background-color: #722ed1;
  color: white;
}

.status-indicator.shi {
  background-color: #13c2c2;
  color: white;
}

/* 八门、九星、八神样式 */
.eight-door {
  font-weight: bold;
  white-space: nowrap;
}

.nine-star {
  font-weight: bold;
  white-space: nowrap;
  font-size: 11px;
}

.eight-god {
  font-size: 11px;
  white-space: nowrap;
}

/* 天干击刑标记 */
.heaven-stem {
  position: relative;
  display: inline-block;
}



.punishment-indicator {
  position: absolute;
  top: -10px;
  right: -12px;
  font-size: 7px;
  color: #ff4d4f;
  background-color: white;
  border: 1px solid #ff4d4f;
  border-radius: 2px;
  padding: 0px 1px;
  line-height: 1;
  white-space: nowrap;
}

/* 入墓天干特殊标记 */
.tomb-stem {
  background-color: #722ed1 !important;
  color: white !important;
  padding: 1px 3px;
  border-radius: 3px;
  font-weight: bold;
}

/* 宫位索引 */
.gong-index {
  font-weight: bold;
  font-size: 13px;
  white-space: nowrap;
}

/* 五行信息 */
.five-element {
  font-weight: bold;
}

.life-cycle-info {
  font-size: 8px;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
}

.heaven-lifecycle {
  color: #1890ff;
  white-space: nowrap;
}

.earth-lifecycle {
  color: #52c41a;
  white-space: nowrap;
}

/* 门迫状态信息 */
.door-status {
  font-size: 8px;
}

.door-pressed-info {
  color: #faad14;
  font-weight: bold;
}

.door-normal-info {
  color: #52c41a;
  font-weight: normal;
}

/* 占位符 */
.placeholder {
  visibility: hidden;
  margin: 0;
}

.status-indicator.yima {
  background-color: #52c41a;
  color: white;
  font-weight: bold;
}


</style>
