<template>
  <div class="system-menu-container">
    <!--    <el-card shadow="hover">-->
    <el-card shadow="always" class="mb15" v-if="(option.column.findIndex((item) => item.search === true)) != -1 && option.CardMode">
      <div class="system-menu-search" >
        <el-form ref="formRef" label-position="right" :model="searchForm" class="demo-ruleForm"
                 :label-width="option.searchLabelWidth || 110">
          <el-row>
            <template v-for="(columns,index) in option.column" :key="index">
              <el-col class="mb10" :xs="12" :sm="12" :md="12" :lg="columns.span || 6" :xl="columns.span || 6"
                      v-show="!columns.searchshow" v-if="columns.search"
                      :span="columns.span || 6">
                <el-form-item style="width: 100%;" :rules="columns.searchRules || []">
                  <template #label>
                    <slot :name="columns.prop+'Label'">{{ columns.label }}</slot>
                  </template>
                  <!--表单插槽-->
                  <template #default="{ row, column, $index }">
                    <slot :zyfslot="{ row, column, $index }" :name="columns.prop+'Search'">
                      <!-- 输入框-->
                      <el-input
                          v-model="searchForm[columns.prop]"
                          v-if="columns.type === 'text' || columns.type === 'input' || columns.type === 'textarea'"
                          :clearable="columns.clearable || false"
                          :size="Size"
                          :rows="columns.rows || 4"
                          :autosize="columns.autosize || false"
                          :maxlength="columns.maxlength || ''"
                          :show-word-limit="columns.showWordLimit || false"
                          style="width: 100%;"
                          :disabled="AllDisabled"
                          :type="columns.type || 'input'"
                          :placeholder="columns.label"
                          @change="formChange"
                      >
                        <template v-if="columns.suffix" #suffix>
                          <slot :name="columns.prop+'Suffix'"></slot>
                        </template>
                        <template v-if="columns.prefix" #prefix>
                          <slot :name="columns.prop+'prefix'"></slot>
                        </template>
                      </el-input>
                      <!--数字输入框-->
                      <el-input-number
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'number'"
                          :precision="columns.precision"
                          :step="columns.step"
                          :size="Size"
                          style="width: 100%;"
                          controls-position="right"
                          :min="columns.min"
                          :max="columns.max"
                      >
                      </el-input-number>
                      <!-- 单选框-->
                      <el-radio-group
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type === 'radio'"
                          :size="Size"
                          style="width: 100%;"
                      >
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
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'date' || columns.type == 'dates' || columns.type == 'datetime' || columns.type == 'week' || columns.type == 'month' || columns.type == 'year'"
                          :type="columns.type || 'date'"
                          :shortcuts="columns.shortcuts || []"
                          :format="columns.format || 'YYYY-MM-DD HH:mm:ss'"
                          :value-format="columns.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                          :unlink-panels="columns.unlinkPanels || false"
                          :prefix-icon="columns.prefixIcon || ''"
                          :size="Size"
                          style="width: 100%;"
                          :placeholder="columns.label">
                        <template #default="cell">
                          <div class="cell" :class="{ current: cell.isCurrent }">
                            <span class="text">{{ cell.text }}</span>
                          </div>
                        </template>
                      </el-date-picker>
                      <!-- 日期时间选择器-->
                      <el-date-picker
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'daterange' || columns.type ==  'monthrange' || columns.type == 'datetimerange'"
                          :type="columns.type || 'daterange'"
                          :shortcuts="columns.shortcuts || []"
                          :format="columns.format || 'YYYY-MM-DD HH:mm:ss'"
                          :value-format="columns.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                          :unlink-panels="columns.unlinkPanels || false"
                          :prefix-icon="columns.prefixIcon || ''"
                          :size="Size"
                          style="width: 100%;"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间">
                        <template #default="cell">
                          <div class="cell" :class="{ current: cell.isCurrent }">
                            <span class="text">{{ cell.text }}</span>
                          </div>
                        </template>
                      </el-date-picker>
                      <!--复选框-->
                      <el-checkbox-group
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'checkbox'"
                          :size="Size"
                          style="width: 100%;display: flex;">
                        <el-checkbox v-for="(item,index) in columns.dicData" :key="index" :label="item.value">
                          {{ item.label }}
                        </el-checkbox>
                      </el-checkbox-group>
                      <!--评价选择器-->
                      <el-rate
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'rate'"
                          :allow-half="columns.allowHalf"
                          :texts="columns.texts"
                          :icons="columns.icons"
                          :colors="columns.colors"
                          :size="Size"
                      />
                      <!--select选择器-->
                      <el-select
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type === 'select'"
                          :clearable="columns.clearable"
                          :multiple="columns.multiple"
                          :filterable="columns.filterable"
                          :placeholder="columns.label"
                          :size="Size"
                          style="width: 100%;">
                        <el-option
                            v-for="(item,index) in columns.options"
                            v-if="!columns.group"
                            :key="index"
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
                          v-model="searchForm[columns.prop]"
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
                          v-model="searchForm[columns.prop]"
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
                          v-model="searchForm[columns.prop]"
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
                      />
                    </slot>
                  </template>
                </el-form-item>
              </el-col>
            </template>
            <el-col class="mb10" :xs="12" :sm="12" :md="12" :lg="showspan || 24" :xl="showspan || 24" :span="showspan"
                    style="justify-content: center;">
              <el-button type="primary" :size="Size" :loading="FormSearch" class="ml10" @click="searchChange">
                <el-icon>
                  <ele-Search/>
                </el-icon>
                搜 索
              </el-button>
              <el-button :size="Size" :loading="FormSearch" plain class="ml10" @click="resetChange">
                <el-icon>
                  <ele-Delete/>
                </el-icon>
                清 空
              </el-button>
              <el-button :size="Size" v-if="searchSpan>=24 && searchIcon && !showsearchIcon" :loading="FormSearch" plain
                         class="ml10" @click="open">
                <el-icon>
                  <ele-ArrowDown/>
                </el-icon>
                展 开
              </el-button>
              <el-button :size="Size" v-if="searchSpan>=24 && searchIcon && showsearchIcon" :loading="FormSearch" plain
                         class="ml10" @click="fold">
                <el-icon>
                  <ele-ArrowUp/>
                </el-icon>
                折 叠
              </el-button>
              <!--                {{option.column.filter((item) => item.search === true).length}}-->
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card shadow="always">
      <div class="system-menu-search mb15" v-if="(option.column.findIndex((item) => item.search === true)) != -1 && !option.CardMode">
        <el-form ref="formRef" label-position="right" :model="searchForm" class="demo-ruleForm"
                 :label-width="option.searchLabelWidth || 110">
          <el-row>
            <template v-for="(columns,index) in option.column" :key="index">
              <el-col class="mb10" :xs="12" :sm="12" :md="12" :lg="columns.span || 6" :xl="columns.span || 6"
                      v-show="!columns.searchshow" v-if="columns.search"
                      :span="columns.span || 6">
                <el-form-item style="width: 100%;" :rules="columns.searchRules || []">
                  <template #label>
                    <slot :name="columns.prop+'Label'">{{ columns.label }}</slot>
                  </template>
                  <!--表单插槽-->
                  <template #default="{ row, column, $index }">
                    <slot :zyfslot="{ row, column, $index }" :name="columns.prop+'Search'">
                      <!-- 输入框-->
                      <el-input
                          v-model="searchForm[columns.prop]"
                          v-if="columns.type == 'text' || columns.type == 'input' || columns.type == 'textarea'"
                          :clearable="columns.clearable || false"
                          :size="Size"
                          :rows="columns.rows || 4"
                          :autosize="columns.autosize || false"
                          :maxlength="columns.maxlength || ''"
                          :show-word-limit="columns.showWordLimit || false"
                          style="width: 100%;"
                          :disabled="AllDisabled"
                          :type="columns.type || 'input'"
                          :placeholder="columns.label"
                          @change="formChange"
                      >
                        <template v-if="columns.suffix" #suffix>
                          <slot :name="columns.prop+'Suffix'"></slot>
                        </template>
                        <template v-if="columns.prefix" #prefix>
                          <slot :name="columns.prop+'prefix'"></slot>
                        </template>
                      </el-input>
                      <!--数字输入框-->
                      <el-input-number
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'number'"
                          :precision="columns.precision"
                          :step="columns.step"
                          :size="Size"
                          style="width: 100%;"
                          controls-position="right"
                          :min="columns.min"
                          :max="columns.max"
                      >
                      </el-input-number>
                      <!-- 单选框-->
                      <el-radio-group
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'radio'"
                          :size="Size"
                          style="width: 100%;"
                      >
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
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'date' || columns.type == 'dates' || columns.type == 'datetime' || columns.type == 'week' || columns.type == 'month' || columns.type == 'year'"
                          :type="columns.type || 'date'"
                          :shortcuts="columns.shortcuts || []"
                          :format="columns.format || 'YYYY-MM-DD HH:mm:ss'"
                          :value-format="columns.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                          :unlink-panels="columns.unlinkPanels || false"
                          :prefix-icon="columns.prefixIcon || ''"
                          :size="Size"
                          style="width: 100%;"
                          :placeholder="columns.label">
                        <template #default="cell">
                          <div class="cell" :class="{ current: cell.isCurrent }">
                            <span class="text">{{ cell.text }}</span>
                          </div>
                        </template>
                      </el-date-picker>
                      <!-- 日期时间选择器-->
                      <el-date-picker
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'daterange' || columns.type ==  'monthrange' || columns.type == 'datetimerange'"
                          :type="columns.type || 'daterange'"
                          :shortcuts="columns.shortcuts || []"
                          :format="columns.format || 'YYYY-MM-DD HH:mm:ss'"
                          :value-format="columns.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                          :unlink-panels="columns.unlinkPanels || false"
                          :prefix-icon="columns.prefixIcon || ''"
                          :size="Size"
                          style="width: 100%;"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间">
                        <template #default="cell">
                          <div class="cell" :class="{ current: cell.isCurrent }">
                            <span class="text">{{ cell.text }}</span>
                          </div>
                        </template>
                      </el-date-picker>
                      <!--复选框-->
                      <el-checkbox-group
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'checkbox'"
                          :size="Size"
                          style="width: 100%;display: flex;">
                        <el-checkbox v-for="(item,index) in columns.dicData" :key="index" :label="item.value">
                          {{ item.label }}
                        </el-checkbox>
                      </el-checkbox-group>
                      <!--评价选择器-->
                      <el-rate
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'rate'"
                          :allow-half="columns.allowHalf"
                          :texts="columns.texts"
                          :icons="columns.icons"
                          :colors="columns.colors"
                          :size="Size"
                      />
                      <!--select选择器-->
                      <el-select
                          v-model="searchForm[columns.prop]"
                          v-else-if="columns.type == 'select'"
                          :clearable="columns.clearable"
                          :multiple="columns.multiple"
                          :filterable="columns.filterable"
                          :placeholder="columns.label"
                          :size="Size">
                        <el-option
                            v-for="(item,index) in columns.options"
                            v-if="!columns.group"
                            :key="index"
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
                          v-model="searchForm[columns.prop]"
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
                          v-model="searchForm[columns.prop]"
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
                          v-model="searchForm[columns.prop]"
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
                      />
                    </slot>
                  </template>
                </el-form-item>
              </el-col>
            </template>
            <el-col class="mb10" :xs="12" :sm="12" :md="12" :lg="showspan || 24" :xl="showspan || 24" :span="showspan"
                    style="justify-content: center;">
              <el-button type="primary" :size="Size" :loading="FormSearch" class="ml10" @click="searchChange">
                <el-icon>
                  <ele-Search/>
                </el-icon>
                搜 索
              </el-button>
              <el-button :size="Size" :loading="FormSearch" plain class="ml10" @click="resetChange">
                <el-icon>
                  <ele-Delete/>
                </el-icon>
                清 空
              </el-button>
              <el-button :size="Size" v-if="searchSpan>=24 && searchIcon && !showsearchIcon" :loading="FormSearch" plain
                         class="ml10" @click="open">
                <el-icon>
                  <ele-ArrowDown/>
                </el-icon>
                展 开
              </el-button>
              <el-button :size="Size" v-if="searchSpan>=24 && searchIcon && showsearchIcon" :loading="FormSearch" plain
                         class="ml10" @click="fold">
                <el-icon>
                  <ele-ArrowUp/>
                </el-icon>
                折 叠
              </el-button>
