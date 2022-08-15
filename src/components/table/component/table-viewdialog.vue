<template>
  <a-modal v-model:visible="viewDialog" :show-close="false" :closable="false" width="45%"
           :top="option.top || '15vh'"
           custom-class="table-dialog-flag">
    <template #title>
      <div class="my-view-dia-header dia-header">
        <span>{{ option.viewTitle || '详情' }}</span>
        <close theme="outline" size="15" fill="#606266" strokeLinejoin="miter" strokeLinecap="square"
               style="cursor: pointer" @click="handleClose"/>
      </div>
    </template>
    <el-descriptions class="margin-top" :column="2" :size="size" border>
      <template v-for="(colitem, coli) in viewArray" :key="coli">
        <el-descriptions-item :label="colitem.label" label-align="center" align="center" :span="colitem.span"
                              :min-width="colitem.width || 80">
          <template #label>
            <slot :name="colitem.dataIndex + 'viewLabel'" :ehscope="{row:colitem, size:size, $index:coli}">
              {{ colitem.label }}
            </slot>
          </template>
          <template #default>
            <slot :name="colitem.dataIndex + 'View'" :ehscope="{row:colitem, size:size, $index:coli}">
              <div v-if="colitem.type === 'select'">
                {{ getpamentType(colitem.dataIndex, viewshowData[colitem.dataIndex]) }}
              </div>
              <div v-else>{{ viewshowData[colitem.dataIndex] }}</div>
            </slot>
          </template>
        </el-descriptions-item>
      </template>
    </el-descriptions>
    <template #footer v-if="option.viewFooter || true">
        <span class="dialog-footer">
          <rtdp-button :size="size" icon="guanbi" @click="handleClose">
            {{ option.editCancelBtnText || '关 闭' }}
          </rtdp-button>
          <slot name="viewBtn"></slot>
        </span>
    </template>
  </a-modal>
</template>

<script lang="ts" setup name="table-viewdialog">
/**
 * @auther zyf
 * @example 引入 vue.js 的语法、参数等
 */
import {onMounted, ref, defineProps, defineExpose} from "vue";

/**
 * @auther zyf
 * @example 引入第三方图标、组件 或 自定义组件等
 */
import {Close} from '@icon-park/vue-next';
import tableViewdialogDescItem from "./table-viewdialog-desc-item.vue";

/**
 * @auther zyf
 * @example 引入自定义方法
 */
import {getFlatArr} from "../utils/methods/methods";

// 声明props
const props = defineProps({
  size: {
    type: String,
    default: "default"
  },
  option: {
    type: Object,
    default: {}
  },
  viewshowData: {
    type: Object,
    default: ""
  },
  getpamentType: {
    type: Function,
    required: true
  },
  handleClose: {
    type: Function,
    required: true
  }
});
const viewArray = ref([]);
const viewDialog = ref(false);
const openDialog = () => {
  viewDialog.value = true;
};
const closeDialog = () => {
  viewDialog.value = false;
};
onMounted(() => {
  if (props.option) {
    viewArray.value = getFlatArr(props.option.column);
  }
});

/**
 * @auther  zyf
 * @method  defineExpose  ===>  暴露方法(自定义参数向外导出)
 * @link    参考:https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose
 */
defineExpose({
  openDialog,
  closeDialog
});

</script>

<style scoped>
.dia-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>