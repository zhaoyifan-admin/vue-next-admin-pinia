<template>
  <div class="system-menu-container">
    <div class="system-table-forms">
      <table-search-forms :searchForm="searchForm" :option="option" :options="options" :size="size"
                          :selectChange="selectChange"/>
    </div>
    <div class="system-table-btns">
      <div class="system-table-btns-left">
        <div class="system-table-btns-left-iconbtn">
          <el-tooltip class="box-item" effect="dark" content="刷新表格数据" placement="top">
            <el-button :size="size" @click="refreshChange">
              <i class="iconfont icon-shuaxin1"></i>
            </el-button>
          </el-tooltip>
        </div>
        <rtdp-button type="primary" :size="size" @click="showaddDialog">
          <i class="fa fa-plus" aria-hidden="true"></i> 新 增
        </rtdp-button>
        <rtdp-button type="primary" :size="size" disabled>
          <i class="fa fa-pencil" aria-hidden="true"></i> 批量修改
        </rtdp-button>
        <rtdp-button type="primary" :size="size" :disabled="rowRadioList === null" @click="showEditDialog(rowRadioList)">
          <i class="fa fa-pencil" aria-hidden="true"></i> 修改
        </rtdp-button>
        <rtdp-button type="danger" :size="size" disabled>
          <i class="fa fa-trash" aria-hidden="true"></i> 批量删除
        </rtdp-button>
        <rtdp-button type="danger" :size="size" :disabled="rowRadioList === null"
                   @click="handleDel(rowRadioList, 'menu')">
          <i class="fa fa-trash" aria-hidden="true"></i> 删除
        </rtdp-button>
        <rtdp-button plain :size="size" :disabled="rowRadioList === null" @click="clearRowList">
          <i class="iconfont icon-qingkong" aria-hidden="true"></i> 取消选择
        </rtdp-button>
      </div>
      <div class="system-table-btns-right">
        <el-button type="primary" :size="size">Primary</el-button>
        <div class="system-table-btns-right-setting">
          <el-button-group class="table-search-button-group">
            <el-dropdown>
              <el-button :size="size" title="列显隐">
                <el-icon>
                  <Grid/>
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-checkbox-group class="system-table-btns-right-setting-checkbox-group" :size="size"
                                   v-model="colcheckdList" @change="colcheckdListChanged">
                  <template v-for="(colcheck, index) in colcheckList" :key="index">
                    <el-checkbox :label="colcheck"/>
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
          :border="option.border"
          row-key="index"
          :row-style="rowStyle"
          :max-height="option.maxHeight?option.maxHeight:600"
          :table-layout="option.tableLayout?option.tableLayout:'fixed'"
          :stripe="option.stripe"
          :header-cell-style="{'text-align':'center','background':'#5872E4','color':'#ffffff'}"
          :cell-style="{'text-align':'center'}"
          :cell-class-name="cellClassName"
          style="width: 100%"
          @cell-dblclick="cellDblclick"
          @cell-mouse-enter="cellMouseEnter">
        <!--   自定义空数据   -->
        <template #empty>
          <el-empty :image="nullData" :image-size="200"/>
        </template>
        <el-table-column v-if="option.showIndex" :index="indexMethod" type="index" label="序号" width="60"/>
        <el-table-column type="selection" width="55" v-if="option.showSelect"/>
        <el-table-column type="redio" label="单选" width="60" v-if="option.showradio">
          <template #default="scope">
            <el-radio-group v-model="rowRadioList" :size="size">
              <el-radio :label="scope.$index" size="large"></el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <tableColumn v-for="(colitem, coli) in option.column"
                     ref="tableColumn"
                     :colitem="colitem"
                     :tabClickLabel="tabClickLabel"
                     :tabClickRowIndex="tabClickRowIndex"
                     :tabClickColIndex="tabClickColIndex"
                     :options="options"
                     :getpamentType="getpamentType"
                     :blur="blur"
                     :filters="filters(colitem)"
                     :filterMethod="filterMethod"
                     :visibleChange="visibleChange"
                     :selectChange="selectChange"
                     v-model:size="size"
                     :key="coli"></tableColumn>
        <el-table-column fixed="right" width="155">
          <template #header>
            <i class="fa fa-filter" aria-hidden="true"></i> 操作栏
          </template>
          <template #default="scope">
            <div class="action-bar">
              <el-button type="info" :size="size" title="查看" @click="showViewDialog(scope.row)">
                <i class="fa fa-search-plus" aria-hidden="true"></i>
              </el-button>
              <el-button type="primary" :size="size" title="编辑" @click="showEditDialog(scope.row)">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </el-button>
              <el-popconfirm title="是否确认删除当前选择数据？" @confirm="handleDel(scope.row, 'column')">
                <template #reference>
                  <el-button type="danger" :size="size" title="删除">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页器-->
      <el-pagination
          background
          class="mt15"
          style="justify-content: left;"
          :small="small"
          :total="total"
          :pager-count="pagerCount"
          :page-sizes="pageSizes"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          :hide-on-single-page="page.hidePage || false"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onHandleSizeChange"
          @current-change="onHandleCurrentChange"
      >
      </el-pagination>
      <configuration-bar ref="configurationbar" v-model:size="size" :option="option"/>
    </div>
    <table-viewdialog ref="tableViewdialog" :option="option" :size="size" :viewshowData="viewshowData"
                      :getpamentType="getpamentType" :handleClose="handleClose"></table-viewdialog>
    <table-adddialog ref="tableAdddialog" :option="option" :options="options" :size="size" :addForm="addForm"
                     :addDisabled="addDisabled" :addBtnLoading="addBtnLoading"
                     :handleClose="handleClose" :handleSave="handleSave"></table-adddialog>
    <table-editdialog ref="tableEditdialog" :option="option" :options="options" :size="size" :editForm="editForm"
                      :editDisabled="editDisabled" :editBtnLoading="editBtnLoading" :handleClose="handleClose"
                      :handleEdit="handleEdit"></table-editdialog>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs, watch} from "vue";
