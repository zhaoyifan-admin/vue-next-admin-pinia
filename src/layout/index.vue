<template>
  <div class="tips">
    <ul>
      <li @click="otherBtn">
        <i class="rtdp taishidaping"></i>
        <p>监控大屏</p>
      </li>
      <li @click="helpBtn">
        <i class="rtdp shiyongbangzhu"></i>
        <p>帮助文档</p>
      </li>
      <li @click="systemBtn">
        <i class="rtdp xitong"></i>
        <p>选择系统</p>
        <a-modal v-model:visible="systemvisible" class="systemDialog" width="70%" title="系 统" :footer="null"
                 @ok="handleOk">
          <a-row :gutter="20">
            <template v-for="(sysitem, index) in systemList" :key="index">
              <a-col :span="8" style="text-align: center">
                <div class="image" :style="{backgroundImage: 'url(' + sysitem.imageUrl + ')'}"
                     @click="choiceSystem(sysitem)"></div>
                <div class="name">
                  {{ sysitem.systemName }}
                </div>
              </a-col>
            </template>
          </a-row>
        </a-modal>
      </li>
      <li @click="otherBtn">
        <i class="rtdp wujiedu"></i>
        <p>暂无功能</p>
      </li>
      <li @click="otherBtn">
        <i class="rtdp wujiedu"></i>
        <p>暂无功能</p>
      </li>
    </ul>
  </div>
  <component :is="themeConfig.layout"/>
</template>

<script lang="ts">
import {onBeforeMount, onUnmounted, getCurrentInstance, defineComponent, defineAsyncComponent, ref} from 'vue';
import {storeToRefs} from 'pinia';
import {useThemeConfig} from '/@/stores/themeConfig';
import {Local, setStore} from '/@/utils/storage';
import {Helpcenter, Windows, NeutralFace} from '@icon-park/vue-next';
import {ElMessage} from "element-plus";
import {useUserInfo} from "/@/stores/userInfo";
import {initBackEndControlRoutes} from "/@/router/backEnd";

export default defineComponent({
  name: 'layout',
  components: {
    Helpcenter,
    Windows,
    NeutralFace,
    defaults: defineAsyncComponent(() => import('/@/layout/main/defaults.vue')),
    classic: defineAsyncComponent(() => import('/@/layout/main/classic.vue')),
    transverse: defineAsyncComponent(() => import('/@/layout/main/transverse.vue')),
    columns: defineAsyncComponent(() => import('/@/layout/main/columns.vue')),
  },
  setup() {
    const systemvisible = ref<boolean>(false);
    const {proxy} = <any>getCurrentInstance();
    const storesThemeConfig = useThemeConfig();
    const {themeConfig} = storeToRefs(storesThemeConfig);
    const systemList = useUserInfo().systemlist;
    /** 窗口大小改变时(适配移动端) */
    const onLayoutResize = () => {
      if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout);
      const clientWidth = document.body.clientWidth;
      if (clientWidth < 1000) {
        themeConfig.value.isCollapse = false;
        proxy.mittBus.emit('layoutMobileResize', {
          layout: 'defaults',
          clientWidth,
        });
      } else {
        proxy.mittBus.emit('layoutMobileResize', {
          layout: Local.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
          clientWidth,
        });
      }
    };
    const handleOk = (e: MouseEvent) => {
      console.log(e);
      systemvisible.value = false;
    };
    const helpBtn = () => {
      ElMessage({
        message: '正在开发中...敬请期待！',
        type: 'warning',
      })
    };
    const systemBtn = () => {
      systemvisible.value = true;
    };
    const otherBtn = () => {
      ElMessage({
        message: '暂无功能...敬请期待！',
        type: 'warning',
      })
    };
    const choiceSystem = async (params?: any) => {
      setStore({
        name: 'systemId',
        content: params.id,
        type: 'session'});
      await initBackEndControlRoutes(params);
      systemvisible.value = false;
    };
    // 页面加载前
    onBeforeMount(() => {
      onLayoutResize();
      window.addEventListener('resize', onLayoutResize);
    });
    // 页面卸载时
    onUnmounted(() => {
      window.removeEventListener('resize', onLayoutResize);
    });
    return {
      systemvisible,
      systemList,
      handleOk,
      helpBtn,
      systemBtn,
      otherBtn,
      choiceSystem,
      themeConfig,
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep(.el-menu-item.is-active) {
  border-radius: 5px;
}

::v-deep(.el-menu-item:hover) {
  border-radius: 5px;
}

.rtdp {
  font-weight: bold;
  font-size: 22px;
  color: #ffffff;
}

.systems {
  min-height: 450px;
}
</style>