<!--              <rtdpButton type="danger" plain :size="Size" class="ml10">-->
<!--                <i class="iconfont iconna-qingkong"></i>-->
<!--                测试-->
<!--              </rtdpButton>-->
              <!--                {{option.column.filter((item) => item.search === true).length}}-->
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="system-menu-btn mb15">
        <span class="mr5" v-if="actionBar ==='text'">
          <el-button :size="Size" type="primary" title="新增" ref="addFormBtn"
                     v-if="option.addBtn == null || option.addBtn" @click="onOpenAddMenu">
            <i class="iconfont iconna-xinzeng"></i>
            <span class="ml5">新 增</span>
          </el-button>
          <el-button :size="Size" type="warning">
            <i class="iconfont iconna-qingkong"></i>
            <span class="ml5">清空选项</span>
          </el-button>
        </span>
        <span class="mr5" v-else>
          <el-button :size="Size" type="primary" title="新增" ref="addFormBtn"
                     v-if="option.addBtn == null || option.addBtn" @click="onOpenAddMenu">
            <i class="iconfont iconna-xinzeng"></i>
          </el-button>
          <el-button :size="Size" type="warning" @click="toggleSelection">
            <i class="iconfont iconna-qingkong"></i>
            <span class="ml5">清空选项</span>
          </el-button>
        </span>
        <!--        左插槽-->
        <slot name="menuLeft" :zyfsolt="{size: Size}"></slot>
        <div class="flr">
          <!--          右插槽-->
          <slot name="menuRight" :zyfsolt="{size: Size}"></slot>
          <el-button-group class="ml-4 ml5 actionBar">
            <el-button :size="Size" title="查询表单显隐" @click="showForm">
              <i class="iconfont iconna-sousuo"></i>
            </el-button>
            <el-button :size="Size" title="刷新表格数据" @click="onLoad">
              <i class="iconfont iconna-shuaxin1"></i>
            </el-button>
            <el-button :size="Size" title="表格配置" @click="onColumnDrawer">
              <i class="iconfont iconna-kongzhi"></i>
            </el-button>
          </el-button-group>
        </div>
      </div>
      <el-table
          ref="crud"
          v-loading="tableLoading"
          element-loading-text="Loading ..."
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :border="Border"
          row-key="name"
          style="width: 100%"
          :size="Size"
          :data="tableData"
          :option="option"
          @row-dblclick='RowDbclick'
          :stripe="option.stripe"
          :header-align="option.headerAlign"
          :max-height="option.maxHeight || 600"
          :row-style="rowStyle"
          :highlight-current-row="true"
          :header-cell-style="{'text-align':'center','background':'#F5F7FA'}"
          :cell-style="{'text-align':'center'}"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <template #empty>
          <div class="table-empty">
            <img :src="tableNull" alt="暂无数据" style="width: 250px;height: auto;">
            <span style="margin-bottom: 35px;font-weight: bold;">暂无数据</span>
          </div>
        </template>
        <el-table-column v-if="option.AllSelectBtn" type="selection" width="55"/>
        <el-table-column v-if="option.ShowIndex" :index="indexMethod" label="序号" type="index" width="55"/>
        <template v-if="tableData">
          <template v-for="(columns,index) in option.column" :key="index">
            <el-table-column
                v-if="!columns.hide && !columns.filters"
                :prop="columns.prop"
                :sortable="columns.sortable"
                :fixed="columns.fixed"
                :label="columns.label"
                :width="columns.width"
                show-overflow-tooltip>
              <template #header="{ column, $index }">
                <slot :name="columns.prop+'Header'" :zyfslot="{ column, $index }">
                  {{ column.label }}
                </slot>
              </template>
              <template #default="{ row, column, $index }" v-if="columns.slot">
                <slot :name="columns.prop" :zyfslot="{ row, column, $index }">
                  {{ row[columns.prop] }}
                </slot>
              </template>
            </el-table-column>
            <el-table-column
                v-if="!columns.hide && columns.filters"
                :prop="columns.prop"
                :sortable="columns.sortable"
                :fixed="columns.fixed"
                :label="columns.label"
                :width="columns.width"
                :filters="filterSelectionNodes(columns)"
                :filter-method="filterMethods"
                show-overflow-tooltip>
              <template #header="{ column, $index }" v-if="columns.headerslot">
                <slot :name="columns.prop+'Header'" :zyfslot="{ column, $index }">
                  {{ column.label }}
                </slot>
              </template>
              <template #default="{ row, column, $index }" v-if="columns.slot">
                <slot :name="columns.prop" :zyfslot="{ row, column, $index }">
                  {{ row[columns.prop] }}
                </slot>
              </template>
            </el-table-column>
          </template>
        </template>
        <!--        操作栏配置-->
        <el-table-column v-if="tableData" label="操作" :fixed="option.operations?'right':false" show-overflow-tooltip
                         width="auto">
          <template #default="scope">
            <TableActionBar
                :size="Size"
                :scope="scope"
                :actionBar="actionBar"
                :MenuArray="['edit','del']"
                @LookMenu=""
                @AddMenu="onOpenAddMenu"
                @EditMenu="onOpenEditMenu"
                @DelMenu="onTabelRowDel"/>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页器-->
      <el-pagination
          v-if="option.Pagination"
          @size-change="onHandleSizeChange"
          @current-change="onHandleCurrentChange"
          class="mt15"
          background
          :small="small"
          :pager-count="pagerCount"
          :page-sizes="pageSizes"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="justify-content: center;"
      >
      </el-pagination>
    </el-card>
    <!--    </el-card>-->
    <!--    新增表单组件-->
    <addForm ref="addFormRef" :option="option" :Size="Size"/>
    <!--    编辑表单组件-->
