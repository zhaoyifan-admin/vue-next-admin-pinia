<template>
	<div class="layout-logo" v-if="setShowLogo" @click="onThemeConfigChange">
    <img :src="logoMini" class="layout-logo-size-img" />
    <span style="margin-left: 5px">{{ themeConfig.globalTitle }}</span>
	</div>
	<div class="layout-logo-size" v-else @click="onThemeConfigChange">
		<img :src="logoMini" class="layout-logo-size-img" />
	</div>
</template>

<script lang="ts">
import {computed, defineAsyncComponent, defineComponent} from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Windows } from '@icon-park/vue-next';

import logoMini from '/@/assets/logo-mini.svg';

export default defineComponent({
	name: 'layoutLogo',
  components: {
    Windows
  },
	setup() {
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		// 设置 logo 的显示。classic 经典布局默认显示 logo
		const setShowLogo = computed(() => {
			let { isCollapse, layout } = themeConfig.value;
			return !isCollapse || layout === 'classic' || document.body.clientWidth < 1000;
		});
		// logo 点击实现菜单展开/收起
		const onThemeConfigChange = () => {
			if (themeConfig.value.layout === 'transverse') return false;
			themeConfig.value.isCollapse = !themeConfig.value.isCollapse;
		};
		return {
			logoMini,
			setShowLogo,
			themeConfig,
			onThemeConfigChange,
		};
	},
});
</script>

<style scoped lang="scss">
.layout-logo {
	width: 256px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
	color: #ffffff;
	font-size: 16px;
	cursor: pointer;
	animation: logoAnimation 0.3s ease-in-out;
	span {
		white-space: nowrap;
		display: inline-block;
	}
	&:hover {
		span {
			color: #51A3FC;
      font-weight: bold;
		}
	}
	&-medium-img {
		width: 20px;
		margin-right: 5px;
	}
}
.layout-logo-size {
	width: 100%;
	height: 50px;
	display: flex;
	cursor: pointer;
	animation: logoAnimation 0.3s ease-in-out;
	&-img {
		width: 20px;
		margin: auto;
	}
	&:hover {
		img {
			animation: logoAnimation 0.3s ease-in-out;
		}
	}
}
</style>
