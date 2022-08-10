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

  ::v-deep(.rtdp-button) {
    margin: 0;
    position: relative;
    &:hover,
    &:focus {
      z-index: 1;
    }
  }
  ::v-deep(.rtdp-button:first-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  ::v-deep(.rtdp-button-primary:first-child) {
    border-right-color: #fff;
  }
  ::v-deep(.rtdp-button-secondary:first-child) {
    border-right-color: #fff;
  }
  ::v-deep(.rtdp-button-success:first-child) {
    border-right-color: #fff;
  }
  ::v-deep(.rtdp-button-warning:first-child) {
    border-right-color: #fff;
  }
  ::v-deep(.rtdp-button-danger:first-child) {
    border-right-color: #fff;
  }
  ::v-deep(.rtdp-button:not(:first-child)) {
    margin-right: -1px;
  }
  ::v-deep(.rtdp-button:not(:first-child):not(:last-child)) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  ::v-deep(.rtdp-button-primary:not(:first-child):not(:last-child)) {
    border-right-color: #fff;
    border-left-color: #fff;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  ::v-deep(.rtdp-button-secondary:not(:first-child):not(:last-child)) {
    border-right-color: #fff;
    border-left-color: #fff;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  ::v-deep(.rtdp-button-success:not(:first-child):not(:last-child)) {
    border-right-color: #fff;
    border-left-color: #fff;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  ::v-deep(.rtdp-button-warning:not(:first-child):not(:last-child)) {
    border-right-color: #fff;
    border-left-color: #fff;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  ::v-deep(.rtdp-button-danger:not(:first-child):not(:last-child)) {
    border-right-color: #fff;
    border-left-color: #fff;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  ::v-deep(.rtdp-button:last-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  ::v-deep(.rtdp-button-primary:last-child) {
    border-left-color: #fff;
  }
  ::v-deep(.rtdp-button-secondary:last-child) {
    border-left-color: #fff;
  }
  ::v-deep(.rtdp-button-success:last-child) {
    border-left-color: #fff;
  }
  ::v-deep(.rtdp-button-warning:last-child) {
    border-left-color: #fff;
  }
  ::v-deep(.rtdp-button-danger:last-child) {
    border-left-color: #fff;
  }
  ::v-deep(.rtdp-button:not(:last-child)) {
    margin-right: -1px;
  }
  .rtdp-button-primary {
    color: #fff;
    background-color: #5872E4;
    border-color: #5872E4;

    &:hover,
    &:focus {
      background: #788DE4;
      border-color: #788DE4;
      background-color: #788DE4;
      color: #fff;
    }
  }

  .rtdp-button-secondary {
    color: #fff;
    background-color: #1B8FFF;
    border-color: #1B8FFF;

    &:hover,
    &:focus {
      color: #fff;
      background: #5CAFFF;
      border-color: #5CAFFF;
      background-color: #5CAFFF;
    }
  }

  .rtdp-button-success {
    color: #fff;
    background-color: #1EE17E;
    border-color: #1EE17E;

    &:hover,
    &:focus {
      background: #76E1AB;
      border-color: #76E1AB;
      background-color: #76E1AB;
      color: #fff;
    }
  }

  .rtdp-button-info {
    color: #fff;
    background-color: #606266;
    border-color: #D9D9DA;

    &:hover,
    &:focus {
      background: #a6a9ad;
      border-color: #a6a9ad;
      background-color: #a6a9ad;
      color: #fff;
    }
  }

  .rtdp-button-warning {
    color: #fff;
    background-color: #FDA200;
    border-color: #FDA200;

    &:hover,
    &:focus {
      background: #FDDA9B;
      border-color: #FDDA9B;
      background-color: #FDDA9B;
      color: #fff;
    }
  }

  .rtdp-button-danger {
    color: #fff;
    background-color: #FA3549;
    border-color: #FA3549;

    &:hover,
    &:focus {
      background: #FA8E99;
      border-color: #FA8E99;
      background-color: #FA8E99;
      color: #fff;
    }
  }

  // 朴素按钮样式
  .rtdp-button.is-plain {
    &:hover,
    &:focus {
      color: #0084FF;
      background: #fff;
      border-color: #489eff;
    }
  }

  .rtdp-button-primary.is-plain {
    color: #5872E4;
    background: #ecf5ff;

    &:hover,
    &:focus {
      color: #fff;
      background: #5872E4;
      border-color: #5872E4;
    }
  }

  .rtdp-button-secondary.is-plain {
    color: #1B8FFF;
    border-color: #1B8FFF;
    background-color: #C0E0FF;

    &:hover,
    &:focus {
      color: #fff;
      background: #1B8FFF;
      border-color: #1B8FFF;
      background-color: #1B8FFF;
    }
  }

  .rtdp-button-success.is-plain {
    color: #1EE17E;
    background: #EBF9E2;

    &:hover,
    &:focus {
      color: #fff;
      background: #1EE17E;
      border-color: #1EE17E;
    }
  }

  .rtdp-button-info.is-plain {
    color: #606266;
    background: #d3d4d6;

    &:hover,
    &:focus {
      color: #fff;
      background: #606266;
      border-color: #D9D9DA;
    }
  }

  .rtdp-button-warning.is-plain {
    color: #FDA200;
    background: #f5dab1;

    &:hover,
    &:focus {
      color: #fff;
      background: #FDA200;
      border-color: #FDA200;
    }
  }

  .rtdp-button-danger.is-plain {
    color: #FA3549;
    background: #FA8E99;

    &:hover,
    &:focus {
      color: #fff;
      background: #FA3549;
      border-color: #FA3549;
    }
  }
}
</style>