<!--    <EditMenu ref="editMenuRef"/>-->
    <!--    CRUD 功能配置-->
    <el-drawer title="Table配置" append-to-body size="43%" v-model="ColumnDrawer">
      <template #default>
        <div class="drawer-box">
          <el-card :size="Size" class="box-card">
            <template #header>
              <div class="card-header">
                <span>基础配置</span>
              </div>
            </template>
            <div>
              <el-row>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" class="mt10">
                  <span>显示边框：</span>
                  <el-switch v-model="Border" :size="Size" width="50" inline-prompt active-text="是"
                             inactive-text="否"></el-switch>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" class="mt10">
                  <span>显示斑马纹：</span>
                  <el-switch
                      v-model="option.stripe"
                      :size="Size"
                      width="50"
                      inline-prompt active-text="是"
                      inactive-text="否">
                  </el-switch>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" class="mt10">
                  <span>显示索引：</span>
                  <el-switch v-model="option.ShowIndex" :size="Size" width="50" inline-prompt active-text="是"
                             inactive-text="否"></el-switch>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" class="mt10">
                  <span>显示多选框：</span>
                  <el-switch v-model="option.AllSelectBtn" :size="Size" width="50" inline-prompt active-text="是"
                             inactive-text="否"></el-switch>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" class="mt10">
                  <span>卡片模式：</span>
                  <el-switch
                      v-model="option.CardMode"
                      :size="Size"
                      width="50"
                      active-color="#01D06E"
                      inactive-color="#EC372C"
                      inline-prompt active-text="开启"
                      inactive-text="关闭"></el-switch>
                </el-col>
                <el-col :span="24" class="mt10">
                  <span style="display: block;width: 130px;">显示大小：</span>
                  <el-radio-group v-model="Size" size="large">
                    <el-radio-button :size="Size" :label="'large'">Large(大)</el-radio-button>
                    <el-radio-button :size="Size" :label="'default'">Default(中)</el-radio-button>
                    <el-radio-button :size="Size" :label="'small'">Small(小)</el-radio-button>
                  </el-radio-group>
                </el-col>
                <el-col :span="24" class="mt10">
                  <span style="display: block;width: 130px;">操作栏按钮类型：</span>
                  <el-radio-group v-model="actionBar" size="large">
                    <el-radio-button :size="Size" :label="'menu'">
                      菜单按钮
                    </el-radio-button>
                    <el-radio-button :size="Size" :label="'text'">
                      文本按钮
                    </el-radio-button>
                    <el-radio-button :size="Size" :label="'merge'">
                      合并菜单
                    </el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-row>

            </div>
          </el-card>
          <el-card :size="Size" class="box-card mt10">
            <template #header>
              <div class="card-header">
                <span>列显隐配置</span>
              </div>
            </template>
            <el-table
                :data="option.column"
                :size="Size"
                border
                style="width: 100%"
                :header-cell-style="{'text-align':'center','background':'#F5F7FA'}"
                :cell-style="{'text-align':'center'}"
            >
              <el-table-column prop="label" label="列名">
                <template #default="scope">
                  <span>{{ scope.row.columnSlot ? scope.row.columnSlotname : scope.row.label }}</span>
                </template>
              </el-table-column>
              <el-table-column label="隐藏">
                <template #default="slot">
                  <el-checkbox v-model="slot.row.hide" :size="Size"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="冻结">
                <template #default="slot">
                  <el-checkbox v-model="slot.row.fixed" :size="Size"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="过滤">
                <template #default="slot">
                  <el-checkbox v-model="slot.row.filters" :size="Size"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="排序">
                <template #default="slot">
                  <el-checkbox v-model="slot.row.sortable" :size="Size"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </template>
    </el-drawer>

    <el-dialog
        v-model="rowdialog"
        draggable
        title="详情"
        width="45%"
    >
      <span>This is a message</span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect
} from 'vue';
import {RouteRecordRaw} from 'vue-router';
import {ElMessage, ElMessageBox} from 'element-plus';
import {useStore} from '/@/store/index';

