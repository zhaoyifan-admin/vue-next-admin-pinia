<template>
  <div class="system-menu-container">
    <div class="system-table-btns">
      <div class="system-table-btns-left">
        <div class="system-table-btns-left-iconbtn">
          <el-tooltip class="box-item" effect="dark" content="刷新表格数据" placement="top">
            <el-button :size="size" @click="refreshChange">
              <i class="iconfont icon-shuaxin1"></i>
            </el-button>
          </el-tooltip>
        </div>
        <el-button type="primary" :size="size" @click="showaddDialog">
          <i class="fa fa-plus" aria-hidden="true"></i> 新 增
        </el-button>
        <el-button type="primary" :size="size" disabled>
          <i class="fa fa-pencil" aria-hidden="true"></i> 批量修改
        </el-button>
        <el-button type="primary" :size="size" :disabled="rowRadioList.length === 0" @click="showEdit(rowRadioList)">
          <i class="fa fa-pencil" aria-hidden="true"></i> 修改
        </el-button>
        <el-button type="danger" :size="size" disabled>
          <i class="fa fa-trash" aria-hidden="true"></i> 批量删除
        </el-button>
        <el-button type="danger" :size="size" :disabled="rowRadioList.length === 0">
          <i class="fa fa-trash" aria-hidden="true"></i> 删除
        </el-button>
        <el-button plain :size="size" :disabled="rowRadioList.length === 0" @click="clearRowList">
          <i class="iconfont icon-qingkong" aria-hidden="true"></i> 取消选择
        </el-button>
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
          row-key="index"
          :row-style="rowStyle"
          :max-height="option.maxHeight?option.maxHeight:600"
          :table-layout="option.tableLayout?option.tableLayout:'fixed'"
          :stripe="option.stripe"
          :border="option.border"
          :header-cell-style="{'text-align':'center','background':'#409EFF','color':'#ffffff',}"
          :cell-style="{'text-align':'center'}"
          :cell-class-name="cellClassName"
          style="width: 100%"
          @cell-dblclick="cellDblclick">
        <!--   自定义空数据   -->
        <template #empty>
          <el-empty :image="nullData" :image-size="200"/>
        </template>
        <el-table-column type="selection" width="55" v-if="option.showSelect"/>
        <el-table-column type="index" label="序号" width="60" v-if="option.showIndex"/>
        <el-table-column type="redio" label="单选" width="60" v-if="option.showradio">
          <template #default="scope">
            <el-radio-group v-model="rowRadioList" :size="size">
              <el-radio :label="scope.row" size="large"></el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <!--        <template v-for="(colitem, coli) in option.column" :key="coli">-->
        <!--          <el-table-column-->
        <!--              v-if="!colitem.hide"-->
        <!--              :prop="colitem.dataIndex"-->
        <!--              :label="colitem.label"-->
        <!--              :fixed="colitem.fixed"-->
        <!--              :sortable="colitem.sortable"-->
        <!--              :filters="colitem.filter?filters:null"-->
        <!--              :filter-method="colitem.filter?filterMethod:null"-->
        <!--              :show-overflow-toolti="true">-->
        <!--            <template #header="{ column, $index }">-->
        <!--              <slot :name="colitem.dataIndex+'Header'" :scope="{ column, $index }">-->
        <!--                {{ colitem.label }}-->
        <!--              </slot>-->
        <!--            </template>-->
        <!--            <template #default="{ row, column, $index }">-->
        <!--              <slot :name="colitem.dataIndex" :scope="{ row, column, $index }">-->
        <!--                <div v-if="colitem.type === 'select'">-->
        <!--                  <el-select-->
        <!--                      v-model="row[colitem.dataIndex]"-->
        <!--                      v-if="colitem.type === 'select'-->
        <!--                      && tabClickLabel === colitem.dataIndex-->
        <!--                      && tabClickRowIndex === row.index-->
        <!--                      && tabClickColIndex === column.index"-->
        <!--                      :size="size"-->
        <!--                      :placeholder="colitem.placeholder || '请选择 '"-->
        <!--                      ref="editinput"-->
        <!--                      @visible-change="visibleChange"-->
        <!--                      @change="selectChange"-->
        <!--                      @blur="blur"-->
        <!--                      clearable-->
        <!--                      style="width: 100%">-->
        <!--                    <el-option-->
        <!--                        v-for="(item, index) in options[colitem.dataIndex]"-->
        <!--                        :key="index"-->
        <!--                        :label="item[colitem.props.label] || item.label"-->
        <!--                        :value="colitem.dataType === 'number' ? Number(item[colitem.props.value]) || Number(item.value) :-->
        <!--                         item[colitem.props.value] || item.value"-->
        <!--                    />-->
        <!--                  </el-select>-->
        <!--                  <span v-else>{{ getpamentType(colitem.dataIndex, row[colitem.dataIndex]) }}</span>-->
        <!--                </div>-->
        <!--                <div v-else>-->
        <!--                  <el-input-->
        <!--                      v-model="row[colitem.dataIndex]"-->
        <!--                      v-if="colitem.type === 'input'-->
        <!--                      && tabClickLabel === colitem.dataIndex-->
        <!--                      && tabClickRowIndex === row.index-->
        <!--                      && tabClickColIndex === column.index"-->
        <!--                      ref="editinput"-->
        <!--                      :size="size"-->
        <!--                      @blur="blur"-->
        <!--                      clearable/>-->
        <!--                  <span v-else>{{ row[colitem.dataIndex] }}</span>-->
        <!--                </div>-->
        <!--              </slot>-->
        <!--            </template>-->
        <!--          </el-table-column>-->
        <!--        </template>-->
        <tableColumn v-for="(colitem, coli) in option.column"
                     ref="tableColumn"
                     :colitem="colitem"
                     :tabClickLabel="tabClickLabel"
                     :tabClickRowIndex="tabClickRowIndex"
                     :tabClickColIndex="tabClickColIndex"
                     :options="options"
                     :getpamentType="getpamentType"
                     :blur="blur"
                     :size="size"></tableColumn>
        <el-table-column fixed="right" width="155">
          <template #header>
            <i class="fa fa-filter" aria-hidden="true"></i> 操作栏
          </template>
          <template #default="scope">
            <div class="action-bar">
              <el-button type="info" :size="size" title="查看" @click="showView(scope.row)">
                <i class="fa fa-search-plus" aria-hidden="true"></i>
              </el-button>
              <el-button type="primary" :size="size" title="编辑" @click="showEdit(scope.row)">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </el-button>
              <el-popconfirm title="是否确认删除当前选择数据？" @confirm="handleDel(scope.row)">
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
    <el-dialog v-model="viewDialog" :show-close="false" :close-on-click-modal="false" width="45%"
               :top="option.top || '15vh'"
               custom-class="table-dialog-flag">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-view-dia-header dia-header">
          <span :id="titleId" :class="titleClass">{{ option.viewTitle || '详情' }}</span>
          <close theme="outline" size="15" fill="#606266" strokeLinejoin="miter" strokeLinecap="square"
                 style="cursor: pointer" @click="close"/>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="2" :size="size" border>
        <template v-for="(colitem, coli) in option.column" :key="coli">
          <el-descriptions-item :label="colitem.label" :span="colitem.span" :min-width="colitem.width || 80">
            <div v-if="colitem.type === 'select'">
              {{ getpamentType(colitem.dataIndex, viewshowData[colitem.dataIndex]) }}
            </div>
            <div v-else>{{ viewshowData[colitem.dataIndex] }}</div>
          </el-descriptions-item>
        </template>
      </el-descriptions>
      <template #footer v-if="option.viewFooter || true">
        <span class="dialog-footer">
          <el-button :size="size" @click="viewDialog = false">
            <template #icon>
              <slot name="viewBtnIcon">
                <i class="iconfont icon-guanbi"></i>
              </slot>
            </template>
            {{ option.viewBtnText || '关 闭' }}
          </el-button>
          <slot name="viewBtn"></slot>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="addDialog" :show-close="false" :close-on-click-modal="false" width="45%"
               :top="option.top || '15vh'"
               :before-close="handleClose" custom-class="table-dialog-flag">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-view-dia-header dia-header">
          <span :id="titleId" :class="titleClass">{{ option.addTitle || '新增' }}</span>
          <close theme="outline" size="16" fill="#606266" strokeLinejoin="miter" strokeLinecap="square"
                 style="cursor: pointer" @click="close"/>
        </div>
      </template>
      <el-form :model="addForm" :size="size" label-width="120px" :disabled="addDisabled">
        <el-row :gutter="20">
          <template v-for="(colitem, coli) in option.column" :key="coli">
            <el-col :span="colitem.searchSpan || 12">
              <el-form-item :label="colitem.label + '：'">
                <el-input
                    v-model="addForm[colitem.dataIndex]"
                    v-if="colitem.type === 'input'"
                    :size="size"
                    :placeholder="colitem.placeholder || '请输入 ' + colitem.label"
                    clearable
                    style="width: 100%"/>
                <el-input
                    v-model="addForm[colitem.dataIndex]"
                    v-if="colitem.type === 'textarea'"
                    :size="size"
                    type="textarea"
                    :placeholder="colitem.placeholder || '请输入 ' + colitem.label"
                    clearable
                    :autosize="{ minRows: 4, maxRows: 8}"
                    style="width: 100%"/>
                <el-select
                    v-model="addForm[colitem.dataIndex]"
                    v-if="colitem.type === 'select'"
                    :size="size"
                    :placeholder="colitem.placeholder || '请选择 ' + colitem.label"
                    @visible-change="visibleChange"
                    @change="selectChange"
                    clearable
                    style="width: 100%">
                  <el-option
                      v-for="(item, index) in options[colitem.dataIndex]"
                      :key="index"
                      :label="item[colitem.props.label] || item.label"
                      :value="item[colitem.props.value] || item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button :size="size" @click="handleClose">
            <template #icon>
              <slot name="addCancelBtnIcon">
                <i class="iconfont icon-guanbi"></i>
              </slot>
            </template>
            {{ option.addCancelBtnText || '关 闭' }}
          </el-button>
          <el-button :size="size" type="primary" :loading="addBtnLoading" @click="handleSave(addForm)">
            <template #icon>
              <slot name="addConfirmBtnIcon">
                <i v-show="!addBtnLoading" class="iconfont icon-zhengque-correct"></i>
              </slot>
            </template>
            {{ option.addConfirmBtnText || '提 交' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="editDialog" :show-close="false" :close-on-click-modal="false" width="45%"
               :top="option.top || '15vh'"
               :before-close="handleClose" custom-class="table-dialog-flag">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-view-dia-header dia-header">
          <span :id="titleId" :class="titleClass">{{ option.addTitle || '编辑' }}</span>
          <close theme="outline" size="16" fill="#606266" strokeLinejoin="miter" strokeLinecap="square"
                 style="cursor: pointer" @click="close"/>
        </div>
      </template>
      <el-form :model="editForm" :size="size" label-width="120px" :disabled="editDisabled">
        <el-row :gutter="20">
          <template v-for="(colitem, coli) in option.column" :key="coli">
            <el-col :span="colitem.searchSpan || 12">
              <el-form-item :label="colitem.label + '：'">
                <el-input
                    v-model="editForm[colitem.dataIndex]"
                    v-if="colitem.type === 'input'"
                    :size="size"
                    :placeholder="colitem.placeholder || '请输入 ' + colitem.label"
                    clearable
                    style="width: 100%"/>
                <el-input
                    v-model="editForm[colitem.dataIndex]"
                    v-if="colitem.type === 'textarea'"
                    :size="size"
                    type="textarea"
                    :placeholder="colitem.placeholder || '请输入 ' + colitem.label"
                    clearable
                    :autosize="{ minRows: 4, maxRows: 8}"
                    style="width: 100%"/>
                <el-select
                    v-model="editForm[colitem.dataIndex]"
                    v-if="colitem.type === 'select'"
                    :size="size"
                    :placeholder="colitem.placeholder || '请选择 ' + colitem.label"
                    @visible-change="visibleChange"
                    @change="selectChange"
                    clearable
                    style="width: 100%">
                  <el-option
                      v-for="(item, index) in options[colitem.dataIndex]"
                      :key="index"
                      :label="item[colitem.props.label] || item.label"
                      :value="item[colitem.props.value] || item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button :size="size" @click="handleClose">
            <template #icon>
              <slot name="editCancelBtnIcon">
                <i class="iconfont icon-guanbi"></i>
              </slot>
            </template>
            {{ option.editCancelBtnText || '关 闭' }}
          </el-button>
          <el-button :size="size" type="primary" :loading="editBtnLoading" @click="handleEdit(editForm)">
            <template #icon>
              <slot name="editConfirmBtnIcon">
                <i v-show="!editBtnLoading" class="iconfont icon-zhengque-correct"></i>
              </slot>
            </template>
            {{ option.editConfirmBtnText || '修 改' }}
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
import tableColumn from "./component/table-column.vue";
import {Close} from '@icon-park/vue-next';
import request from "/@/utils/request";
import {ElMessage} from "element-plus";

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
  components: {Close, tableColumn},
  setup: function (props: any, context) {
    const addDialog = ref(false);
    const addDisabled = ref(false);
    const addBtnLoading = ref(false);
    const editDialog = ref(false);
    const editDisabled = ref(false);
    const editBtnLoading = ref(false);
    const viewDialog = ref(false);
    const actionBarDrawer = ref(false);
    const tableLoading = ref(false);
    const colcheckdList = ref([] as any[]);
    const rowRadioList = ref([]);
    const activeNames = ref(['1', '2', '3']);
    const tabClickLabel = ref("");
    const tabClickRowIndex = ref("");
    const tabClickColIndex = ref("");
    const editinput = ref(null);
    const tableColumn = ref(null);
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
      viewshowData: {}
    });
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
      tabClickRowIndex.value = "";
      tabClickColIndex.value = "";
    };
    const cellClassName = ({
                             row,
                             column,
                             rowIndex,
                             columnIndex
                           }: { row: any, column: any, rowIndex: number, columnIndex: number }) => {
      row.index = rowIndex;
      column.index = columnIndex;
    };
    const cellDblclick = (row: any, column: any, cell: any, event: any) => {
      tabClickLabel.value = column.property;
      tabClickRowIndex.value = row.index;
      tabClickColIndex.value = column.index;
      setTimeout(() => {
        tableColumn.value[column.index -1].editFlag.focus();
      }, 10);
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
    }, {immediate: true});
    const filters = (data: any) => {
      let Array: any = [];
      state.tableData.forEach((item: any) => {
        Array.push({text: item[data.dataIndex], value: item[data.dataIndex]})
      })
      console.log(Array)
      return Array;
    };
    const filterMethod = (value?: any, row?: any, column?: any) => {
      const property = column['property']
      return row[property] === value
    };
    const clearRowList = () => {
      rowRadioList.value = [];
    };
    const showActionBarDrawer = () => {
      actionBarDrawer.value = true;
    };
    // 获取列表
    const onLoad = () => {
      let page = state.page;
      let params = state.searchForm;
      context.emit("onLoad", page, params);
    };
    const handleSave = (form: any) => {
      addDisabled.value = true;
      addBtnLoading.value = true;
      context.emit("handleSave", form, Loading, done);
    };
    const handleEdit = (form: any) => {
      editDisabled.value = true;
      editBtnLoading.value = true;
      context.emit("handleSave", form, Loading, done);
    };
    const handleDel = (row: object) => {
      ElMessage({
        message: '正在删除数据，请稍后...',
        grouping: true,
        type: 'warning',
        duration: 0
      });
      context.emit("handleDel", row, callback);
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
      addDialog.value = true;
    };
    const showView = (row: object) => {
      viewDialog.value = true;
      state.viewshowData = row;
    };
    const showEdit = (row: object) => {
      console.log(row);
      editDialog.value = true;
      state.editForm = row;
    };
    const handleClose = () => {
      addDialog.value = false;
      editDialog.value = false;
      viewDialog.value = false;
      state.addForm = {};
      state.editForm = {};
    };
    const callback = (code: number, message: string) => {
      ElMessage.closeAll();
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
      svg,
      tableLoading,
      addDialog,
      addDisabled,
      addBtnLoading,
      editDialog,
      editDisabled,
      editBtnLoading,
      viewDialog,
      colcheckdList,
      rowRadioList,
      actionBarDrawer,
      activeNames,
      tabClickLabel,
      tabClickRowIndex,
      tabClickColIndex,
      editinput,
      tableColumn,
      blur,
      cellClassName,
      cellDblclick,
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
      showView,
      showEdit,
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
