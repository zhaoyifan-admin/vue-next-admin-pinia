<template>
  <a-form :model="searchForm" :labelCol="{ style: { width: option.searchLebal ||'80px' } }" autocomplete="off">
    <a-row :gutter="20">
      <template v-for="(colitem, coli) in option.column" :key="coli">
        <a-col :span="colitem.searchSpan || 6" v-if="colitem.search">
          <a-form-item :name="colitem.dataIndex">
            <template #label>
              <slot>
                {{ colitem.label }}
              </slot>
            </template>
            <template #default>
              <slot :name="colitem.dataIndex + 'Search'">
                <single-component :colitem="colitem"
                                  :Form="searchForm"
                                  :size="size"
                                  :option="option"
                                  :options="options"
                                  diaType="search"
                                  :selectChange="selectChange"/>
              </slot>
            </template>
          </a-form-item>
        </a-col>
      </template>
      <a-col :span="6">
        <div style="height: 40px;line-height: 40px;text-align: center">
          <a-button :size="size" type="primary" class="mr10">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
            <span class="ml6">搜 索</span>
          </a-button>
          <a-button :size="size">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            <span class="ml6">清 空</span>
          </a-button>
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import singleComponent from "./single-component.vue";

export default defineComponent({
  name: "table-search-forms",
  props: {
    searchForm: {
      type: Object
    },
    size: {
      type: String
    },
    option: {
      type: Object
    },
    options: {
      type: Object
    },
    selectChange: {
      type: Function,
      required: true
    }
  },
  components: {singleComponent}
})
</script>

<style lang="scss" scoped>
::v-deep(.arco-picker) {
  border: 1px solid #E3E7ED;
  background-color: transparent;
}

::v-deep(.arco-picker:hover) {
  border: 1px solid #5872E4;
  background-color: transparent;
}
</style>