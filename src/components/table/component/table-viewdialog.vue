<template>
  <el-dialog v-model="viewDialog" :show-close="false" :close-on-click-modal="false" width="45%"
             :top="option.top || '15vh'"
             custom-class="table-dialog-flag">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-view-dia-header dia-header">
        <span :id="titleId" :class="titleClass">{{ option.viewTitle || '详情' }}</span>
        <close theme="outline" size="15" fill="#606266" strokeLinejoin="miter" strokeLinecap="square"
               style="cursor: pointer" @click="handleClose"/>
      </div>
    </template>
    <el-descriptions class="margin-top" :column="2" :size="size" border>
      <template v-for="(colitem, coli) in viewArray" :key="coli">
        <el-descriptions-item :label="colitem.label" :span="colitem.span" :min-width="colitem.width || 80">
          <template #label>
            <slot :name="colitem.dataIndex + 'viewLabel'" :nhscope="{colitem}">
              {{colitem.label}}
            </slot>
          </template>
          <slot :name="colitem.dataIndex + 'View'" :nhscope="{colitem}">
            <div v-if="colitem.type === 'select'">
              {{ getpamentType(colitem.dataIndex, viewshowData[colitem.dataIndex]) }}
            </div>
            <div v-else>{{ viewshowData[colitem.dataIndex] }}</div>
          </slot>
        </el-descriptions-item>
      </template>
    </el-descriptions>
    <template #footer v-if="option.viewFooter || true">
        <span class="dialog-footer">
          <el-button :size="size" @click="handleClose">
            <template #icon>
              <slot name="viewBtnIcon">
                <i class="iconfont icon-guanbi"></i>
              </slot>
            </template>
            {{ option.viewBtnText || '关 闭' }}
          </el-button>
          <slot name="viewBtn"></slot>
        </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {Close} from '@icon-park/vue-next';
import tableViewdialogDescItem from "./table-viewdialog-desc-item.vue";
import {getFlatArr} from "../utils/methods/methods";

export default defineComponent({
  name: "table-viewdialog",
  props: {
    size: {
      type: String
    },
    option: {
      type: Object
    },
    viewshowData: {
      type: Object
    },
    getpamentType: {
      type: Function,
      required: true
    },
    handleClose: {
      type: Function,
      required: true
    },
  },
  components: {Close, tableViewdialogDescItem},
  setup: function (props: any, context) {
    const viewArray = ref([]);
    const viewDialog = ref(false);
    const openDialog = () => {
      viewDialog.value = true;
    };
    const closeDialog = () => {
      viewDialog.value = false;
    };
    onMounted(()=> {
      viewArray.value = getFlatArr(props.option.column);
    });
    return {
      viewArray,
      viewDialog,
      openDialog,
      closeDialog
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