import tableNull from '/@/assets/null.svg';

// import EditMenu from '/@/views/system/menu/component/editMenu.vue';

export default defineComponent({
  name: 'systemTable',
  props: [
    'option',
    'TableData',
    'tableLoading'
  ],
  // components: {EditMenu},
  setup: function (props, context) {
    const {TableData, option} = toRefs(props);
    const store = useStore();
    let formRef = ref();
    const getCurrentInstances = getCurrentInstance(); // 实例
    const showspan = ref(24);
    const rowdialog = ref();
    const addFormRef = ref();
    const editMenuRef = ref();
    const searchSpan = ref(0);
    const actionBar = ref('text');
    const searchIcon = ref(true);
    const FormSearch = ref(false);
    const AllDisabled = ref(false);
    const tableLoading = ref(false);
    const ColumnDrawer = ref(false);
    const showsearchIcon = ref(true);
    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
    const state = reactive({
      Size: 'default',
      Border: true,
      loading: false,
      tableNull: tableNull,
      tableData: TableData,
      searchForm: {},
      total: props.option.Paginations.page.total || 0,
      small: props.option.Paginations.small || false,
      pagerCount: props.option.Paginations.pagerCount || 5,
      pageSizes: props.option.Paginations.pageSizes || [10, 20, 30],
      page: props.option.Paginations.page || {pageNum: 1, pageSize: 10},
    });
    onBeforeMount(() => {
      props.option.column.forEach((item: any, index: number) => {
        if (item.search) {
          if (item.span) {
            searchSpan.value += item.span;
          } else {
            searchSpan.value += 6;
          }
        }
      })
      onLoad(); // 获取列表回调函数
    });
    /*监听props*/
    watch(props, (newProps, oldProps) => {
      searchIcon.value = newProps.option.searchIcon || false;
      tableLoading.value = newProps.tableLoading || false;
      state.total = newProps.option.Paginations.page.total;
      state.small = newProps.option.Paginations.small || false;
      state.pagerCount = newProps.option.Paginations.pagerCount || 5;
      state.pageSizes = newProps.option.Paginations.pageSizes || [10, 20, 30];
      state.page = newProps.option.Paginations.page || {pageNum: 1, pageSize: 10};
    }, {immediate: true});
    const shortcuts = [
      {
        text: 'Last week',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        },
      },
      {
        text: 'Last month',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        },
      },
      {
        text: 'Last 3 months',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        },
      },
    ];
    const rowStyle = ({rowIndex }) => {
      if (rowIndex % 2 === 0) {
        return {
          backgroundColor: "#FDF5E6",
        };
      }
    };
    const filterSelectionNodes = (data: any) => {
      let Array: any = [];
      state.tableData.forEach((item: any) => {
        Array.push({text: item[data.prop], value: item[data.prop]})
      })
      return Array;
    };
    const filterMethods = (value:any, row:any, column:any) => {
      const property = column['property']
      return row[property] === value
    };
    const indexMethod = (index: number) => {
      index = (index + 1) + (state.page.pageNum - 1) * state.page.pageSize
      return index
    };
    const toggleSelection = () => {

    };
    // 行点击事件
    const RowDbclick = (row:any, column:any, event:any) => {
      rowdialog.value = true;
    };
    // 显示/隐藏表单
    const showForm = () => {
      if (formRef.value.$el.style.display == '') {
        formRef.value.$el.style.display = 'none';
      } else if (formRef.value.$el.style.display == 'none') {
        formRef.value.$el.style.display = 'block';
      } else {
        formRef.value.$el.style.display = 'none';
      }
    };
    // form表单数据change事件
    const formChange = () => {
      function isEmpty(obj: any) { // 为空情况
        const empty_arr = ['', undefined, null];
        return (empty_arr.indexOf(obj) > -1 || obj.toString().trim() === '');
      }

      function ArrayFilterParams(arr: any) { // 剔除数组中的空值
        var err: any = [];
        const empty_arr = ['', undefined, null];
        arr.forEach((item: any, index: any) => {
          if (isEmpty(item)) return;
          err.push(
              typeof item === 'object' ? (
                  item instanceof Array ? ArrayFilterParams(item) : filterParams(item)
              ) : item
          );
        })
        return err;
      }

      function filterParams(obj: any) { // 剔除对象的空属性
        var _newObj:object = {};
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) { // 判断对象中是否有这个属性
            if (isEmpty(obj[key])) continue;
            _newObj[key] = typeof obj[key] === 'object' ? (
                obj[key] instanceof Array ? ArrayFilterParams(obj[key]) : filterParams(obj[key])
            ) : obj[key];

          }
        }
        return _newObj;
      }

      state.searchForm = filterParams(state.searchForm);
    };
    // 关闭等待框(防重提交)
    const done = () => {
      FormSearch.value = false;
      AllDisabled.value = false;
    };
    // 查询表单
    const searchChange = () => {
      FormSearch.value = true;
      AllDisabled.value = true;
      tableLoading.value = true;
      let page = state.page;
      let params = state.searchForm;
      context.emit("searchChange", page, params, getCurrentInstances.proxy.done);
    };
    // 清空表单
    const resetChange = () => {
      state.searchForm = {};
    };
    // 展开表单
    const open = () => {
      option.value.column.forEach((item: any, index: number) => {
        item.searchshow = false;
        showspan.value = 24;
      })
      showsearchIcon.value = true;
    };
    // 折叠表单
    const fold = () => {
      let show = 0;
      option.value.column.forEach((item: any, index: number) => {
        if (item.search) {
          if (item.span) {
            show += item.span
          } else {
            show += 6
          }
        }
        if (show > 18) {
          showspan.value = 6;
          const showindex = index;
          if (index > showindex) {
            item.searchshow = false;
          } else {
            item.searchshow = true;
          }
        }
      })
      showsearchIcon.value = false;
    };
    // 获取列表
    const onLoad = () => {
      tableLoading.value = true;
      let page = state.page;
      let params = state.searchForm;
      context.emit("onLoad", page, params);
    };
    // 分页改变
    const onHandleSizeChange = (val: number) => {
      state.page.pageSize = val;
      let params = state.searchForm;
      let page = state.page;
      context.emit("onLoad", page, params);
    };
    // 分页改变
    const onHandleCurrentChange = (val: number) => {
      state.page.pageNum = val;
      let params = state.searchForm;
      let page = state.page;
      context.emit("onLoad", page, params);
    };
    // 打开列显隐Drawer
    const onColumnDrawer = () => {
      ColumnDrawer.value = true;
    };
    // 打开新增菜单弹窗
    const onOpenAddMenu = () => {
      addFormRef.value.openDialog();
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
    return {
      svg,
      formRef,
      showspan,
      shortcuts,
      actionBar,
      rowdialog,
      addFormRef,
      searchIcon,
      searchSpan,
      FormSearch,
      AllDisabled,
      editMenuRef,
      ColumnDrawer,
      tableLoading,
      showsearchIcon,
      getCurrentInstances,
      done,
      open,
      fold,
      onLoad,
      showForm,
      rowStyle,
      RowDbclick,
      formChange,
      indexMethod,
      resetChange,
      searchChange,
      onTabelRowDel,
      onOpenAddMenu,
      onColumnDrawer,
      onOpenEditMenu,
      toggleSelection,
      onHandleSizeChange,
      onHandleCurrentChange,
      filterMethods,
      filterSelectionNodes,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;

  .text {
    width: 24px;
    height: 24px;
    display: block;
    margin: 0 auto;
    line-height: 24px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 3px;
  }

  .current {
    .text {
      background: #626aef;
      color: #fff;
    }
  }
}

.start-date, .end-date {
  .cell {
    .text {
      background: #626aef !important;
      color: #fff !important;
    }
  }
}

.current {
  .cell {
    .text {
      background: #626aef !important;
      color: #fff !important;
      width: 24px;
      height: 24px;
      display: block;
      margin: 0 auto;
      line-height: 24px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 3px;
    }
  }
}

.in-range {
  .cell {
    .text {
      background: rgba(192, 196, 239, .9);
      color: #fff;
      width: 24px;
      height: 24px;
      display: block;
      margin: 0 auto;
      line-height: 24px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 3px;
    }
  }
}

::v-deep(.el-input__prefix) {
  p {
    margin-bottom: 0 !important;
  }
}

::v-deep(.el-range__icon) {
  p {
    margin-bottom: 0 !important;
  }
}

.iconfont {
  margin-right: 0 !important;
}

.el-table {
  border-radius: 5px !important;
  overflow: hidden;
}

.el-col {
  display: flex;
  align-items: center;
}

::v-deep(.el-card__header) {
  padding: 10px 10px !important;
}

.table-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.drawer-box {
  padding: 15px;
}

.actionBar {
  ::v-deep(.el-icon) {
    margin-right: 0 !important;
  }

  .iconfont {
    font-size: 16px;
  }
}
</style>
