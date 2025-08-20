<template>
  <div class="json-node" :style="{ marginLeft: level * 20 + 'px' }">
    <div v-if="isObject || isArray" class="node-header" @click="toggleExpanded">
      <span class="toggle-icon">{{ isExpanded ? '▼' : '▶' }}</span>
      <span class="node-key">{{ displayName }}</span>
      <span class="node-type">{{ isArray ? 'Array[' + objectKeys.length + ']' : 'Object{' + objectKeys.length + '}' }}</span>
    </div>
    
    <div v-else class="node-leaf">
      <span class="node-key">{{ displayName }}:</span>
      <span class="node-value" :class="valueClass">{{ displayValue }}</span>
    </div>
    
    <div v-if="(isObject || isArray) && isExpanded" class="node-children">
      <JsonNode 
        v-for="(value, key) in data" 
        :key="key"
        :data="value" 
        :name="key" 
        :level="level + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  data: any;
  name: string | number;
  level: number;
}>();

const isExpanded = ref(false);

const isObject = computed(() => {
  return props.data !== null && typeof props.data === 'object' && !Array.isArray(props.data);
});

const isArray = computed(() => {
  return Array.isArray(props.data);
});

const objectKeys = computed(() => {
  if (isObject.value || isArray.value) {
    return Object.keys(props.data);
  }
  return [];
});

const displayName = computed(() => {
  return props.name === 'root' ? '' : props.name;
});

const displayValue = computed(() => {
  if (props.data === null) return 'null';
  if (props.data === undefined) return 'undefined'; // 修复这里的语法错误
  if (typeof props.data === 'string') return `"${props.data}"`;
  return String(props.data);
});

const valueClass = computed(() => {
  if (props.data === null || props.data === undefined) return 'null-value';
  if (typeof props.data === 'string') return 'string-value';
  if (typeof props.data === 'number') return 'number-value';
  if (typeof props.data === 'boolean') return 'boolean-value';
  return '';
});

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.json-node {
  margin: 2px 0;
}

.node-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  border-radius: 3px;
}

.node-header:hover {
  background-color: #e9ecef;
}

.toggle-icon {
  width: 12px;
  font-size: 10px;
  color: #6c757d;
  margin-right: 4px;
}

.node-key {
  font-weight: 600;
  color: #495057;
  margin-right: 8px;
}

.node-type {
  font-size: 11px;
  color: #6c757d;
  font-style: italic;
}

.node-leaf {
  display: flex;
  align-items: center;
  padding: 1px 4px;
}

.node-leaf .node-key {
  margin-right: 8px;
  min-width: 0;
}

.node-value {
  word-break: break-all;
}

.string-value {
  color: #198754;
}

.number-value {
  color: #0d6efd;
}

.boolean-value {
  color: #fd7e14;
}

.null-value {
  color: #6c757d;
  font-style: italic;
}

.node-children {
  border-left: 1px solid #dee2e6;
  margin-left: 6px;
}
</style>
