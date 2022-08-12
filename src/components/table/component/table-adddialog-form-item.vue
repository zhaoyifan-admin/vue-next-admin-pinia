<template>
  <a-form-item v-if="!colitem.children">
    <template #label>
      <slot :name="colitem.dataIndex + 'addLabel'" :ehscope="{row:colitem, size:size}">
        {{ colitem.label }}
      </slot>
    </template>
    <template #default="scope">
      <slot :name="colitem.dataIndex + 'Edit'" :ehscope="{row:colitem, size:size}">
        <single-component :colitem="colitem"
                          :Form="addForm"
                          :size="size"
                          :option="option"
                          :options="options"
                          diaType="add"
                          :selectChange="selectChange"/>
      </slot>
    </template>
  </a-form-item>
  <template v-if="colitem.children">
    <a-form-item v-if="!colitem.formCollapse">
      <template #label>
        <slot :name="colitem.dataIndex + 'addLabel'" :ehscope="{row:colitem, size:size}">
          {{ colitem.label }}
        </slot>
      </template>
      <el-collapse :size="size" style="width: 100%;">
        <el-collapse-item title="展开输入项" name="1">
          <table-adddialog-form-item v-for="(cochlitem, cochli) in colitem.children"
                                     :key="cochli"
                                     :size="size"
                                     :colitem="cochlitem"
                                     :addForm="addForm"
                                     :options="options"
                                     :visibleChange="visibleChange"
                                     :selectChange="selectChange">
          </table-adddialog-form-item>
        </el-collapse-item>
      </el-collapse>
    </a-form-item>
    <table-adddialog-form-item v-else v-for="(cochlitem, cochli) in colitem.children"
                               :key="cochli"
                               :size="size"
                               :colitem="cochlitem"
                               :addForm="addForm"
                               :options="options"
                               :visibleChange="visibleChange"
                               :selectChange="selectChange">
    </table-adddialog-form-item>
  </template>
</template>

<script lang="ts" setup name="table-adddialog-form-item">
/**
 * @auther zyf
 * @example 引入 vue.js 的语法、参数等
 */
import {defineProps, ref} from "vue";

/**
 * @auther zyf
 * @example 引入第三方图标、组件 或 自定义组件等
 */
import singleComponent from "./single-component.vue";

const props = defineProps({
  size: {
    type: String
  },
  option: {
    type: Object
  },
  colitem: {
    type: Object
  },
  addForm: {
    type: Object
  },
  options: {
    type: Object
  },
  visibleChange: {
    type: Function,
    required: true
  },
  selectChange: {
    type: Function,
    required: true
  }
});
const addForm = ref(props.addForm);
</script>
<style lang="scss" scoped>
::v-deep(.el-collapse-item__header) {
  height: 30px !important;
  line-height: 30px;
}

::v-deep(.el-collapse-item__content) {
  padding-bottom: 5px !important;

  .el-form-item__label {
    width: auto !important;
  }

  .el-form-item {
    margin-bottom: 5px;
  }
}
</style>