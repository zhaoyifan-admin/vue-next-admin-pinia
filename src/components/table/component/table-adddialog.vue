<template>
  <el-dialog v-model="addDialog" :show-close="false" :close-on-click-modal="false" width="45%"
             :top="option.top || '15vh'"
             :before-close="handleClose" custom-class="table-dialog-flag">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-view-dia-header dia-header">
        <span :id="titleId" :class="titleClass">{{ option.addTitle || '新增' }}</span>
        <close theme="outline" size="16" fill="#606266" strokeLinejoin="miter" strokeLinecap="square"
               style="cursor: pointer" @click="handleClose"/>
      </div>
    </template>
    <el-form :model="addForm" :size="size" label-width="120px" :disabled="addDisabled">
      <el-row :gutter="20">
        <template v-for="(colitem, coli) in option.column" :key="coli">
          <el-col :span="colitem.searchSpan || 12">
            <table-adddialog-form-item :size="size" :option="option" :colitem="colitem" :addForm="addForm"
                                       :options="options" :visibleChange="visibleChange"
                                       :selectChange="selectChange"></table-adddialog-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button :size="size" @click="handleClose">
            <template #icon>
              <slot name="addCancelBtnIcon">
                <i class="iconfont icon-guanbi"></i>
              </slot>
            </template>
            {{ option.addCancelBtnText || '关 闭' }}
          </el-button>
          <el-button :size="size" type="primary" :loading="addBtnLoading" @click="handleSave(addForm)">
            <template #icon>
              <slot name="addConfirmBtnIcon">
                <i v-show="!addBtnLoading" class="iconfont icon-zhengque-correct"></i>
              </slot>
            </template>
            {{ option.addConfirmBtnText || '提 交' }}
          </el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from "vue";
import {Close} from "@icon-park/vue-next";
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
    addForm: {
      type: Object
    },
    addDisabled: {
      type: Boolean
    },
    addBtnLoading: {
      type: Boolean
    },
    handleClose: {
      type: Function,
      required: true
    },
    handleSave: {
      type: Function,
      required: true
    }
  },
  components: {Close, tableAdddialogFormItem},
  setup: function (props: any, context) {
    const addDialog = ref(false);
    const openDialog = () => {
      addDialog.value = true;
    };
    const closeDialog = () => {
      addDialog.value = false;
    };
    const visibleChange = (val: any) => {

    };
    const selectChange = (val: any) => {
      console.log(val)
    };
    const state = reactive({});
    return {
      addDialog,
      openDialog,
      closeDialog,
      visibleChange,
      selectChange,
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