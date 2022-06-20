<template>
  <div class="system-add-menu-container">
    <el-dialog v-model="isShowDialog" :showClose="false" :top="option.top || '15vh'" :fullscreen="fullscreen" draggable>
      <template #title>
        <DialogTitle :type="'add'" :name="'菜单'" ref="AddFormTitle" @fullScreen="fullScreen" @closeDialog="closeDialog"/>
      </template>
      <el-form :model="ruleForm" :inline="true" :label-width="option.labelWidth || 110">
        <el-row :gutter="35">
          <template v-for="(columns,index) in option.column" :key="index">
            <el-col :span="columns.searchSpan || 12" class="mb20">
              <el-form-item style="width: 100%;">
                <template #label>
                  <slot :name="columns.prop+'Searchlabel'">
                    {{ columns.label }}
                  </slot>
                </template>
                <el-input
                    v-model="ruleForm[columns.prop]"
                    v-if="columns.type == 'input' || columns.type == 'textarea' || columns.type == 'password'"
                    clearable
                    :size="Size"
                    :type="columns.type || 'input'"
                    style="width: 100%"
                    :placeholder="'请输入 ' + columns.label"
                ></el-input>
                <el-input-number
                    v-model="ruleForm[columns.prop]"
                    v-else-if="columns.type == 'number'"
                    :precision="columns.precision"
                    :step="columns.step"
                    controls-position="right"
                    :size="Size"
                    style="width: 100%"
                    :min="columns.min"
                    :max="columns.max"/>
                <!-- 单选框-->
                <el-radio-group v-model="ruleForm[columns.prop]" :size="Size" v-else-if="columns.type == 'radio'">
                  <template #default v-if="!columns.isButton">
                    <el-radio v-for="(item,index) in columns.dicData" :label="item.value" :border="columns.border"
                              :key="index">
                      {{ item.label }}
                    </el-radio>
                  </template>
                  <template #default v-else>
                    <el-radio-button v-for="(item,index) in columns.dicData" :label="item.value" :key="index">
                      {{ item.label }}
                    </el-radio-button>
                  </template>
                </el-radio-group>
                <!--日期选择器-->
                <el-date-picker
                    v-model="ruleForm[columns.prop]"
                    v-else-if="columns.type == 'date' || columns.type == 'week' || columns.type == 'month' || columns.type == 'year' || columns.type == 'datetime' || columns.type == 'daterange' || columns.type == 'datetimerange'"
                    :type="columns.type || 'date'"
                    :size="Size"
                    style="width: 100%"
                    :placeholder="'请选择 ' + columns.label"
                />
                <!--复选框-->
                <el-checkbox-group v-model="ruleForm[columns.prop]" :size="Size" v-else-if="columns.type == 'checkbox'">
                  <el-checkbox v-for="(item,index) in columns.dicData" :key="index" :label="item.value">
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
                <!--评价选择器-->
                <el-rate
                    v-model="ruleForm[columns.prop]"
                    v-else-if="columns.type == 'rate'"
                    :allow-half="columns.allowHalf"
                    :texts="columns.texts"
                    :icons="columns.icons"
                    :colors="columns.colors"
                    :size="Size"
                />
                <!--select选择器-->
                <el-select
                    v-model="ruleForm[columns.prop]"
                    v-else-if="columns.type == 'select'"
                    :clearable="columns.clearable"
                    :multiple="columns.multiple"
                    :filterable="columns.filterable"
                    :placeholder="'请选择 ' + columns.label"
                    :size="Size">
                  <el-option
                      v-for="(item,index) in columns.options"
                      :key="index"
                      v-if="!columns.group"
                      :label="item[columns.props.label]"
                      :value="item[columns.props.value]"
                  />
                  <el-option-group
                      v-else
                      v-for="(group,index) in columns.dicData"
                      :key="group.label"
                      :label="group.label"
                  >
                    <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                  </el-option-group>
                </el-select>
                <!--滑块-->
                <el-slider
                    v-model="ruleForm[columns.prop]"
                    v-else-if="columns.type == 'slider'"
                    :step="columns.step"
                    :show-stops="columns.showStops"
                    :show-input="columns.showInput"
                    :range="columns.range"
                    :vertical="columns.vertical"
                    :marks="columns.marks"
                    :size="Size"
                />
                <!--开关-->
                <el-switch
                    v-model="ruleForm[columns.prop]"
                    v-else-if="columns.type == 'switch'"
                    :active-color="columns.activeColor"
                    :inactive-color="columns.inactiveColor"
                    :active-text="columns.activeText"
                    :inactive-text="columns.inactiveText"
                    :inline-prompt="columns.inlinePrompt"
                    :active-value="columns.activeValue"
                    :inactive-value="columns.inactiveValue"
                    :loading="columns.loading"
                    :size="Size"
                />
                <!--时间选择器-->
                <el-time-picker
                    v-model="ruleForm[columns.prop]"
                    v-else-if="columns.type == 'time'"
                    :arrow-control="columns.arrowControl"
                    :disabled-hours="columns.disabledHours"
                    :disabled-minutes="columns.disabledMinutes"
                    :disabled-seconds="columns.disabledSeconds"
                    :format="columns.format"
                    :is-range="columns.isRange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :placeholder="columns.label"
                    :size="Size"
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">新 增</el-button>
				</span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {reactive, toRefs, onMounted, defineComponent} from 'vue';

export default defineComponent({
  name: "addForm",
  props: ['option', 'Size'],
  setup: function (props, context) {
    const state = reactive({
      isShowDialog: false,
      fullscreen: false,
      ruleForm: {},
    });
    // 打开弹窗
    const openDialog = () => {
      state.isShowDialog = true;
    };
    // 关闭弹窗
    const closeDialog = () => {
      state.isShowDialog = false;
      state.fullscreen = false;
    };
    // 全屏
    const fullScreen = () => {
      state.fullscreen = !state.fullscreen;
    };
    // 取消
    const onCancel = () => {
      closeDialog();
    };
    return {
      onCancel,
      fullScreen,
      openDialog,
      closeDialog,
      ...toRefs(state),
    }
  }
});
</script>

<style scoped>
.dialog-title {
  width: 97%;
}
::v-deep(.el-dialog) {
  /*top: 155px;*/
  transform: none !important;
}
</style>