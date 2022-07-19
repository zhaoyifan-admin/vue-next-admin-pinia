<template>
  <el-form-item v-if="!colitem.children" :label="colitem.label + '：'">
    <el-input
        v-model="addForm[colitem.dataIndex]"
        v-if="colitem.type === 'input'"
        :size="size"
        :placeholder="colitem.placeholder || '请输入 ' + colitem.label"
        clearable
        style="width: 100%"/>
    <el-input
        v-model="addForm[colitem.dataIndex]"
        v-if="colitem.type === 'textarea'"
        :size="size"
        type="textarea"
        :placeholder="colitem.placeholder || '请输入 ' + colitem.label"
        clearable
        :autosize="{ minRows: 4, maxRows: 8}"
        style="width: 100%"/>
    <el-select
        v-model="addForm[colitem.dataIndex]"
        v-if="colitem.type === 'select'"
        :size="size"
        :placeholder="colitem.placeholder || '请选择 ' + colitem.label"
        @visible-change="visibleChange"
        @change="selectChange"
        clearable
        style="width: 100%">
      <el-option
          v-for="(item, index) in options[colitem.dataIndex]"
          :key="index"
          :label="item[colitem.props.label] || item.label"
          :value="item[colitem.props.value] || item.value"
      />
    </el-select>
  </el-form-item>
  <template v-if="colitem.children">
    <el-form-item v-if="!colitem.formCollapse" :label="colitem.label + '：'">
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
    </el-form-item>
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

<script>
export default {
  name: "table-adddialog-form-item",
  props: {
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
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.el-collapse-item__header) {
  height: 30px !important;
  line-height: 30px;
}
::v-deep(.el-collapse-item__content) {
  padding-bottom: 5px!important;
  .el-form-item__label {
    width: auto!important;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
}
</style>