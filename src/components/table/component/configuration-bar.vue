<template>
  <el-drawer v-model="actionBarDrawer" :size="option.actionBarDrawerWidth || '45%'" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">
        <i class="fa fa-table" aria-hidden="true"></i> 表格配置项
      </h4>
      <i class="fa fa-times" aria-hidden="true" title="关闭" @click="close"></i>
    </template>
    <template #default>
      <div class="drawer-box">
        <el-card class="box-card">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="表格基础配置项" name="1">
              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" class="mt10">
                  <span>显示索引：</span>
                  <el-switch v-model="option.showIndex" :size="size" width="50" inline-prompt active-text="是"
                             inactive-text="否"></el-switch>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" class="mt10">
                  <span>显示多选框：</span>
                  <el-switch v-model="option.showSelect" :size="size" width="50" inline-prompt active-text="是"
                             inactive-text="否"></el-switch>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" class="mt10">
                  <span>显示单框：</span>
                  <el-switch v-model="option.showradio" :size="size" width="50" inline-prompt active-text="是"
                             inactive-text="否"></el-switch>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" class="mt10">
                  <span>显示边框：</span>
                  <el-switch v-model="option.border" :size="size" width="50" inline-prompt active-text="是"
                             inactive-text="否"></el-switch>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" class="mt10">
                  <span>卡片模式：</span>
                  <el-switch
                      v-model="option.CardMode"
                      :size="size"
                      width="50"
                      active-color="#01D06E"
                      inactive-color="#EC372C"
                      inline-prompt active-text="开启"
                      inactive-text="关闭"></el-switch>
                </el-col>
                <el-col :span="18" class="mt10">
                  <div style="display: flex;align-items: center">
                    <span style="display: block;width: 130px;">显示大小：</span>
                    <el-radio-group v-model="Size" :size="size" @change="changeRadio">
                      <el-radio-button :size="size" :label="'large'">Large(大)</el-radio-button>
                      <el-radio-button :size="size" :label="'default'">Default(中)</el-radio-button>
                      <el-radio-button :size="size" :label="'small'">Small(小)</el-radio-button>
                    </el-radio-group>
                  </div>
                </el-col>
                <el-col :span="24" class="mt10">
                  <div style="display: flex;align-items: center">
                    <span style="display: block;width: 130px;">操作栏按钮类型：</span>
                    <el-radio-group v-model="actionBar" :size="size" @change="changeActionBar">
                      <el-radio-button :size="size" :label="'menu'">
                        菜单按钮
                      </el-radio-button>
                      <el-radio-button :size="size" :label="'text'">
                        文本按钮
                      </el-radio-button>
                      <el-radio-button :size="size" :label="'merge'">
                        合并菜单
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template #title>
                <span style="margin-right: 5px;">表格列配置项</span>
              </template>
              <span>极简布局：</span><el-switch :disabled="showDisabled" :size="size" v-model="show" />
              <div class="configuration-bar-table-stylebox">
                <el-table
                    v-show="show"
                    :data="option.column"
                    :size="size"
                    border
                    style="width: 100%"
                    row-key="dataIndex"
                    :header-cell-style="{'text-align':'center','background':'#5872E4','color':'#ffffff'}"
                    :cell-style="{'text-align':'center'}"
                >
                  <el-table-column prop="label" label="列名">
                    <template #default="scope">
                      <span>{{ scope.row.configure || scope.row.label }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="隐藏">
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.hide" :size="size"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="冻结">
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.fixed" :size="size"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="过滤(筛选)">
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.filter" :size="size"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="排序">
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.sortable" :size="size"></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table
                    v-show="!show"
                    :data="columnArray"
                    :size="size"
                    border
                    style="width: 100%"
                    row-key="dataIndex"
                    :header-cell-style="{'text-align':'center','background':'#5872E4','color':'#ffffff'}"
                    :cell-style="{'text-align':'center'}"
                >
                  <el-table-column prop="label" label="列名">
                    <template #default="scope">
                      <span v-if="!scope.row.children">{{ scope.row.configure || scope.row.label }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="隐藏">
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.hide" :size="size"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="冻结">
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.fixed" :size="size"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="过滤(筛选)">
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.filter" :size="size"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column label="排序">
                    <template #default="scope">
                      <el-checkbox v-model="scope.row.sortable" :size="size"></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
            <el-collapse-item title="表格其他配置项" name="3">

            </el-collapse-item>
          </el-collapse>
        </el-card>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup name="configuration-bar">
/**
 * @auther zyf
 * @example 引入 vue.js 的语法、参数等
 */
import {defineProps, defineEmits, ref, onMounted, defineExpose} from "vue";

/**
 * @auther zyf
 * @example 引入第三方图标、组件 或 自定义组件等
 */
import {AppSwitch} from '@icon-park/vue-next';
import {getFlatArr} from "../utils/methods/methods";

const emit = defineEmits<{
  (e: 'update:size', params: string): void
}>()
const props = defineProps({
  size: {
    type: String,
    default: "default"
  },
  option: {
    type: Object
  },
  actionBar: {
    type: String
  }
});
const columnArray = ref([]);
const showDisabled = ref(true);
const activeNames = ref(['1', '2', '3']);
const actionBarDrawer = ref(false);
const Size = ref();
const show = ref(true);

onMounted(()=>{
  const Array = getFlatArr(props.option.column);
  columnArray.value = [];
  showDisabled.value = true;
  Size.value = props.size;
  Array.forEach((item:any)=>{
    if(!item.children) {
      columnArray.value.push(item);
    } else {
      showDisabled.value = false
    }
  })
});
const openDrawer = () => {
  actionBarDrawer.value = true;
};
const changeRadio = (val: string) => {
  emit('update:size', val);
};
const changeShow = () => {
  show.value = !show.value;
};
const changeActionBar = () => {

};
defineExpose({
  openDrawer,
  changeRadio,
  changeShow,
  changeActionBar
})
</script>

<style scoped>
.configuration-bar-table-stylebox {
  border-radius: 7px;
  overflow: hidden;
}
</style>