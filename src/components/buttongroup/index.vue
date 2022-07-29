<template>
  <div class="rtdp-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "rtdpButtonGroup"
}
</script>

<style lang="scss" scoped>
*, *::before, *::after {
  box-sizing: border-box;
}

.rtdp-button-group {
  display: inline-block;
  vertical-align: middle;

  &:hover,
  &:focus {
    color: #0084FF;
    border-color: #0084FF;
    background-color: #ecf5ff;
  }

  ::v-deep(.rtdp-button) {
    margin: 0!important;
  }
  ::v-deep(.rtdp-button:first-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  //.rtdp-button:not(:first-child):not(:last-child) {
  //  border-left-color: var(--el-button-divide-border-color);
  //  border-right-color: var(--el-button-divide-border-color);
  //}
  ::v-deep(.rtdp-button:last-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .rtdp-button:not(:last-child) {
    margin-right: -1px;
  }
}
</style>