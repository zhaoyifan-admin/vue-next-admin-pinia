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

<script lang="ts">
import {defineComponent, h, ref} from "vue";
import {Close} from "@icon-park/vue-next";
import tableEditdialogFormItem from "./table-editdialog-form-item.vue";
import {LoadingOutlined} from "@ant-design/icons-vue";

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
    }
  },
  components: {Close, tableEditdialogFormItem},
  setup: function (props: any, {emit}) {
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: '24px',
      },
      spin: true,
    });
    const editDialog = ref(false);
    const openDialog = () => {
      editDialog.value = true;
    };
    const closeDialog = () => {
      props.editForm = {};
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
    return {
      indicator,
      editDialog,
      openDialog,
      closeDialog,
      visibleChange,
      selectChange,
      handleEdit,
      handleClose
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