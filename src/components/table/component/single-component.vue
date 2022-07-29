<template>
  <!--            Input 输入框-->
  <a-input v-if="colitem.type === 'input'" :size="size" v-model:value="Form[colitem.dataIndex]"
           :placeholder="colitem.placeholder || colitem.label" allow-clear :show-count="colitem.showCount"
           :maxlength="colitem.maxlength" :disabled="disabled"
           style="width: 100%">
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
      v-model:value="Form[colitem.dataIndex]"
      :auto-size="{ minRows: 4, maxRows: 8 }"
      allow-clear
      :show-count="colitem.showCount"
      :maxlength="colitem.maxlength"
      :placeholder="colitem.placeholder || colitem.label"
      :disabled="disabled"
      style="width: 100%"
  />
  <a-input-password v-if="colitem.type === 'password'"
                    :size="size"
                    v-model:value="Form[colitem.dataIndex]"
                    :placeholder="colitem.placeholder || colitem.label"
                    :disabled="disabled"
                    allow-clear/>
  <a-input-number v-if="colitem.type === 'number'"
                  :size="size"
                  v-model:value="Form[colitem.dataIndex]"
                  :controls="colitem.controls"
                  :defaultValue="colitem.defaultValue"
                  :formatter="colitem.formatter"
                  :parser="colitem.parser"
                  :step="colitem.step"
                  :string-mode="colitem.stringMode"
                  :min="colitem.min"
                  :max="colitem.max"
                  :placeholder="colitem.placeholder || colitem.label"
                  :disabled="disabled">
    <template #addonBefore>
      <slot :name="colitem.dataIndex + 'SearchaddonBefore'"></slot>
    </template>
    <template #addonAfter>
      <slot :name="colitem.dataIndex + 'SearchaddonAfter'"></slot>
    </template>
  </a-input-number>

  <!--            DatePicker 日期选择框-->
  <a-date-picker
      v-if="colitem.type === 'date' || (colitem.type === 'daterange' && (diaType === 'add' || diaType === 'edit'))"
      :size="size"
      v-model:value="Form[colitem.dataIndex]"
      :show-time="colitem.showTime"
      :picker="colitem.picker || 'date'"
      :disabled-date="colitem.disabledDate"
      :disabled-time="colitem.disabledDateTime"
      :format="colitem.format || 'YYYY-MM-DD HH:mm:ss'"
      :valueFormat="colitem.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
      :placeholder="colitem.placeholder || colitem.label"
      :disabled="disabled"
      style="width: 100%"/>
  <a-range-picker v-if="colitem.type === 'daterange' && diaType === 'search'"
                  :size="size"
                  v-model:value="Form[colitem.dataIndex]"
                  :ranges="colitem.ranges?ranges:null"
                  :show-time="colitem.showTime"
                  :picker="colitem.picker || 'date'"
                  :disabled-date="colitem.disabledDate"
                  :disabled-time="colitem.disabledRangeTime"
                  :format="colitem.format || 'YYYY-MM-DD HH:mm:ss'"
                  :valueFormat="colitem.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                  :disabled="disabled"
                  style="width: 100%"/>

  <!--            Select 选择器-->
  <a-select
      v-if="colitem.type === 'select'"
      ref="searchselect"
      v-model:value="Form[colitem.dataIndex]"
      :size="size"
      :show-search="colitem.showSearch"
      :mode="colitem.mode"
      :label-in-value="colitem.labelInValue"
      :placeholder="colitem.placeholder || colitem.label"
      @change="selectChange"
      allowClear
      :disabled="disabled"
      style="width: 100%"
  >
    <template v-for="(item, index) in options[colitem.dataIndex]" :key="index">
      <a-select-option
          :value="colitem.dataType === 'number' ? Number(item[colitem.props.value]) || Number(item.value) : item[colitem.props.value] || item.value">
        <template #suffixIcon>
          <slot :name="colitem.dataIndex + 'SearchsuffixIcon'"></slot>
        </template>
        <template #default>
          <slot :name="colitem.dataIndex + 'optionLabel'">
            {{ item[colitem.props.label] || item.label }}
          </slot>
        </template>
      </a-select-option>
    </template>
  </a-select>

  <!--            TimePicker 时间选择框-->
  <a-time-picker
      v-if="colitem.type === 'time'"
      v-model:value="Form[colitem.dataIndex]"
      :size="size"
      :use12-hours="colitem.use12Hours"
      allowClear
      :format="colitem.format"
      :value-format="colitem.valueFormat"
      :placeholder="colitem.placeholder || colitem.label"
      :disabled="disabled"
      style="width: 100%"/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import dayjs, {Dayjs} from 'dayjs';

type RangeValue = [Dayjs, Dayjs];

export default defineComponent({
  name: "single-component",
  props: {
    diaType: {
      type: String
    },
    colitem: {
      type: Object
    },
    Form: {
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
    disabled: {
      type: Boolean
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

<style scoped>

</style>