import {App} from 'vue';
import icon from '/@/components/icon/index.vue';
import systemTable from '/@/components/table/index.vue';
// 所有组件列表
const components = [icon, systemTable]

// 定义 install 方法， App 作为参数
const install = (app: App): void => {
    // 遍历注册所有组件
    components.map((component) => app.component(component.name, component))
}

export default {
    install
}
