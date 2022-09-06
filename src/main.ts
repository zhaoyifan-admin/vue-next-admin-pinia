import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from './App.vue';
import router from './router';
import { directive } from '/@/utils/directive';
import { i18n } from '/@/i18n/index';
import other from '/@/utils/other';

import ElementPlus from 'element-plus';
import Antd from 'ant-design-vue';
import ArcoVue from '@arco-design/web-vue';
import rtdpButton from 'rtdp-button';
import 'element-plus/dist/index.css';
import 'ant-design-vue/dist/antd.css';
import '@arco-design/web-vue/dist/arco.css';
import 'rtdp-button/style.css';
import '/@/theme/index.scss';
import mitt from 'mitt';
import 'animate.css';
import VueGridLayout from 'vue-grid-layout';
import '@smallwei/avue/lib/index.css';
import '@icon-park/vue/styles/index.css';
import install from '/@/components/index';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import VueBMap, {initBMapApiLoader} from 'vue-bmap-gl';
import 'vue-bmap-gl/dist/style.css'
initBMapApiLoader({
    ak: 'Gy3wGRpQM9LonttmjZLyljZpVRvza4Ak'
})

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

directive(app);
other.elSvg(app);
other.iconfont(app);

app.use(pinia).use(router).use(VueBMap).use(ArcoVue).use(ArcoVueIcon).use(Antd)
    .use(install).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).use(VueGridLayout).mount('#app');

app.config.globalProperties.mittBus = mitt();
