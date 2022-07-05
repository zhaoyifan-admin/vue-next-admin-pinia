<template>
  <div class="system-menu-container">
    <div class="system-table-btns">
      <div class="system-table-btns-left">
        <div class="system-table-btns-left-iconbtn">
          <el-tooltip class="box-item" effect="dark" content="刷新表格数据" placement="top">
            <el-button type="warning" :size="size" @click="refreshChange">
              <i class="iconfont icon-shuaxin"></i>
            </el-button>
          </el-tooltip>
        </div>
        <el-button type="success" :size="size">
          <i class="fa fa-plus" aria-hidden="true"></i> 新 增
        </el-button>
        <el-button type="primary" :size="size" disabled>
          <i class="fa fa-pencil" aria-hidden="true"></i> 批量修改
        </el-button>
        <el-button type="danger" :size="size" disabled>
          <i class="fa fa-trash" aria-hidden="true"></i> 批量删除
        </el-button>
      </div>
      <div class="system-table-btns-right">
        <el-button type="primary" :size="size">Primary</el-button>
        <div class="system-table-btns-right-setting">
          <el-button-group class="table-search-button-group">
            <el-dropdown>
              <el-button :size="size" title="列显隐">
                <el-icon><Grid /></el-icon>
              </el-button>
              <template #dropdown>
                <el-checkbox-group class="system-table-btns-right-setting-checkbox-group" :size="size" v-model="colcheckdList" @change="colcheckdListChanged">
                  <template v-for="(colcheck, index) in colcheckList" :key="index">
                    <el-checkbox :label="colcheck" />
                  </template>
                </el-checkbox-group>
              </template>
            </el-dropdown>
            <el-button :size="size" title="查询表单显隐">
              <i class="iconfont icon-sousuo"></i>
            </el-button>
            <el-button :size="size" title="表格配置" @click="showActionBarDrawer">
              <i class="iconfont icon-kongzhi"></i>
            </el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div class="system-table-box">
      <el-table
          v-loading="tableLoading"
          element-loading-text="Loading ..."
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          :size="size"
          :data="tableData"
          :row-style="rowStyle"
          :max-height="option.maxHeight?option.maxHeight:600"
          :table-layout="option.tableLayout?option.tableLayout:'fixed'"
          :stripe="option.stripe"
          :border="option.border"
          :header-cell-style="{'text-align':'center','background':'#0967AA','color':'#ffffff','border-color':'#cecece'}"
          :cell-style="{'text-align':'center','border-color':'#cecece'}"
          cell-class-name="cell-class-name"
          style="width: 100%">
        <!--   自定义空数据   -->
        <template #empty>
          <el-empty :image="nullData" :image-size="200"/>
        </template>
        <el-table-column type="selection" width="55" v-if="option.showSelect" />
        <el-table-column type="index" label="序号" width="60" v-if="option.showIndex" />
        <el-table-column type="redio" label="单选" width="60" v-if="option.showradio">
          <template #default="scope">
            <el-radio-group v-model="colcheckdList" :size="size" >
              <el-radio :label="scope.row" size="large"></el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <template v-for="(colitem, coli) in option.column" :key="coli">
          <el-table-column
              v-if="!colitem.hide && !colitem.filter"
              :prop="colitem.dataIndex"
              :label="colitem.label"
              :fixed="colitem.fixed"
              :sortable="colitem.sortable">
            <template #header="{ column, $index }">
              <slot :name="colitem.dataIndex+'Header'" :scope="{ column, $index }">
                {{ colitem.label }}
              </slot>
            </template>
            <template #default="{ row, column, $index }">
              <slot :name="colitem.dataIndex" :scope="{ row, column, $index }">
                {{ row[colitem.dataIndex] }}
              </slot>
            </template>
          </el-table-column>
          <el-table-column
              v-if="!colitem.hide && colitem.filter"
              :prop="colitem.dataIndex"
              :label="colitem.label"
              :fixed="colitem.fixed"
              :sortable="colitem.sortable"
              :filters="filters"
              :filter-method="filterMethod">
            <template #header="{ column, $index }">
              <slot :name="colitem.dataIndex+'Header'" :systemscope="{ column, $index }">
                {{ colitem.label }}
              </slot>
            </template>
            <template #default="{ row, column, $index }">
              <slot :name="colitem.dataIndex" :systemscope="{ row, column, $index }">
                {{ row[colitem.dataIndex] }}
              </slot>
            </template>
          </el-table-column>
        </template>
        <el-table-column fixed="right" width="155">
          <template #header>
            <i class="fa fa-filter" aria-hidden="true"></i> 操作栏
          </template>
          <template #default="scope">
            <div class="action-bar">
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="查看"
                  placement="top"
              >
                <el-button type="info" :size="size" @click="showView(scope.row)">
                  <i class="fa fa-search-plus" aria-hidden="true"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="编辑"
                  placement="top"
              >
                <el-button type="primary" :size="size">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="删除"
                  placement="top"
              >
                <el-button type="danger" :size="size">
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                </el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
                    <el-col :span="24" class="mt10">
                      <div style="display: flex;align-items: center">
                        <span style="display: block;width: 130px;">显示大小：</span>
                        <el-radio-group v-model="size" :size="size">
                          <el-radio-button :size="size" :label="'large'">Large(大)</el-radio-button>
                          <el-radio-button :size="size" :label="'default'">Default(中)</el-radio-button>
                          <el-radio-button :size="size" :label="'small'">Small(小)</el-radio-button>
                        </el-radio-group>
                      </div>
                    </el-col>
                    <el-col :span="24" class="mt10">
                      <div style="display: flex;align-items: center">
                        <span style="display: block;width: 130px;">操作栏按钮类型：</span>
                        <el-radio-group v-model="actionBar" :size="size">
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
                <el-collapse-item title="表格列配置项" name="2">

                </el-collapse-item>
                <el-collapse-item title="表格其他配置项" name="3">

                </el-collapse-item>
              </el-collapse>
            </el-card>
          </div>
        </template>
      </el-drawer>
    </div>
    <el-dialog v-model="viewDialog" :show-close="false" width="45%" :top="option.viedTop || '10vh'" custom-class="table-dialog-flag">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-view-dia-header dia-header">
          <h4 :id="titleId" :class="titleClass">详情</h4>
          <close theme="outline" size="16" fill="#606266" strokeLinejoin="miter" strokeLinecap="square" style="cursor: pointer" @click="close"/>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="2" :size="size" border>
        <template v-for="(colitem, coli) in option.column" :key="coli">
          <el-descriptions-item :label="colitem.label" :span="colitem.span" :width="colitem.width" :min-width="100">{{ viewshowData[colitem.dataIndex] }}</el-descriptions-item>
        </template>
      </el-descriptions>
      <template #footer>
      <span class="dialog-footer">
        <el-button :size="size" type="primary" @click="viewDialog = false">
          <close-one theme="outline" size="16" fill="#ffffff" strokeLinejoin="miter" strokeLinecap="square"/>
          <span style="margin-left: 7px">关闭</span>
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs, watch} from "vue";
import {tableStates} from "/@/components/table/index";
import nullData from "/@/components/table/static/images/null.svg";
import {Close, CloseOne} from '@icon-park/vue-next';

