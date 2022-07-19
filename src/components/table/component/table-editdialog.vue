<template>
  <el-dialog v-model="editDialog" :show-close="false" :close-on-click-modal="false" width="45%"
             :top="option.top || '15vh'"
             :before-close="handleClose" custom-class="table-dialog-flag">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-view-dia-header dia-header">
        <span :id="titleId" :class="titleClass">{{ option.addTitle || '编辑' }}</span>
        <close theme="outline" size="16" fill="#606266" strokeLinejoin="miter" strokeLinecap="square"
               style="cursor: pointer" @click="handleClose"/>
      </div>
    </template>
    <el-form :model="editForm" :size="size" label-width="120px" :disabled="editDisabled">
      <el-row :gutter="20">
        <template v-for="(colitem, coli) in option.column" :key="coli">
          <el-col :span="colitem.searchSpan || 12">
            <el-form-item :label="colitem.label + '：'">
              <el-input
                  v-model="editForm[colitem.dataIndex]"
                  v-if="colitem.type === 'input'"
                  :size="size"
                  :placeholder="colitem.placeholder || '请输入 ' + colitem.label"
                  clearable
                  style="width: 100%"/>
              <el-input
                  v-model="editForm[colitem.dataIndex]"
                  v-if="colitem.type === 'textarea'"
                  :size="size"
                  type="textarea"
                  :placeholder="colitem.placeholder || '请输入 ' + colitem.label"
                  clearable
                  :autosize="{ minRows: 4, maxRows: 8}"
                  style="width: 100%"/>
              <el-select
                  v-model="editForm[colitem.dataIndex]"
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
                    :value="colitem.dataType === 'number' ?
                        Number(item[colitem.props.value]) || Number(item.value) :
                        item[colitem.props.value] || item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button :size="size" @click="handleClose">
            <template #icon>
              <slot name="editCancelBtnIcon">
                <i class="iconfont icon-guanbi"></i>
              </slot>
            </template>
            {{ option.editCancelBtnText || '关 闭' }}
          </el-button>
          <el-button :size="size" type="primary" :loading="editBtnLoading" @click="handleEdit(editForm)">
            <template #icon>
              <slot name="editConfirmBtnIcon">
                <i v-show="!editBtnLoading" class="iconfont icon-zhengque-correct"></i>
              </slot>
            </template>
            {{ option.editConfirmBtnText || '修 改' }}
          </el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {Close} from "@icon-park/vue-next";

export default defineComponent({
  name: "table-editdialog",
  props: {
    size: {
      type: String
    },
    option: {
      type: Object
    },
    options: {
      type: Object
    },
    editForm: {
      type: Object
    },
    editDisabled: {
      type: Boolean
    },
    editBtnLoading: {
      type: Boolean
    },
    handleClose: {
      type: Function,
      required: true
    },
    handleEdit: {
      type: Function,
      required: true
    }
  },
  components: {Close},
  setup: function (props: any, context) {
    const editDialog = ref(false);
    const openDialog = () => {
      editDialog.value = true;
    };
    const closeDialog = () => {
      editDialog.value = false;
    };
    const visibleChange = (val: any) => {

    };
    const selectChange = (val: any) => {
      console.log(val)
    };
    return {
      editDialog,
      openDialog,
      closeDialog,
      visibleChange,
      selectChange
    }
  }
})
</script>

<style scoped>
.dia-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>