<template>
  <el-form :model="searchForm" :label-width="option.searchLebal || '80px'" autocomplete="off">
    <el-row :gutter="20">
      <template v-for="(colitem, coli) in option.column" :key="coli">
        <el-col :span="6">
          <el-form-item>
            <template #label>
              <slot>
                {{ colitem.label + ':' }}
              </slot>
            </template>
            <template #default>
              <slot :name="colitem.dataIndex + 'Search'">
                <!--            Input 输入框-->
                <a-input v-if="colitem.type === 'input'" :size="size" v-model:value="searchForm[colitem.dataIndex]"
                         :placeholder="colitem.label" allow-clear :show-count="colitem.showCount"
                         :maxlength="colitem.maxlength">
                  <template #prefix>
                    <slot :name="colitem.dataIndex + 'Searchprefix'"></slot>
                  </template>
                  <template #suffix>
                    <slot :name="colitem.dataIndex + 'Searchsuffix'"></slot>
                  </template>
                  <template #addonBefore>
                    <slot :name="colitem.dataIndex + 'SearchaddonBefore'"></slot>
                  </template>
                  <template #addonAfter>
                    <slot :name="colitem.dataIndex + 'SearchaddonAfter'"></slot>
                  </template>
                </a-input>
                <a-textarea
                    v-if="colitem.type === 'textarea'"
                    v-model:value="searchForm[colitem.dataIndex]"
                    :placeholder="colitem.label"
                    auto-size
                    allow-clear
                    :show-count="colitem.showCount"
                    :maxlength="colitem.maxlength"
                />
                <a-input-password v-if="colitem.type === 'password'"
                                  :size="size"
                                  v-model:value="searchForm[colitem.dataIndex]"
                                  :placeholder="colitem.label"
                                  allow-clear/>
                <a-input-number v-if="colitem.type === 'number'"
                                :size="size"
                                v-model:value="searchForm[colitem.dataIndex]"
                                :controls="colitem.controls"
                                :defaultValue="colitem.defaultValue"
                                :formatter="colitem.formatter"
                                :parser="colitem.parser"
                                :step="colitem.step"
                                :string-mode="colitem.stringMode"
                                :min="colitem.min"
                                :max="colitem.max">
                  <template #addonBefore>
                    <slot :name="colitem.dataIndex + 'SearchaddonBefore'"></slot>
                  </template>
                  <template #addonAfter>
                    <slot :name="colitem.dataIndex + 'SearchaddonAfter'"></slot>
                  </template>
                </a-input-number>

                <!--            DatePicker 日期选择框-->
                <a-space direction="vertical" :size="12">
                  <a-date-picker v-if="colitem.type === 'date'"
                                 :size="size"
                                 v-model:value="searchForm[colitem.dataIndex]"
                                 :show-time="colitem.showTime"
                                 :picker="colitem.picker || 'date'"
                                 :disabled-date="colitem.disabledDate"
                                 :disabled-time="colitem.disabledDateTime"
                                 :format="colitem.format || 'YYYY-MM-DD HH:mm:ss'"
                                 :valueFormat="colitem.valueFormat || 'YYYY-MM-DD HH:mm:ss'"/>
                  <a-range-picker v-if="colitem.type === 'daterange'"
                                  :size="size"
                                  v-model:value="searchForm[colitem.dataIndex]"
                                  :ranges="colitem.ranges?ranges:null"
                                  :show-time="colitem.showTime"
                                  :picker="colitem.picker || 'date'"
                                  :disabled-date="colitem.disabledDate"
                                  :disabled-time="colitem.disabledRangeTime"
                                  :format="colitem.format || 'YYYY-MM-DD HH:mm:ss'"
                                  :valueFormat="colitem.valueFormat || 'YYYY-MM-DD HH:mm:ss'"/>
                </a-space>

                <!--            Select 选择器-->
                <a-select
                    v-if="colitem.type === 'select'"
                    ref="searchselect"
                    v-model:value="searchForm[colitem.dataIndex]"
                    :size="size"
                    :show-search="colitem.showSearch"
                    :mode="colitem.mode"
                    :label-in-value="colitem.labelInValue"
                    :placeholder="colitem.placeholder || colitem.label"
                    @change="selectChange"
                    allowClear
                    style="width: 100%"
                >
                  <template v-for="(item, index) in options[colitem.dataIndex]" :key="index">
                    <a-select-option :value="item[colitem.props.value] || item.value">
                      <template #suffixIcon>
                        <slot :name="colitem.dataIndex + 'SearchsuffixIcon'"></slot>
                      </template>
                      <template #default>
                        <slot :name="colitem.dataIndex + 'optionLabel'">
                          {{item[colitem.props.label] || item.label}}
                        </slot>
                      </template>
                    </a-select-option>
                  </template>
                </a-select>

                <!--            TimePicker 时间选择框-->
                <a-time-picker
                    v-if="colitem.type === 'time'"
                    v-model:value="searchForm[colitem.dataIndex]"
                    :size="size"
                    style="width: 100%"
                    :use12-hours="colitem.use12Hours"
                    allowClear
                    :format="colitem.format"
                    :value-format="colitem.valueFormat" />
              </slot>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>

</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import dayjs, {Dayjs} from 'dayjs';

type RangeValue = [Dayjs, Dayjs];

export default defineComponent({
  name: "table-search-forms",
  props: {
    searchForm: {
      type: Object
    },
    size: {
      type: String
    },
    option: {
      type: Object
    },
    options: {
      type: Object
    },
    selectChange: {
      type: Function,
      required: true
    }
  },
  setup(props) {

    return {
      ranges: {
        '今天': [dayjs(), dayjs()] as RangeValue,
        '当前月': [dayjs(), dayjs().endOf('month')] as RangeValue,
      },
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep(.arco-picker) {
  border: 1px solid #E3E7ED;
  background-color: transparent;
}

::v-deep(.arco-picker:hover) {
  border: 1px solid #5872E4;
  background-color: transparent;
}
</style>