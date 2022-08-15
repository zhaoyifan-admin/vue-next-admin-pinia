<template>
  <el-descriptions-item :label="colitem.label" :span="colitem.span" :min-width="colitem.width || 80">
    <div v-if="colitem.type === 'select'">
      {{ getpamentType(colitem.dataIndex, viewshowData[colitem.dataIndex]) }}
    </div>
    <div v-else>{{ viewshowData[colitem.dataIndex] }}</div>
  </el-descriptions-item>
</template>

<script lang="ts" setup name="table-viewdialog-desc-item">
/**
 * @auther zyf
 * @example 引入 vue.js 的语法、参数等
 */
import {defineProps} from "vue";

const props = defineProps({
  colitem: {
    type: Object,
    default: null
  },
  viewshowData: {
    type: Object,
    default: null
  },
  getpamentType: {
    type: Function,
    required: true
  },
})
</script>

<style scoped>

</style>