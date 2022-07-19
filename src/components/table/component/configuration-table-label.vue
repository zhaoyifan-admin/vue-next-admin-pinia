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

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "configuration-table-label",
  props: {
    row: Object,
  },
})
</script>

<style scoped>

</style>