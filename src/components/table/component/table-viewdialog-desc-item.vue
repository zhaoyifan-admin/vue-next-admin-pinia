<template>
  <el-descriptions-item :label="colitem.label" :span="colitem.span" :min-width="colitem.width || 80">
    <div v-if="colitem.type === 'select'">
      {{ getpamentType(colitem.dataIndex, viewshowData[colitem.dataIndex]) }}
    </div>
    <div v-else>{{ viewshowData[colitem.dataIndex] }}</div>
  </el-descriptions-item>
</template>

<script>
export default {
  name: "table-viewdialog-desc-item",
  props: {
    colitem: {
      type: Object
    },
    viewshowData: {
      type: Object
    },
    getpamentType: {
      type: Function,
      required: true
    },
  }
}
</script>

<style scoped>

</style>