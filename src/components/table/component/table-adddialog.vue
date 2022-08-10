<template>
  <a-modal v-model:visible="addDialog"
           :closable="false"
           :close-on-click-modal="false"
           width="45%"
           :top="option.top || '15vh'"
           :before-close="handleClose"
           custom-class="table-dialog-flag">
    <template #title>
      <div class="my-view-dia-header dia-header">
        <span>{{ option.addTitle || '新增' }}</span>
        <close theme="outline" size="16" fill="#606266" strokeLinejoin="miter" strokeLinecap="square"
               style="cursor: pointer" @click="handleClose"/>
      </div>
    </template>
    <a-spin :spinning="addBtnLoading" :indicator="indicator" tip="Loading...">
      <a-form :model="Form" :size="size" :labelCol="{ style: { width: option.labelWidth ||'80px' } }" :disabled="addDisabled">
        <a-row :gutter="20">
          <template v-for="(colitem, coli) in option.column" :key="coli">
            <a-col :span="colitem.searchSpan || 12" v-if="!colitem.addDisplay">
              <table-adddialog-form-item :size="size" :option="option" :colitem="colitem" :addForm="Form"
                                         :options="options" :visibleChange="visibleChange"
                                         :selectChange="selectChange"></table-adddialog-form-item>
            </a-col>
          </template>
        </a-row>
      </a-form>
    </a-spin>
    <template #footer>
        <span class="dialog-footer">
          <rtdp-button :size="size" icon="guanbi" @click="handleClose">
            {{ option.addCancelBtnText || '关 闭' }}
          </rtdp-button>
          <rtdp-button :size="size" type="primary" icon="zhengque-correct" :disabled="addDisabled" :loading="addBtnLoading" @click="handleSave(Form)">
            {{ option.addConfirmBtnText || '提 交' }}
          </rtdp-button>
        </span>
    </template>
    </a-modal>
</template>

<script lang="ts">
import {defineComponent, h, reactive, ref, toRefs} from "vue";
import {Close} from "@icon-park/vue-next";
import { LoadingOutlined } from '@ant-design/icons-vue';
import tableAdddialogFormItem from "./table-adddialog-form-item.vue";

export default defineComponent({
  name: "table-adddialog",
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
    addDisabled: {
      type: Boolean
    },
    addBtnLoading: {
      type: Boolean
    }
  },
  components: {Close, tableAdddialogFormItem},
  setup: function (props: any, {emit}) {
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: '24px',
      },
      spin: true,
    });
    const state = reactive({
      Form: {}
    });
    const addDialog = ref(false);
    const openDialog = () => {
      addDialog.value = true;
    };
    const closeDialog = () => {
      state.Form = {};
      addDialog.value = false;
    };
    const visibleChange = (val: any) => {

    };
    const selectChange = (val: any) => {
      console.log(val)
    };
    const handleSave = () => {
      emit("handleSave", state.Form);
    };
    const handleClose = () => {
      emit("handleClose");
    };
    return {
      indicator,
      addDialog,
      openDialog,
      closeDialog,
      visibleChange,
      selectChange,
      handleSave,
      handleClose,
      ...toRefs(state)
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