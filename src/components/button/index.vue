<template>
  <button class="rtdp-button" :class="[`rtdp-button-${type}`,`rtdp-button-${size}`,{
    'is-plain':plain,
    'is-round':round,
    'is-circle':circle,
    'is-disabled':disabled
  }]"
          @click="handleClick"
          :disabled="disabled"
  >
    <i v-if="icon" :class="`rtdp-icon-${icon}`"></i>
    <!-- 如果没传入文本插槽，则不显示span内容 -->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>

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
    }
  },
  created() {
    // 显示所有插槽
    // console.log(this.$slots)
  },
  methods: {
    // 定义一个点击事件，这个点击事件的作用是调用父组件中的点击事件，并且回调
    handleClick(e) {
      this.$emit('click', e)
    }
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
  margin-right: 12px;
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
    color: #409eff;
    border-color: #409eff;
    background-color: #ecf5ff;
  }

  span {
    display: inline-flex;
    align-items: center;

    ::v-deep(i,.iconfont) {
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

.rtdp-button-success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;

  &:hover,
  &:focus {
    background: #85ce61;
    border-color: #85ce61;
    background-color: #85ce61;
    color: #fff;
  }
}

.rtdp-button-info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;

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
    background: #FDA200;
    border-color: #FDA200;
    background-color: #FDA200;
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
    color: #409eff;
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

.rtdp-button-success.is-plain {
  color: #67c23a;
  background: #c2e7b0;

  &:hover,
  &:focus {
    color: #fff;
    background: #67c23a;
    border-color: #67c23a;
  }
}

.rtdp-button-info.is-plain {
  color: #909399;
  background: #d3d4d6;

  &:hover,
  &:focus {
    color: #fff;
    background: #909399;
    border-color: #909399;
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
.rtdp-button [class*=one-icon-] + span {
  margin-left: 5px;
}

 //disabled属性
.rtdp-button.is-disabled {
  cursor: no-drop;
}

.rtdp-button-primary.is-disabled {
  color: #fff;
  border-color: #788DE4;
  background: #788DE4;
  background-color: #788DE4;
}

.rtdp-button-danger.is-disabled {
  color: #fff;
  border-color: #FA8E99;
  background: #FA8E99;
  background-color: #FA8E99;
}
</style>

