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
      <a-col :span="24">
        <div style="height: 40px;line-height: 40px;text-align: center">
          <rtdp-button :size="size" type="primary" class="mr10">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
            <span class="ml6">搜 询</span>
          </rtdp-button>
          <rtdp-button :size="size">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            <span class="ml6">清 空</span>
          </rtdp-button>
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts" setup name="table-search-forms">
/**
 * @auther zyf
 * @example 引入 vue.js 的语法、参数等
 */
import {defineProps} from "vue";
/**
 * @auther zyf
 * @example 引入第三方图标、组件 或 自定义组件等
 */
import singleComponent from "./single-component.vue";

const props = defineProps({
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

::v-deep(.ant-form-item) {
  margin-bottom: 10px !important;
}
</style>