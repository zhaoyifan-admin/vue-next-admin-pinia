<template>
  <systemTable
      :option="option"
      :TableData="tableData"
      :tableLoading="tableLoading"
      @onLoad="getTable"
      @searchChange="searchChange"
  >

    <template #menuLeft="{zyfsolt}">
      <el-button :size="zyfsolt.size">测试左插槽按钮</el-button>
    </template>
    <template #menuRight="{zyfsolt}">
      <el-button :size="zyfsolt.size">测试右插槽按钮</el-button>
    </template>
    <!--    <template #opcardNoLabel>
          <span>测试Label姓名</span>
        </template>
        <template #title="{ zyfslot }">
          <SvgIcon :name="zyfslot.row.meta.icon" />
          <span class="ml10">{{ $t(zyfslot.row.meta.title) }}</span>
        </template>-->
    <!--    <template #opcardNoHeader="{ zyfslot }">
          测试header
        </template>-->
    <!--    <template #employeeName="{ zyfslot }">
          <el-tag effect="dark" size="small" type="success">
            菜单
          </el-tag>
        </template>-->
  </systemTable>
</template>

<script lang="ts">
import {ref, toRefs, reactive, computed, defineComponent, onMounted, onBeforeMount, h, shallowRef} from 'vue';
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
        Paginations: { // 分页配置项
          background: true, // 是否为分页按钮添加背景色
          // small: true, // 是否使用小型分页样式
          pagerCount: 5, // 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠。
          pageSizes: [5, 10, 20, 30], // 每页显示个数选择器的选项设置
          page: {
            pageNum: 1, // 当前页码数
            pageSize: 10, // 每页显示条目个数，支持 v-model 双向绑定
            total: 0 // 总条目数
          },
        },
        addBtn: true, // crud 新增按钮
        searchLabelWidth: 150, // 搜索框的标题宽度 默认值：80
        stripe: true, // 斑马线
        // ShowIndex: true, // table 索引
        searchIcon: true, // 表单 (展示、收缩按钮)  显示
        operations: false, // 操作栏固定
        maxHeight: 600, // 表格最大高度（默认值： 600）
        headerAlign: "center",
        column: [
          {
            label: '操作员卡编号',
            type: 'input',
            prop: 'opcardNo',
            search: true,
            labelslot: true,
            addDisplay: true,
            span: 6, // 栅栏布局（默认值： 6）
            headerslot: true, // 自定义表头
            columnSlot: true,  // (开启/关闭)自定义 列显隐配置 列名
            columnSlotname: "测试自定义列名"  // 自定义 列显隐配置 列名
          },
          {
            label: '读卡器类型',
            type: 'input',
            prop: 'readerType',
            span: 6,
            search: true,
          },
          {
            label: '密码',
            type: 'password',
            prop: 'posOpcardPwd',
            span: 6,
            // search: true,
          },
          {
            label: '所属员工',
            type: 'number',
            maxlength: 10,
            // showWordLimit: true,
            prop: 'employeeName',
            span: 6,
            search: true,
            slot: true,
          },
          {
            label: '测试组件脚本',
            type: 'select',
            prop: 'date',
            all: true,
            dicData: [{
              label: '男',
              value: 0
            }, {
              label: '女',
              value: 1
            }, {
              label: '未知',
              value: ''
            }],
            // prefixIcon:shallowRef({
            //   render() {
            //     return h('p', 'pre')
            //   },
            // }),
            search: true,
            slot: true,
          }
        ]
      },
    });
    // 查询表单
    const searchChange = async (page: object, params: object, done: any) => {
      getTable(page, params);
      done();
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
      })
          .then(() => {
            ElMessage.success('删除成功');
          })
          .catch(() => {
          });
    };
    // 获取主列表数据
    const getTable = async (page?: object, params?: object) => {
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
        state.option.Paginations.page.total = data.total;
      }).catch((error) => {
        state.tableLoading = false;
        console.log(error)
      })
    };
    return {
      getTable,
      searchChange,
      onOpenAddMenu,
      onOpenEditMenu,
      onTabelRowDel,
      ...toRefs(state),
    };
  },
}
</script>

<style scoped>

</style>