import {tableStates} from "/@/components/table/index";
import nullData from "/@/components/table/static/images/null.svg";
import tableSearchForms from "./component/table-search-forms.vue";
import tableViewdialog from "./component/table-viewdialog.vue";
import tableAdddialog from "./component/table-adddialog.vue";
import tableEditdialog from "./component/table-editdialog.vue";
import tableColumn from "./component/table-column.vue";
import configurationBar from "./component/configuration-bar.vue";
import {Close} from '@icon-park/vue-next';
import request from "/@/utils/request";
import {ElMessage, ElMessageBox} from "element-plus";

export default defineComponent({
  name: 'systemTable',
  props: {
    option: {
      type: Object
    },
    page: {
      type: Object
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
  components: {
    Close,
    tableSearchForms,
    tableViewdialog,
    tableAdddialog,
    tableEditdialog,
    tableColumn,
    configurationBar
  },
  setup: function (props: any, context) {
    const addDialog = ref(false);
    const addDisabled = ref(false);
    const addBtnLoading = ref(false);
    const editDialog = ref(false);
    const editDisabled = ref(false);
    const editBtnLoading = ref(false);
    const tableLoading = ref(false);
    const colcheckdList = ref([] as any[]);
    const rowRadioList = ref(null);
    const tabClickLabel = ref("");
    const tabClickRowIndex = ref(0);
    const tabClickColIndex = ref(0);
    const mouseHoverLabel = ref("");
    const mouseHoverRowIndex = ref(0);
    const mouseHoverColIndex = ref(0);
    const editinput = ref(null);
    const tableColumn = ref([] as any[]);
    const configurationbar = ref();
    const tableViewdialog = ref();
    const tableAdddialog = ref();
    const tableEditdialog = ref();
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
      options: {},
      colcheckList: [],
      size: props.option.size || 'default',
      nullData: nullData,
      tableData: [],
      searchForm: {},
      addForm: {},
      editForm: {},
      option: props.option,
      page: props.page,
      small: props.page.small || false,
      total: props.page.total || 0,
      pagerCount: props.page.pagerCount || 5,
      pageSizes: props.page.pageSizes || [10, 20, 30],
      viewshowData: {}
    });
    const indexMethod = (index: number) => {
      if (props.page.pageNum && props.page.pageSize) {
        index = (index + 1) + (props.page.pageNum - 1) * props.page.pageSize
      } else {
        index = index + 1
      }
      return index;
    };
    const rowStyle = ({row, rowIndex}: any) => {
      if (props.rowStyle != undefined) {
        return props.rowStyle({row, rowIndex});
      }
    };
    const getpamentType = (key: any, val: any) => {
      let pamentTypeName = '';
      if (state.options[key] != undefined) {
        state.options[key].filter((item: any) => {
          if (val == item.value) {
            pamentTypeName = item.label
          }
        })
      }
      return pamentTypeName
    };
    const visibleChange = (val: any) => {

    };
    const selectChange = (val: any) => {
      console.log(val)
    };
    const blur = () => {
      tabClickLabel.value = "";
      tabClickRowIndex.value = 0;
      tabClickColIndex.value = 0;
    };
    const cellClassName = ({
                             row,
                             column,
                             rowIndex,
                             columnIndex
                           }: { row: any, column: any, rowIndex: number, columnIndex: number }) => {
      row.$index = rowIndex + 1;
      column.$index = columnIndex + 1;
    };
    const cellDblclick = (row: any, column: any, cell: any, event: any) => {
      tabClickLabel.value = column.property;
      tabClickRowIndex.value = row.$index;
      tabClickColIndex.value = column.$index;
      setTimeout(() => {
        const findEditNode = tableColumn.value.find((item: any) => {
          return item.colitem.dataIndex == column.property
        })
        findEditNode.editFlag.focus();
      }, 10);
    };
    const cellMouseEnter = (row: any, column: any, cell: any, event: any) => {
      mouseHoverLabel.value = column.property;
      mouseHoverRowIndex.value = row.$index;
      mouseHoverColIndex.value = column.$index;
    };
    // 分页改变
    const onHandleSizeChange = (val: number) => {
      props.page.pageSize = val;
      let params = state.searchForm;
      let page = state.page;
      context.emit("onLoad", page, params);
    };
    // 分页改变
    const onHandleCurrentChange = (val: number) => {
      props.page.pageNum = val;
      let params = state.searchForm;
      let page = state.page;
      context.emit("onLoad", page, params);
    };
    onMounted(async () => {
      for (const v of props.option.column) {
        state.colcheckList.push(v.label);
      }
      colcheckdList.value = state.colcheckList;
      onLoad();
      for (const v of props.option.column) {
        if (v.type === 'select' && typeof (v.dicUrl) == 'string') {
          let result: any = [];

          function f() {
            return request({
              url: v.dicUrl,
              method: 'get',
            })
          }

          await f().then((res) => {
            result = res.data;
          }).catch((error) => {
            console.log(error)
          })
          state.options[v.dataIndex] = result;
        }
      }
    });
    /*监听props*/
    watch(props, (newProps, oldProps) => {
      tableLoading.value = props.tableLoading;
      state.tableData = newProps.tableData;
      state.total = newProps.page.total;
      state.page = newProps.page;
    }, {immediate: true});
    const filters = (data: any) => {
      let Array: any = [];
      state.tableData.forEach((item: any) => {
        Array.push({text: item[data.dataIndex], value: item[data.dataIndex]})
      })
      return Array;
    };
    const filterMethod = (value?: any, row?: any, column?: any) => {
      const property = column['property']
      return row[property] === value
    };
    const clearRowList = () => {
      rowRadioList.value = null;
    };
    const showActionBarDrawer = () => {
      configurationbar.value.openDrawer();
    };
    // 获取列表
    const onLoad = () => {
      let page = state.page;
      let params = state.searchForm;
      context.emit("onLoad", page, params);
    };
    const handleSave = (form: any) => {
      console.log(form);
      addDisabled.value = true;
      addBtnLoading.value = true;
      context.emit("handleSave", form, Loading, done);
    };
    const handleEdit = (form: any) => {
      editDisabled.value = true;
      editBtnLoading.value = true;
      context.emit("handleSave", form, Loading, done);
    };
    const handleDel = (row: object, key: String) => {
      if (key === 'column') {
        ElMessage({
          message: '正在删除数据，请稍后...',
          grouping: true,
          type: 'warning',
          duration: 0
        });
        context.emit("handleDel", row, callback);
      } else {
        ElMessageBox.confirm(
            '是否确认删除当前选择数据？该操作无法撤回。',
            '再次确认',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
              center: true,
            }
        ).then(() => {
          ElMessage({
            message: '正在删除数据，请稍后...',
            grouping: true,
            type: 'warning',
            duration: 0
          });
          context.emit("handleDel", row, callback);
        }).catch(() => {
          if (rowRadioList.value !== null) {
            rowRadioList.value = null;
          }
          ElMessage({
            type: 'info',
            message: '已取消删除操作',
          })
        })
      }
    };
    const refreshChange = () => {
      context.emit("refreshChange");
    };
    const colcheckdListChanged = (value: any) => {
      let columList: any = state.option;
      columList.column.forEach((v: any) => {
        if (value.includes(v.label)) {
          v.hide = false;
        } else {
          v.hide = true;
        }
      })
    };
    const showaddDialog = () => {
      tableAdddialog.value.openDialog();
    };
    const showViewDialog = (row: object) => {
      tableViewdialog.value.openDialog();
      state.viewshowData = row;
    };
    const showEditDialog = (row: object) => {
      tableEditdialog.value.openDialog();
      state.editForm = row;
    };
    const handleClose = () => {
      if (rowRadioList.value !== null) {
        rowRadioList.value = null;
      }
      state.addForm = {};
      state.editForm = {};
      tableViewdialog.value.closeDialog();
      tableAdddialog.value.closeDialog();
      tableEditdialog.value.closeDialog();
    };
    const callback = (code: number, message: string) => {
      ElMessage.closeAll();
      if (rowRadioList.value !== null) {
        rowRadioList.value = null;
      }
      if (code === 0) {
        ElMessage({
          message: message || "操作成功。",
          type: 'success',
        })
      } else {
        ElMessage({
          message: message || "操作失败。",
          type: 'error',
        })
      }
    };
    const done = () => {
      addDialog.value = false;
      addDisabled.value = false;
      addBtnLoading.value = false;
      editDialog.value = false;
      editDisabled.value = false;
      editBtnLoading.value = false;
    };
    const Loading = () => {
      addDisabled.value = false;
      addBtnLoading.value = false;
      editDisabled.value = false;
      editBtnLoading.value = false;
    };
    return {
      indexMethod,
      svg,
      tableLoading,
      addDialog,
      addDisabled,
      addBtnLoading,
      editDialog,
      editDisabled,
      editBtnLoading,
      colcheckdList,
      rowRadioList,
      tabClickLabel,
      tabClickRowIndex,
      tabClickColIndex,
      mouseHoverLabel,
      mouseHoverRowIndex,
      mouseHoverColIndex,
      editinput,
      tableColumn,
      configurationbar,
      tableViewdialog,
      tableAdddialog,
      tableEditdialog,
      blur,
      cellClassName,
      cellDblclick,
      cellMouseEnter,
      onHandleSizeChange,
      onHandleCurrentChange,
      done,
      callback,
      Loading,
      onLoad,
      showActionBarDrawer,
      rowStyle,
      getpamentType,
      visibleChange,
      selectChange,
      clearRowList,
      filters,
      filterMethod,
      refreshChange,
      colcheckdListChanged,
      showViewDialog,
      showEditDialog,
      showaddDialog,
      handleClose,
      handleSave,
      handleEdit,
      handleDel,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.system-table-btns-right-setting-checkbox-group {
  display: grid;

  .el-checkbox {
    margin: 0 15px 0 10px !important;
  }
}

.dia-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.el-button-group > .el-dropdown > .el-button {
  border-left-color: var(--el-button-border-color) !important;
}

.el-drawer__title {
  font-size: 18px;
}

::v-deep(.table-dialog-flag) {
  --el-dialog-border-radius: 5px !important;

  .el-form-item__label {
    font-weight: bold !important;
  }

  .el-dialog__footer {
    padding: 10px 20px !important;
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
          margin: 0 !important;
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
              border-right: none !important;
            }
          }
        }

        margin-left: 10px;

        .iconfont,
        .el-icon {
          margin: 0 !important;
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

    ::v-deep(.el-radio__label) {
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

    ::v-deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
      background-color: #5872E4;
    }

    border-radius: 8px;
    overflow: hidden;

    .action-bar {
      display: inline-flex;
      align-items: center;

      .el-button {
        padding: 5px 6px !important;

        i.fa {
          margin: 0 !important;
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
