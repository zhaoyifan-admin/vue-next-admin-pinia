<template>
  <systemTable
      :option="option"
      :tableData.sync="tableData"
      :tableLoading.sync="tableLoading"
      :page.sync="page"
      :row-style="rowStyle"
      @onLoad="getTable"
      @searchChange="searchChange"
      @handleSave="handleSave"
      @handleUpdate="handleUpdate"
      @handleDel="handleDel"
      @refreshChange="refreshChange"
  >
  </systemTable>
</template>

<script lang="ts">
import {ElMessage, ElMessageBox} from 'element-plus';
import {ref, toRefs, reactive, computed, defineComponent, onMounted, onBeforeMount, h, shallowRef} from 'vue';
import {RouteRecordRaw} from 'vue-router';
import {fetchList} from '/@/api/ceshi';
import dayjs, { Dayjs } from 'dayjs';
type RangeValue = [Dayjs, Dayjs];

export default {
  name: "index",
  setup() {
    const state = reactive({
      num: "",
      tableLoading: true, // crud loading加载动画（可自定义字段）
      tableData: [], // 接口数据
      option: {
        AllSelectBtn: true, // 全选框
        Pagination: true, // 分页
        addBtn: true, // crud 新增按钮
        searchLabelWidth: 150, // 搜索框的标题宽度 默认值：80
        stripe: true, // 斑马线
        showradio: true,
        showIndex: true, // table 索引
        searchIcon: true, // 表单 (展示、收缩按钮)  显示
        operations: false, // 操作栏固定
        maxHeight: 450, // 表格最大高度（默认值： 600）
        column:  [
          {
            label: '车型编号',
            type: 'input',
            dataIndex: 'modelCode',
            search: true,
            labelslot: true,
            filter: true,
            span: 24, // 栅栏布局（默认值： 6）
          },
          {
            label: '车型名称',
            type: 'input',
            dataIndex: 'modelName',
            sortable: true
          },
          {
            label: '测试布局',
            type: 'daterange',
            dataIndex: 'ceshi',
            ranges: true,
            search: true,
            searchSpan: 12
          },
          {
            label: '燃油类型',
            type: 'select',
            dataIndex: 'fuelType',
            dataType: 'number',
            dicUrl: '/api/admin/dict/type/fuels_type',
            props: {
              label: 'label',
              value: 'value'
            },
          },
          {
            label: '数量',
            type: 'input',
            dataIndex: 'modelNum',
            span: 6,
            search: true,
            slot: true,
          },
          {
            label: '备注',
            type: 'textarea',
            dataIndex: 'note',
            search: false
          }
        ]
      },
      page: {
        pageNum: 1, // 当前页码数
        pageSize: 10, // 每页显示条目个数，支持 v-model 双向绑定
        total: 0, // 总条目数
        background: true, // 是否为分页按钮添加背景色
        // small: true, // 是否使用小型分页样式
        pagerCount: 5, // 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠。
        pageSizes: [5, 10, 20, 30], // 每页显示个数选择器的选项设置
      },
    });
    const rowStyle = ({row, rowIndex}: any) => {
      if (rowIndex % 2 === 0) {
        return {
          background: "#EED7BC",
        };
      }
    };
    // 查询表单
    const searchChange = async (page: object, params: object, done: any) => {
      getTable(page, params);
      done();
    };
    // 刷新table
    const refreshChange = async () => {
      getTable(state.page);
    };
    // 保存（新增）回调
    const handleSave = async (form: object, Loading: any, done: any) => {
      setTimeout(() => {
        Loading();
      }, 3000)
      // getTable(state.page);
    };
    const handleUpdate = async (form: object, Loading: any, done: any) => {
      setTimeout(() => {
        Loading();
      }, 3000)
      // getTable(state.page);
    };
    const handleDel = async (form: object, callback: any) => {
      setTimeout(() => {
        callback(0);
      }, 3000)
      // getTable(state.page);
    };
    // 打开新增菜单弹窗
    const onOpenAddMenu = () => {
      // addFormRef.value.openDialog();
    };
    // 打开编辑菜单弹窗
    const onOpenEditMenu = (row: RouteRecordRaw) => {
      // editMenuRef.value.openDialog(row);
    };
    // 删除当前行
    const onTabelRowDel = (row: RouteRecordRaw) => {
      ElMessageBox.confirm(`此操作将永久删除路由：${row.path}, 是否继续?`, '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }).then((res) => {
        ElMessage.success('删除成功');
      }).catch((error) => {
        console.log(error)
      });
    };
    // 获取主列表数据
    const getTable = async (page?: any, params?: object) => {
      state.tableLoading = true;
      fetchList(
          Object.assign({
            current: page.pageNum,
            size: page.pageSize,
          }, params)
      ).then((res) => {
        const data = res.data;
        state.tableLoading = false;
        state.tableData = data.records;
        state.page.total = data.total;
      }).catch((error) => {
        state.tableLoading = false;
        console.log(error)
      })
    };
    return {
      getTable,
      handleSave,
      handleUpdate,
      handleDel,
      refreshChange,
      searchChange,
      onOpenAddMenu,
      onOpenEditMenu,
      onTabelRowDel,
      rowStyle,
      ...toRefs(state),
    };
  },
}
</script>

<style scoped>
::v-deep(.el-table__body-wrapper tr td.el-table-fixed-column--right) {
  background: none;
}
</style>