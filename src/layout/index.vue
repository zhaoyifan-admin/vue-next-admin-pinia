<template>
  <div class="tips">
    <ul>
      <li>
        <helpcenter theme="outline" size="20" fill="#FFFFFF" strokeLinejoin="miter" strokeLinecap="square"/>
        <p>帮助文档</p>
      </li>
      <li>
        <windows theme="outline" size="20" fill="#FFFFFF" strokeLinejoin="miter" strokeLinecap="square"/>
        <p>选择系统</p>
      </li>
      <li>
        <neutral-face theme="outline" size="20" fill="#FFFFFF" strokeLinejoin="miter" strokeLinecap="square"/>
        <p>暂无功能</p>
      </li>
      <li>
        <neutral-face theme="outline" size="20" fill="#FFFFFF" strokeLinejoin="miter" strokeLinecap="square"/>
        <p>暂无功能</p>
      </li>
    </ul>
  </div>
	<component :is="themeConfig.layout" />
</template>

<script lang="ts">
import { onBeforeMount, onUnmounted, getCurrentInstance, defineComponent, defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Local } from '/@/utils/storage';
import { Helpcenter, Windows, NeutralFace } from '@icon-park/vue-next';

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
		const { proxy } = <any>getCurrentInstance();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		// 窗口大小改变时(适配移动端)
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
</style>