<template>
  <div class="json-viewer">
    <div class="json-header">
      <button @click="toggleExpanded" class="toggle-button">
        {{ isExpanded ? '收起' : '展开' }} JSON
      </button>
      <button @click="copyJson" class="copy-button">复制JSON</button>
    </div>
    <div v-if="isExpanded" class="json-content">
      <JsonNode :data="jsonData" :name="'root'" :level="0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import JsonNode from './JsonNode.vue';

const props = defineProps<{
  jsonData: object | null;
}>();

const isExpanded = ref(false);

const formattedJson = computed(() => {
  return props.jsonData ? JSON.stringify(props.jsonData, null, 2) : '';
});

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

const copyJson = () => {
  if (props.jsonData) {
    navigator.clipboard.writeText(formattedJson.value)
      .then(() => {
        alert('JSON已复制到剪贴板！');
      })
      .catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制。');
      });
  }
};
</script>

<style scoped>
.json-viewer {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f9fa;
}

.json-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #e9ecef;
  border-bottom: 1px solid #ddd;
  border-radius: 4px 4px 0 0;
}

.toggle-button, .copy-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.toggle-button {
  background-color: #6c757d;
  color: white;
}

.toggle-button:hover {
  background-color: #5a6268;
}

.copy-button {
  background-color: #007bff;
  color: white;
}

.copy-button:hover {
  background-color: #0056b3;
}

.json-content {
  padding: 15px;
  max-height: 500px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.4;
}
</style>
