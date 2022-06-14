<template>
  <avue-input-icon v-model="inputIcon" placeholder="请选择图标" :icon-list="iconList"></avue-input-icon>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue";
// 定义接口来定义对象的类型
interface InputiconState {
  inputIcon: string;
  iconList: Array<any>
}
export default defineComponent({
  name: "inputicon",
  props: {},
  setup(props, { emit }) {
    const state = reactive<InputiconState>({
      inputIcon: '',
      iconList: []
    });
    return {
      ...toRefs(state),
    }
  }
})
</script>

<style scoped>

</style>