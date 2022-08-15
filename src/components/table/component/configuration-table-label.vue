<template>
  <div>
    <div v-if="!row.children">
      <span>{{ row.configure || row.label }}</span>
    </div>
    <div v-if="row.children" v-for="(rowItem, rowIndex) in row.children" :key="rowIndex">
      <configuration-table-label :row="rowItem"></configuration-table-label>
    </div>
  </div>
</template>

<script lang="ts" setup name="configuration-table-label">
import {defineProps} from "vue";

const props = defineProps({
  row: {
    type: Object,
    default: null
  },
})
</script>

<style scoped>

</style>