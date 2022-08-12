<template>
  <a-modal v-model:visible="editDialog"
           :close-on-click-modal="false"
           width="45%"
           :top="option.top || '15vh'"
           :closable="false"
           :before-close="handleClose"
           custom-class="table-dialog-flag">
    <template #title>
      <div class="my-view-dia-header dia-header">
        <span>{{ option.addTitle || '编辑' }}</span>
        <close theme="outline" size="16" fill="#606266" strokeLinejoin="miter" strokeLinecap="square"
               style="cursor: pointer" @click="handleClose"/>
      </div>
    </template>
    <a-spin :spinning="editBtnLoading" :indicator="indicator" tip="Loading...">
      <a-form :model="editForm" :size="size" :labelCol="{ style: { width: option.labelWidth ||'80px' } }">
        <a-row :gutter="20">
          <template v-for="(colitem, coli) in option.column" :key="coli">
            <a-col :span="colitem.searchSpan || 12" v-if="!colitem.editDisplay">
              <table-editdialog-form-item :size="size" :option="option" :colitem="colitem" :editForm="editForm"
                                          :options="options" :visibleChange="visibleChange"
                                          :selectChange="selectChange"></table-editdialog-form-item>
            </a-col>
          </template>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
        <span class="dialog-footer">
          <rtdp-button :size="size" icon="guanbi" @click="handleClose">
            {{ option.editCancelBtnText || '关 闭' }}
          </rtdp-button>
          <rtdp-button :size="size" type="primary" icon="zhengque-correct" :disabled="editDisabled" :loading="editBtnLoading" @click="handleEdit(editForm)">
            {{ option.editConfirmBtnText || '修 改' }}
          </rtdp-button>
        </span>
    </template>
  </a-modal>
</template>

<script lang="ts" setup name="table-editdialog">
/**
 * @auther zyf
 * @example 引入 vue.js 的语法、参数等
 */
import {defineExpose, defineProps, defineEmits, h, ref, watch} from "vue";

/**
 * @auther zyf
 * @example 引入第三方图标、组件 或 自定义组件等
 */
import {LoadingOutlined} from "@ant-design/icons-vue";
import {Close} from "@icon-park/vue-next";
import tableEditdialogFormItem from "./table-editdialog-form-item.vue";
import {getFlatArr} from "/@/components/table/utils/methods/methods";

// emit
const emit = defineEmits(['handleEdit', 'handleClose']);
const props = defineProps({
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
    type: Object,
    default: null
  },
  editDisabled: {
    type: Boolean
  },
  editBtnLoading: {
    type: Boolean
  }
});
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});
const editDialog = ref(false);
const editForm = ref({});
const openDialog = () => {
  editDialog.value = true;
};
const closeDialog = () => {
  editForm.value = {};
  editDialog.value = false;
};
const visibleChange = (val: any) => {

};
const selectChange = (val: any) => {
  console.log(val)
};
const handleEdit = () => {
  emit("handleEdit", props.editForm);
};
const handleClose = () => {
  emit("handleClose");
};
watch(()=>props.editForm,(newValue,oldValue)=>{
  editForm.value = {};
  editForm.value = newValue;
},{deep:true});

defineExpose({
  openDialog,
  closeDialog,
  visibleChange,
  selectChange,
  handleEdit,
  handleClose
})
</script>

<style scoped>
.dia-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>