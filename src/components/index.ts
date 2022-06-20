import {App} from 'vue';
import systemTable from '/@/components/table/index.vue';
import rtdpButton from '/@/components/button/index.vue';
import addForm from '/@/components/addForm/index.vue';
import icon from '/@/components/icon/index.vue';

// 所有组件列表
const components = [systemTable, rtdpButton, addForm, icon]

// 定义 install 方法， App 作为参数
const install = (app: App): void => {
    // 遍历注册所有组件
    components.map((component) => app.component(component.name, component))
}

export {
    systemTable
}

export default {
    install
}
