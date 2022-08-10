<template>
  <button class="rtdp-button" :class="[`rtdp-button-${type}`,`rtdp-button-${size}`,{
    'is-plain':plain,
    'is-round':round,
    'is-circle':circle,
    'is-disabled':disabled
  }]"
          :disabled="disabled"
  >
    <slot name="icon"></slot>
    <!-- slot表示插槽，用于要用户自定义的内容 -->
    <i v-if="loading" :class="[`fa fa-spinner`,{'is-loading':loading}]"></i>
    <i v-if="icon && !loading" :class="`rtdp fa ${icon}`"></i>
    <!-- 传了icon才使用图标，没有传icon属性则不使用 如果没传入文本插槽，则不显示span内容 -->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">

export default {
  name: 'rtdpButton',
  // 此时对props进行校验，值接收string类型的type值
  props: {
    type: {
      type: String,
      // 设置默认值：如果不传值，那么使用default
      default: 'defalut'
    },
    size: {
      type: String,
      default: 'large'
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.rtdp-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  margin-right: 10px;
  transition: 0.1s;
  font-weight: 350;
  //禁止元素的文字被选中
  -moz-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 2px;

  &:hover,
  &:focus {
    color: #0084FF;
    border-color: #0084FF;
    background-color: #ecf5ff;
  }

  span {
    display: inline-flex;
    align-items: center;

    ::v-deep(i,.fa,.rtdp) {
      font-size: 14px !important;
      margin-right: 5px !important;
    }
  }
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

// size属性
.rtdp-button-large {
  padding: 12px 20px;
}

.rtdp-button-default {
  padding: 8px 15px;
}

.rtdp-button-small {
  padding: 5px 11px;
}

// round属性
.rtdp-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}

// circle属性
.rtdp-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}


// icon配套样式
.rtdp-button [class*=fa] + span {
  margin-left: 5px;
}
.rtdp-button [class*=rtdp] + span {
  margin-left: 5px;
}

//disabled属性
.rtdp-button.is-disabled {
  cursor: no-drop;
  color: #606266;
  border-color: #dcdfe6;
  background-color: #ffffff;
}

.rtdp-button.is-plain.is-disabled {
  cursor: no-drop;
  color: #606266;
  border-color: #dcdfe6;
  background-color: #ffffff;
}

.rtdp-button-primary.is-disabled {
  cursor: no-drop;
  color: #fff;
  border-color: #788DE4;
  background-color: #788DE4;
}

.rtdp-button-primary.is-plain.is-disabled {
  color: #98A7E4;
  border-color: #98A7E4;
  background-color: #ecf5ff;
}

.rtdp-button-secondary.is-disabled {
  color: #fff;
  border-color: #5CAFFF;
  background-color: #5CAFFF;
}

.rtdp-button-secondary.is-plain.is-disabled {
  color: #5BAEFF;
  border-color: #5BAEFF;
  background-color: #C0E0FF;
}

.rtdp-button-success.is-disabled {
  color: #fff;
  border-color: #76E1AB;
  background-color: #76E1AB;
}

.rtdp-button-success.is-plain.is-disabled {
  color: #93E1B9;
  border-color: #93E1B9;
  background-color: #EBF9E2;
}

.rtdp-button-info.is-disabled {
  color: #fff;
  border-color: #a6a9ad;
  background-color: #a6a9ad;
}

.rtdp-button-info.is-plain.is-disabled {
  color: #ADB1B8;
  border-color: #ADB1B8;
  background-color: #d3d4d6;
}


.rtdp-button-warning.is-disabled {
  color: #fff;
  border-color: #f5dab1;
  background-color: #f5dab1;
}

.rtdp-button-warning.is-plain.is-disabled {
  color: #FDB841;
  border-color: #FDB841;
  background-color: #f5dab1;
}

.rtdp-button-danger.is-disabled {
  color: #fff;
  border-color: #FA8E99;
  background-color: #FA8E99;
}

.rtdp-button-danger.is-plain.is-disabled {
  color: #FA6070;
  border-color: #FA6070;
  background-color: #FA8E99;
}

// loading属性
.fa.is-loading {
  position:relative;
  animation: rotating 1.5s linear infinite;
}
.rtdp.is-loading {
  position:relative;
  animation: rotating 1.5s linear infinite;
}
</style>