export default defineComponent({
  name: 'systemTable',
  props: {
    option: {
      type: Object
    },
    page: {
      type: Array<any>
    },
    tableData: {
      type: Array<any>
    },
    tableLoading: {
      type: Boolean
    },
    rowStyle: {
      type: Function
    }
  },
  components: {Close, CloseOne},
  setup: function (props:any, context) {
    const viewDialog = ref(false);
    const actionBarDrawer = ref(false);
    const tableLoading = ref(false);
    const colcheckdList = ref([]as any[]);
    const activeNames = ref([]);
    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
    const state = reactive<tableStates>({
      colcheckList: [],
      size: props.option.size || 'default',
      nullData: nullData,
      tableData: [],
      searchForm: {},
      option: props.option,
      page: props.page,
      viewshowData: {}
    });
    const rowStyle = ({ row, rowIndex }:any) => {
      if(props.rowStyle != undefined) {
        return props.rowStyle({ row, rowIndex });
      }
    };
    onMounted(() => {
      props.option.column.forEach((v:any)=>{
        state.colcheckList.push(v.label);
      });
      colcheckdList.value = state.colcheckList;
      onLoad();
    });
    /*监听props*/
    watch(props, (newProps, oldProps) => {
      tableLoading.value = props.tableLoading;
      state.tableData = newProps.tableData;
    }, {immediate: true});
    const filters = (data: any) => {
      let Array: any = [];
      state.tableData.forEach((item: any) => {
        Array.push({text: item[data.dataIndex], value: item[data.dataIndex]})
      })
      return Array;
    };
    const showActionBarDrawer = () => {
      actionBarDrawer.value = true;
    };
    const filterMethod = (value:any, row:any, column:any) => {
      const property = column['property']
      return row[property] === value
    };
    // 获取列表
    const onLoad = () => {
      let page = state.page;
      let params = state.searchForm;
      context.emit("onLoad", page, params);
    };
    const refreshChange = () => {
      context.emit("refreshChange");
    };
    const colcheckdListChanged = (value:any) => {
      let columList:any = state.option;
      columList.column.forEach((v:any)=>{
        if(value.includes(v.label)) {
          v.hide = false;
        } else {
          v.hide = true;
        }
      })
    };
    const showView = (row:object) => {
      viewDialog.value = true;
      state.viewshowData = row;
    };
    return {
      viewDialog,
      onLoad,
      showActionBarDrawer,
      rowStyle,
      svg,
      colcheckdList,
      actionBarDrawer,
      tableLoading,
      activeNames,
      filters,
      filterMethod,
      refreshChange,
      colcheckdListChanged,
      showView,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.system-table-btns-right-setting-checkbox-group {
  display: grid;
  .el-checkbox {
    margin: 0 15px 0 10px!important;
  }
}
.dia-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.el-button-group>.el-dropdown>.el-button {
  border-left-color: var(--el-button-border-color)!important;
}
.el-drawer__title {
  font-size: 18px;
}
::v-deep(.table-dialog-flag) {
  --el-dialog-border-radius: 5px!important;
  .el-form-item__label {
    font-weight: bold!important;
  }
  .el-dialog__footer {
    padding: 10px 20px!important;
  }
}
.system-menu-container {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  overflow: hidden;
  background-color: #ffffff;
  padding: 20px;
  .system-table-btns {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .system-table-btns-left,
    .system-table-btns-right {
      flex: 1;
    }
    .system-table-btns-left {
      display: flex;
      align-items: center;
      .system-table-btns-left-iconbtn {
        margin-right: 10px;
        .iconfont,
        .el-icon {
          margin: 0!important;
        }
      }
    }
    .system-table-btns-right {
      text-align: right;
      display: contents;
      align-items: center;
      .system-table-btns-right-setting {
        .table-search-button-group {
          display: flex;
          .el-dropdown {
            .el-button {
              border-radius: 4px 0 0 4px;
              border-right: none!important;
            }
          }
        }
        margin-left: 10px;
        .iconfont,
        .el-icon {
          margin: 0!important;
        }
      }
    }
  }
  .system-table-box {
    ::v-deep(.el-table__column-filter-trigger i) {
      color: #ffffff;
    }
    ::v-deep(.el-table th.el-table__cell>.cell.highlight) {
      color: #ffffff;
    }
    ::v-deep(.el-radio__label){
      display: none;
    }
    ::v-deep(.el-radio.el-radio--large) {
      height: auto;
    }
    ::v-deep(.el-radio__inner) {
      border-radius: 0;
    }
    ::v-deep(.el-radio__inner::after) {
      border-radius: 0;
    }
    border-radius: 8px;
    overflow: hidden;
    .action-bar {
      display: inline-flex;
      align-items: center;
      .el-button {
        padding: 5px 6px!important;
        i.fa {
          margin: 0!important;
        }
      }
      .el-button,
      .el-button--large {
        height: auto;
      }
    }
    //.action-bar-view,
    //.action-bar-edit,
    //.action-bar-delete {
    //  display: inline-flex;
    //  padding: 5px 6px;
    //  border-radius: 5px;
    //  overflow: hidden;
    //  margin: 0 5px;
    //}
    //.action-bar-view {
    //  color: #ffffff;
    //  font-weight: bold;
    //  background-color: #5CB661;
    //}
    //.action-bar-edit {
    //  color: #ffffff;
    //  font-weight: bold;
    //  background-color: #2D8CF0;
    //}
    //.action-bar-delete {
    //  color: #ffffff;
    //  font-weight: bold;
    //  background-color: #ED4A3D;
    //}
  }
}
.drawer-box {
  padding: 15px;
}
</style>
