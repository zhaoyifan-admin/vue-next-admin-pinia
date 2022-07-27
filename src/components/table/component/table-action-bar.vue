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

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "table-action-bar",
  props: {
    size: {
      type: String
    },
    btnType: {
      type: String
    }
  },
  setup: function (props: any, context) {
    const showViewDialog = () => {
      context.emit("showViewDialog");
    };
    const showEditDialog = () => {
      context.emit("showEditDialog");

    };
    const handleDel = () => {
      context.emit("handleDel");
    };
    return {
      showViewDialog,
      showEditDialog,
      handleDel
    }
  }
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