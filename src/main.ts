import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from './App.vue';
import router from './router';
import { directive } from '/@/utils/directive';
import { i18n } from '/@/i18n/index';
import other from '/@/utils/other';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '/@/theme/index.scss';
import mitt from 'mitt';
import 'animate.css';
import VueGridLayout from 'vue-grid-layout';
import '@smallwei/avue/lib/index.css';
import '@icon-park/vue/styles/index.css';
import install from '/@/components/index';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

directive(app);
other.elSvg(app);

app.use(pinia).use(router)
    .use(install).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).use(VueGridLayout).mount('#app');

app.config.globalProperties.mittBus = mitt();
