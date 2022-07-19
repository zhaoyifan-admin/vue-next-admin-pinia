<template>
  <el-table-column v-if="!colitem.hide && !colitem.filter && !colitem.children"
                   :prop="colitem.dataIndex"
                   :label="colitem.label"
                   :fixed="colitem.fixed"
                   :sortable="colitem.sortable"
                   :show-overflow-toolti="true">
    <template #header="{ column, $index }">
      <slot :name="colitem.dataIndex+'Header'" :scope="{ column, $index }">
        {{ colitem.label }}
      </slot>
    </template>
    <template #default="{ row, column, $index }">
      <slot :name="colitem.dataIndex" :scope="{ row, column, $index }">
        <div v-if="colitem.type === 'select'">
          <el-select
              v-model="row[colitem.dataIndex]"
              v-if="colitem.type === 'select'
                      && tabClickLabel === colitem.dataIndex
                      && tabClickRowIndex === row.index
                      && tabClickColIndex === column.index"
              :size="size"
              :placeholder="colitem.placeholder || '请选择 '"
              ref="editFlag"
              @visible-change="visibleChange"
              @change="selectChange"
              @blur="blur"
              clearable
              style="width: 100%">
            <el-option
                v-for="(item, index) in options[colitem.dataIndex]"
                :key="item.id"
                :label="item[colitem.props.label] || item.label"
                :value="colitem.dataType === 'number' ?
                        Number(item[colitem.props.value]) || Number(item.value) :
                        item[colitem.props.value] || item.value"
            />
          </el-select>
          <span v-else>{{ getpamentType(colitem.dataIndex, row[colitem.dataIndex]) }}</span>
        </div>
        <div v-else>
          <el-input
              v-model="row[colitem.dataIndex]"
              v-if="colitem.type === 'input'
                      && tabClickLabel === colitem.dataIndex
                      && tabClickRowIndex === row.index
                      && tabClickColIndex === column.index"
              ref="editFlag"
              :size="size"
              @blur="blur"
              clearable/>
          <span v-else>{{ row[colitem.dataIndex] }}</span>
        </div>
      </slot>
    </template>
  </el-table-column>
  <el-table-column v-if="!colitem.hide && colitem.filter && !colitem.children"
                   :prop="colitem.dataIndex"
                   :label="colitem.label"
                   :fixed="colitem.fixed"
                   :sortable="colitem.sortable"
                   :filters="filters"
                   :filter-method="filterMethod"
                   :show-overflow-toolti="true">
    <template #header="{ column, $index }">
      <slot :name="colitem.dataIndex+'Header'" :scope="{ column, $index }">
        {{ colitem.label }}
      </slot>
    </template>
    <template #default="{ row, column, $index }">
      <slot :name="colitem.dataIndex" :scope="{ row, column, $index }">
        <div v-if="colitem.type === 'select'">
          <el-select
              v-model="row[colitem.dataIndex]"
              v-if="colitem.type === 'select'
                      && tabClickLabel === colitem.dataIndex
                      && tabClickRowIndex === row.index
                      && tabClickColIndex === column.index"
              :size="size"
              :placeholder="colitem.placeholder || '请选择 '"
              ref="editFlag"
              @visible-change="visibleChange"
              @change="selectChange"
              @blur="blur"
              clearable
              style="width: 100%">
            <el-option
                v-for="(item, index) in options[colitem.dataIndex]"
                :key="index"
                :label="item[colitem.props.label] || item.label"
                :value="colitem.dataType === 'number' ?
                        Number(item[colitem.props.value]) || Number(item.value) :
                        item[colitem.props.value] || item.value"
            />
          </el-select>
          <span v-else>{{ getpamentType(colitem.dataIndex, row[colitem.dataIndex]) }}</span>
        </div>
        <div v-else>
          <el-input
              v-model="row[colitem.dataIndex]"
              v-if="colitem.type === 'input'
                      && tabClickLabel === colitem.dataIndex
                      && tabClickRowIndex === row.index
                      && tabClickColIndex === column.index"
              ref="editFlag"
              :size="size"
              @blur="blur"
              clearable/>
          <span v-else>{{ row[colitem.dataIndex] }}</span>
        </div>
      </slot>
    </template>
  </el-table-column>

  <!--  多表头处理-->
  <el-table-column v-if="!colitem.hide && !colitem.filter && colitem.children"
                   :label="colitem.label"
                   :fixed="colitem.fixed"
                   :sortable="colitem.sortable"
                   :show-overflow-toolti="true">
    <table-column v-for="(cochlitem, cochli) in colitem.children"
                  :colitem="cochlitem"
                  :key="cochli"
                  :options="options"
                  :filters="filters"
                  :filter-method="filterMethod"
                  :getpamentType="getpamentType"
                  :blur="blur"
                  :visibleChange="visibleChange"
                  :selectChange="selectChange"
                  v-model:size="size" />
  </el-table-column>
  <el-table-column v-if="!colitem.hide && colitem.filter && colitem.children"
                   :label="colitem.label"
                   :fixed="colitem.fixed"
                   :sortable="colitem.sortable"
                   :filters="filters"
                   :filter-method="filterMethod"
                   :show-overflow-toolti="true">
    <table-column v-for="(cochlitem, cochli) in colitem.children"
                  :colitem="cochlitem"
                  :key="cochli"
                  :options="options"
                  :filters="filters"
                  :filter-method="filterMethod"
                  :getpamentType="getpamentType"
                  :blur="blur"
                  :visibleChange="visibleChange"
                  :selectChange="selectChange"
                  v-model:size="size" />
  </el-table-column>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';

export default defineComponent({
  name: "table-column",
  props: {
    colitem: {
      type: Object
    },
    tabClickLabel: {
      type: String
    },
    tabClickRowIndex: {
      type: Number
    },
    tabClickColIndex: {
      type: Number
    },
    options: {
      type: Object
    },
    filters: {
      type: Array<any>
    },
    filterMethod: {
      type: Function,
      required: true
    },
    visibleChange: {
      type: Function,
      required: true
    },
    selectChange: {
      type: Function,
      required: true
    },
    size: {
      type: String
    },
    getpamentType: {
      type: Function,
      required: true
    },
    blur: {
      type: Function,
      required: true
    },
  },
  setup: function (props: any, context) {
    const editFlag = ref(null);
    return {
      editFlag
    }
  },
})
</script>