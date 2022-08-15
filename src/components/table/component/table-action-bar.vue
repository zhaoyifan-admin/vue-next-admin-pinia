<template>
  <div class="menu">
    <rtdp-button type="info" :size="size" title="查看" @click="showViewDialog">
      <i class="fa fa-search-plus" aria-hidden="true"></i>
    </rtdp-button>
    <rtdp-button type="primary" :size="size" title="编辑" @click="showEditDialog">
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </rtdp-button>
    <el-popconfirm title="是否确认删除当前选择数据？" @confirm="handleDel">
      <template #reference>
        <rtdp-button type="danger" :size="size" title="删除">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </rtdp-button>
      </template>
    </el-popconfirm>
  </div>
</template>

<script lang="ts" setup name="table-action-bar">
/**
 * @auther zyf
 * @example 引入 vue.js 的语法、参数等
 */
import {defineExpose, defineProps, defineEmits} from "vue";

const emit = defineEmits(['showViewDialog','showEditDialog', 'handleDel'])
const props = defineProps({
  size: {
    type: String,
    default: "default"
  },
  btnType: {
    type: String
  }
});
const showViewDialog = () => {
  emit("showViewDialog");
};
const showEditDialog = () => {
  emit("showEditDialog");
};
const handleDel = () => {
  emit("handleDel");
};

defineExpose({
  showViewDialog,
  showEditDialog,
  handleDel
})
</script>

<style lang="scss" scoped>
.menu {
  .rtdp-button {
    padding: 5px 6px !important;

    i.fa {
      margin: 0 !important;
    }
  }

  .el-button,
  .el-button--large {
    height: auto;
  }
}

</style>