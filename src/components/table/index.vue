<template>
  <div class="system-menu-container">
    <div class="system-table-btns">
      <div class="system-table-btns-left">
        <div class="system-table-btns-left-iconbtn">
          <el-tooltip class="box-item" effect="dark" content="刷新表格数据" placement="top">
            <el-button type="warning" :size="size">
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
          :size="size"
          :data="tableData"
          :max-height="option.maxHeight?option.maxHeight:600"
          :table-layout="option.tableLayout?option.tableLayout:'fixed'"
          :stripe="option.stripe?option.stripe:false"
          :border="option.border?option.border:true"
          :header-cell-style="{'text-align':'center','background':'#0967AA','color':'#ffffff','border-color':'#cecece'}"
          :cell-style="{'text-align':'center','border-color':'#cecece'}"
          cell-class-name="cell-class-name"
          style="width: 100%">
        <!--   自定义空数据   -->
        <template #empty>
          <el-empty :image="nullData" :image-size="200"/>
        </template>
        <el-table-column type="selection" width="55" v-if="option.showSelect || false" />
        <el-table-column type="index" label="序号" width="60" v-if="option.showIndex || true" />
        <template v-for="(colitem, coli) in option.column" :key="coli">
          <el-table-column
              v-if="!colitem.hide && !colitem.filter"
              :prop="colitem.prop"
              :label="colitem.label"
              :fixed="colitem.fixed"
              :sortable="colitem.sortable">
            <template #header="{ column, $index }">
              <slot :name="colitem.prop+'Header'" :scope="{ column, $index }">
                {{ colitem.label }}
              </slot>
            </template>
            <template #default="{ row, column, $index }">
              <slot :name="colitem.prop" :scope="{ row, column, $index }">
                {{ row[colitem.prop] }}
              </slot>
            </template>
          </el-table-column>
          <el-table-column
              v-if="!colitem.hide && colitem.filter"
              :prop="colitem.prop"
              :label="colitem.label"
              :fixed="colitem.fixed"
              :sortable="colitem.sortable"
              :filters="filters"
              :filter-method="filterMethod">
            <template #header="{ column, $index }">
              <slot :name="colitem.prop+'Header'" :systemscope="{ column, $index }">
                {{ colitem.label }}
              </slot>
            </template>
            <template #default="{ row, column, $index }">
              <slot :name="colitem.prop" :systemscope="{ row, column, $index }">
                {{ row[colitem.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
        <el-table-column fixed="right" width="155">
          <template #header>
            <i class="fa fa-filter" aria-hidden="true"></i> 操作栏
          </template>
          <template #default>
            <div class="action-bar">
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="查看"
                  placement="top"
              >
                <el-button type="info" :size="size">
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
      <el-drawer v-model="actionBarDrawer" :size="option.actionBarDrawerWidth || '35%'" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">
            <i class="fa fa-table" aria-hidden="true"></i> 表格配置项
          </h4>
          <i class="fa fa-times" aria-hidden="true" title="关闭" @click="close"></i>
        </template>
        This is drawer content.
      </el-drawer>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs, watch} from "vue";
import {tableStates} from "/@/components/table/index";
import nullData from "/@/components/table/static/images/null.svg";

export default defineComponent({
  name: 'systemTable',
  props: ['option', 'page', 'tableData'],
  components: {},
  setup: function (props:any, context) {
    const actionBarDrawer = ref(false);
    const colcheckdList = ref([]as any[]);
    const state = reactive<tableStates>({
      colcheckList: [],
      size: props.option.size || 'medium',
      nullData: nullData,
      tableLoading: false,
      tableData: [],
      searchForm: {},
      option: props.option,
      page: props.page
    })
    onMounted(() => {
      props.option.column.forEach((v:any)=>{
        state.colcheckList.push(v.label);
      });
      colcheckdList.value = state.colcheckList;
      onLoad();
    });
    /*监听props*/
    watch(props, (newProps, oldProps) => {
      state.tableData = newProps.tableData;
    }, {immediate: true});
    const filters = (data: any) => {
      let Array: any = [];
      state.tableData.forEach((item: any) => {
        Array.push({text: item[data.prop], value: item[data.prop]})
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
    return {
      onLoad,
      showActionBarDrawer,
      colcheckdList,
      actionBarDrawer,
      filters,
      filterMethod,
      colcheckdListChanged,
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
</style>
