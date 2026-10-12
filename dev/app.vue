<template>
  <lh-config-provider :theme-vars="themeVars">
    <div class="dev-container">
      <h1>lh-ui-plus 开发预览</h1>
      <p class="dev-desc">修改组件源码后自动热更新，随写随见。</p>

      <section class="dev-section">
        <h2>Button 按钮组件</h2>

        <h3>基础类型</h3>
        <div class="demo-box">
          <lh-button>默认按钮</lh-button>
          <lh-button type="primary">主要按钮</lh-button>
          <lh-button :type="'success'">成功按钮</lh-button>
          <lh-button type="warning">警告按钮</lh-button>
          <lh-button type="danger">危险按钮</lh-button>
          <lh-button type="info">信息按钮</lh-button>
        </div>

        <h3>Plain 朴素按钮</h3>
        <div class="demo-box">
          <lh-button
            type="primary"
            plain
          >
            朴素主要
          </lh-button>
          <lh-button
            type="success"
            plain
          >
            朴素成功
          </lh-button>
          <lh-button
            type="warning"
            plain
          >
            朴素警告
          </lh-button>
          <lh-button
            type="danger"
            plain
          >
            朴素危险
          </lh-button>
        </div>

        <h3>禁用 & Loading</h3>
        <div class="demo-box">
          <lh-button :disabled="true">禁用按钮</lh-button>
          <lh-button
            type="primary"
            :loading="true"
          >
            加载中
          </lh-button>
        </div>

        <h3>尺寸</h3>
        <div class="demo-box">
          <lh-button size="mini">迷你</lh-button>
          <lh-button size="small">小</lh-button>
          <lh-button size="medium">中</lh-button>
          <lh-button size="large">大</lh-button>
        </div>

        <h3>圆角 & 图标链接</h3>
        <div class="demo-box">
          <lh-button round>圆角按钮</lh-button>
          <lh-button
            type="primary"
            round
          >
            圆角主要
          </lh-button>
          <lh-button
            type="primary"
            circle
            icon="search"
          >
            <template #icon>🔍</template>
          </lh-button>
          <lh-button
            href="https://github.com"
            target="_blank"
          >
            链接按钮
          </lh-button>
        </div>

        <h3>Block 块级按钮 & 事件</h3>
        <div
          class="demo-box"
          style="flex-direction: column; align-items: stretch"
        >
          <lh-button
            type="primary"
            block
          >
            全宽按钮
          </lh-button>
        </div>
        <div class="demo-box">
          <lh-button
            type="primary"
            @click="handleClick"
          >
            点击按钮
          </lh-button>
          <span
            v-if="clickCount"
            class="click-count"
          >
            点击次数: {{ clickCount }}
          </span>
        </div>
      </section>

      <section class="dev-section">
        <h2>Input 输入框组件</h2>

        <h3>基础用法</h3>
        <div class="demo-box-col">
          <lh-input
            v-model="input1"
            placeholder="请输入内容"
          ></lh-input>
          <lh-input
            v-model="input2"
            placeholder="密码输入"
            type="password"
          ></lh-input>
          <lh-input
            v-model="input3"
            disabled
            placeholder="禁用输入"
          ></lh-input>
        </div>

        <h3>带前后缀 & 可清空</h3>
        <div class="demo-box-col">
          <lh-input
            v-model="input4"
            placeholder="输入用户名"
            label="用户名"
          >
            <template #prefix>@</template>
          </lh-input>
          <lh-input
            v-model="input5"
            placeholder="搜索关键词"
            clearable
            label="搜索"
          >
            <template #suffix>🔍</template>
          </lh-input>
          <lh-input
            v-model="input5"
            clearable
            label="可清空输入"
          ></lh-input>
        </div>

        <h3>文本域 & 字数统计</h3>
        <div class="demo-box-col">
          <lh-input
            v-model="input6"
            type="textarea"
            :rows="3"
            :maxlength="100"
            show-word-limit
            label="备注"
            placeholder="请输入多行文本"
          ></lh-input>
        </div>

        <h3>禁用效果</h3>
        <div class="demo-box-col">
          <lh-input
            v-model="input3"
            disabled
            placeholder="禁用输入"
            label="禁用"
          ></lh-input>
          <lh-input
            v-model="input3"
            disabled
            placeholder="禁用带后缀"
            clearable
            label="禁用可清空"
          >
            <template #suffix>🔒</template>
          </lh-input>
          <lh-input
            v-model="input6"
            type="textarea"
            disabled
            :rows="3"
            label="禁用文本域"
            placeholder="禁用的文本域"
          ></lh-input>
        </div>
      </section>

      <section class="dev-section">
        <h2>Icon 图标组件</h2>

        <h3>统一组件（name prop）</h3>
        <div class="demo-box">
          <lh-icon
            name="star"
            size="small"
            color="#f56c6c"
          ></lh-icon>
          <lh-icon
            name="search"
            size="medium"
            color="#409eff"
          ></lh-icon>
          <lh-icon
            name="check"
            size="large"
            color="#67c23a"
          ></lh-icon>
          <lh-icon
            size="x-large"
            color="#e6a23c"
          >
            ⭐
          </lh-icon>
        </div>

        <h3>独立组件（分包导入，支持 tree-shaking）</h3>
        <div class="demo-box">
          <LhIconStar
            :size="24"
            color="#f56c6c"
          />
          <LhIconSearch
            :size="24"
            color="#409eff"
          />
          <LhIconCheck
            :size="24"
            color="#67c23a"
          />
          <LhIconLoading
            :size="24"
            color="#909399"
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>Tooltip 文字提示</h2>
        <div class="demo-box">
          <lh-tooltip
            content="这是提示内容"
            placement="top"
          >
            <lh-button>上方的 Tooltip</lh-button>
          </lh-tooltip>
          <lh-tooltip
            content="底部的提示"
            placement="bottom"
          >
            <lh-button type="primary">底部的 Tooltip</lh-button>
          </lh-tooltip>
          <lh-tooltip
            content="Light 主题"
            placement="right"
            effect="light"
          >
            <lh-button type="success">Light 主题</lh-button>
          </lh-tooltip>
        </div>
      </section>

      <section class="dev-section">
        <h2>Popover 弹出框</h2>

        <h3>click 触发（默认）</h3>
        <div class="demo-box">
          <lh-popover
            title="标题"
            content="这是一段弹出内容，点击外部或 Esc 关闭。"
          >
            <lh-button>点击弹出</lh-button>
          </lh-popover>
          <lh-popover
            placement="right"
            title="右侧弹出"
            content="placement 支持十二个方位。"
          >
            <lh-button type="primary">右侧</lh-button>
          </lh-popover>
        </div>

        <h3>hover / focus 触发</h3>
        <div class="demo-box">
          <lh-popover
            trigger="hover"
            title="悬停弹出"
            content="指针移到触发器上即展示。"
          >
            <lh-button type="success">hover</lh-button>
          </lh-popover>
          <lh-popover
            trigger="focus"
            title="聚焦弹出"
            content="键盘或点击聚焦触发器即展示。"
          >
            <lh-button type="warning">focus</lh-button>
          </lh-popover>
        </div>

        <h3>富内容插槽</h3>
        <div class="demo-box">
          <lh-popover
            placement="bottom"
            :width="280"
          >
            <template #content>
              <p style="margin: 0 0 8px">内容区可以放任意元素：</p>
              <lh-input
                v-model="popoverInput"
                placeholder="输入点东西"
              />
            </template>
            <lh-button type="primary">富内容</lh-button>
          </lh-popover>
        </div>
      </section>

      <section class="dev-section">
        <h2>Popconfirm 气泡确认</h2>

        <h3>基础（点击触发）</h3>
        <div class="demo-box">
          <lh-popconfirm
            title="确定删除这条记录吗？"
            @confirm="popconfirmCount++"
          >
            <lh-button type="danger">删除</lh-button>
          </lh-popconfirm>
          <span class="demo-desc">已确认 {{ popconfirmCount }} 次</span>
        </div>

        <h3>三种语气</h3>
        <div class="demo-box">
          <lh-popconfirm
            type="info"
            title="查看该记录的详情？"
            @confirm="popconfirmCount++"
          >
            <lh-button type="info">info</lh-button>
          </lh-popconfirm>
          <lh-popconfirm
            type="warning"
            title="该操作不可撤销，继续吗？"
            @confirm="popconfirmCount++"
          >
            <lh-button type="warning">warning</lh-button>
          </lh-popconfirm>
          <lh-popconfirm
            type="danger"
            title="确认清空全部数据？"
            confirm-text="清空"
            @confirm="popconfirmCount++"
          >
            <lh-button type="danger">danger</lh-button>
          </lh-popconfirm>
        </div>
      </section>

      <section class="dev-section">
        <h2>Drawer 抽屉</h2>

        <h3>四个方向</h3>
        <div class="demo-box">
          <lh-button @click="openDrawer('right')">right</lh-button>
          <lh-button @click="openDrawer('left')">left</lh-button>
          <lh-button @click="openDrawer('top')">top</lh-button>
          <lh-button @click="openDrawer('bottom')">bottom</lh-button>
        </div>

        <h3>自定义尺寸与底部</h3>
        <div class="demo-box">
          <lh-button
            type="primary"
            @click="drawerSized = true"
          >
            480px 宽 + footer
          </lh-button>
        </div>

        <lh-drawer
          v-model="drawerVisible"
          :title="`${drawerDirection} 抽屉`"
          :direction="drawerDirection"
        >
          <p class="demo-desc">当前方向：{{ drawerDirection }}</p>
          <p class="demo-desc">面板尺寸由 size 控制，默认 30% 视口宽/高。</p>
        </lh-drawer>
        <lh-drawer
          v-model="drawerSized"
          title="筛选条件"
          :size="480"
        >
          <div class="demo-box-col">
            <lh-input
              v-model="drawerFilter"
              placeholder="按名称筛选"
            />
          </div>
          <template #footer>
            <lh-button @click="drawerSized = false">取消</lh-button>
            <lh-button
              type="primary"
              @click="drawerSized = false"
            >
              应用
            </lh-button>
          </template>
        </lh-drawer>
      </section>

      <section class="dev-section">
        <h2>Dropdown 下拉菜单</h2>

        <h3>click 触发（默认）+ command</h3>
        <div class="demo-box">
          <lh-dropdown @command="onDropdownCommand">
            <lh-button>{{ dropdownLabel || '更多操作' }} ▾</lh-button>
            <template #dropdown>
              <lh-dropdown-item command="new">新建</lh-dropdown-item>
              <lh-dropdown-item command="edit">编辑</lh-dropdown-item>
              <lh-dropdown-item
                divided
                command="audit"
              >
                审计日志
              </lh-dropdown-item>
              <lh-dropdown-item
                disabled
                command="purge"
              >
                清空数据
              </lh-dropdown-item>
            </template>
          </lh-dropdown>
          <span class="demo-desc">最近指令：{{ dropdownCommand || '—' }}</span>
        </div>

        <h3>hover / contextmenu</h3>
        <div class="demo-box">
          <lh-dropdown trigger="hover">
            <lh-button type="success">悬停展开 ▾</lh-button>
            <template #dropdown>
              <lh-dropdown-item command="h-1">选项一</lh-dropdown-item>
              <lh-dropdown-item command="h-2">选项二</lh-dropdown-item>
            </template>
          </lh-dropdown>
          <lh-dropdown trigger="contextmenu">
            <lh-button type="warning">右键展开 ▾</lh-button>
            <template #dropdown>
              <lh-dropdown-item command="c-1">刷新</lh-dropdown-item>
              <lh-dropdown-item command="c-2">复制</lh-dropdown-item>
            </template>
          </lh-dropdown>
        </div>
      </section>

      <section class="dev-section">
        <h2>Wave F 数据组件</h2>
        <div class="demo-box demo-box-col">
          <lh-table :data="tableRows" :columns="tableCols" :height="200" stripe border />
          <div class="demo-row">
            <lh-tree :data="treeNodes" show-checkbox :default-expanded-keys="['a']" style="flex: 1" />
            <lh-tree-select v-model="treePick" :data="treeNodes" style="flex: 1" />
          </div>
          <lh-transfer v-model="transferSource" :data="transferItems" />
        </div>
      </section>

      <section class="dev-section">
        <h2>Wave F 概览</h2>
        <div class="demo-box demo-box-col">
          <lh-menu v-model="menuActive" style="max-width: 240px">
            <lh-menu-item index="home">首页</lh-menu-item>
            <lh-sub-menu index="settings" title="设置">
              <lh-menu-item index="settings-basic">基本设置</lh-menu-item>
              <lh-menu-item index="settings-security">安全设置</lh-menu-item>
            </lh-sub-menu>
            <lh-menu-item index="docs" disabled>禁用项</lh-menu-item>
          </lh-menu>
        </div>
      </section>

      <section class="dev-section">
        <h2>阶段化增强概览（DEV-F3/F4/F5/F8）</h2>
        <div class="demo-box demo-box-col">
          <div class="demo-desc">Table：多级表头 + 筛选 + 列宽拖拽</div>
          <lh-table :data="enhanceRows" :columns="enhanceCols" resizable border @column-resize="onEnhanceResize" />
          <div class="demo-desc">最近列宽调整：{{ enhanceResizeLog }}</div>
          <div class="demo-desc">Tree：懒加载（点开节点触发 load）</div>
          <lh-tree :data="lazyTreeData" lazy :load="loadLazyNodes" style="max-width: 240px" />
          <div class="demo-desc">Grid：响应式断点（缩放窗口观察）</div>
          <lh-row :gutter="12">
            <lh-col :span="24" :md="12" :xl="8"><div class="demo-box">24 / 12 / 8</div></lh-col>
            <lh-col :span="24" :md="12" :xl="8"><div class="demo-box">24 / 12 / 8</div></lh-col>
          </lh-row>
          <div class="demo-desc">BackTop：scrollend 事件（滚动停止后记录）</div>
          <div class="demo-desc">最近停止位置：{{ scrollEndLog }}</div>
        </div>
      </section>

      <section class="dev-section">
        <h2>Wave E 概览</h2>
        <div class="demo-box demo-box-col">
          <div class="demo-row">
            <lh-segmented v-model="segView" :options="['列表', '卡片', '表格']" />
            <lh-rate v-model="rateVal" allow-half />
          </div>
          <lh-collapse>
            <lh-collapse-item name="t" title="时间线与折叠">
              <lh-timeline>
                <lh-timeline-item timestamp="2026-09-01">规划</lh-timeline-item>
                <lh-timeline-item timestamp="2026-09-25" type="success">交付</lh-timeline-item>
              </lh-timeline>
            </lh-collapse-item>
            <lh-collapse-item name="c" title="日历">见 Calendar 文档页</lh-collapse-item>
          </lh-collapse>
          <div class="demo-row">
            <lh-back-top :right="24" :bottom="24" @scrollend="onBackTopScrollEnd" />
            <lh-affix :offset-top="8">
              <span class="demo-desc">固钉演示（随页面滚动吸顶）</span>
            </lh-affix>
          </div>
        </div>
      </section>

      <section class="dev-section">
        <h2>Message 全局轻提示</h2>
        <div class="demo-box demo-box-col">
          <div class="demo-row">
            <lh-button @click="LhMessage('这是一条消息提示')">默认</lh-button>
            <lh-button
              type="success"
              @click="LhMessage.success('保存成功')"
            >
              成功
            </lh-button>
            <lh-button
              type="warning"
              @click="LhMessage.warning('请注意风险')"
            >
              警告
            </lh-button>
            <lh-button
              type="danger"
              @click="LhMessage.danger('操作失败')"
            >
              危险
            </lh-button>
          </div>
          <div class="demo-row">
            <lh-button @click="showMessageLoading">loading（2 秒后手动关闭）</lh-button>
            <lh-button @click="LhMessage.success('可关闭', { showClose: true })">可关闭</lh-button>
          </div>
        </div>
      </section>

      <section class="dev-section">
        <h2>Notification 通知</h2>
        <div class="demo-box demo-box-col">
          <div class="demo-row">
            <lh-button @click="LhNotification.info({ title: '提示', content: '右上角通知' })">右上</lh-button>
            <lh-button @click="LhNotification.success({ title: '成功', content: '左上角通知', position: 'top-left' })">
              左上
            </lh-button>
            <lh-button
              type="danger"
              @click="LhNotification.danger({ title: '失败', content: '右下角通知', position: 'bottom-right' })"
            >
              右下
            </lh-button>
            <lh-button @click="LhNotification.closeAll()">全部关闭</lh-button>
          </div>
          <lh-button @click="LhNotification.info({ title: '可点击通知', content: '点我', duration: 0, onClick: () => LhMessage.success('已点击') })">
            可点击通知
          </lh-button>
        </div>
      </section>

      <section class="dev-section">
        <h2>Loading 加载</h2>
        <div class="demo-box demo-box-col">
          <div class="demo-row">
            <lh-button @click="showFullscreenLoading">全屏加载（2 秒）</lh-button>
            <lh-button @click="showBoxLoading">容器内加载</lh-button>
          </div>
          <div
            ref="loadingBoxRef"
            class="demo-loading-zone"
          >
            <LhSpinner size="medium" />
            <span class="demo-desc">局部加载目标容器</span>
          </div>
          <div class="demo-row">
            <LhSpinner size="small" />
            <LhSpinner size="medium" />
            <LhSpinner size="large" color="#8f9779" />
          </div>
        </div>
      </section>

      <section class="dev-section">
        <h2>Dialog 对话框</h2>
        <div class="demo-box">
          <lh-button
            type="primary"
            @click="dialogVisible = true"
          >
            打开对话框
          </lh-button>
          <lh-button
            type="success"
            @click="dialogDraggableVisible = true"
          >
            打开可拖拽对话框
          </lh-button>
        </div>
        <lh-dialog
          v-model="dialogVisible"
          title="示例对话框"
          width="500px"
          :close-on-click-modal="false"
        >
          <p>这是对话框的内容区域。</p>
          <p>你可以在这里放置任何内容，如表单、列表等。</p>
          <p>当前值: {{ input1 }}</p>
          <lh-input
            v-model="input1"
            placeholder="在对话框中输入内容"
          ></lh-input>
          <template #footer>
            <lh-button @click="dialogVisible = false">取消</lh-button>
            <lh-button
              type="primary"
              @click="dialogVisible = false"
            >
              确定
            </lh-button>
          </template>
        </lh-dialog>
        <lh-dialog
          v-model="dialogDraggableVisible"
          title="可拖拽对话框（拖拽标题栏移动）"
          width="500px"
          :close-on-click-modal="false"
          draggable
        >
          <p>拖拽标题栏可以移动此对话框。</p>
          <template #footer>
            <lh-button @click="dialogDraggableVisible = false">取消</lh-button>
            <lh-button
              type="primary"
              @click="dialogDraggableVisible = false"
            >
              确定
            </lh-button>
          </template>
        </lh-dialog>
      </section>

      <section class="dev-section">
        <h2>Form / Select / Checkbox 表单组件</h2>
        <div class="demo-box-col">
          <lh-form
            :model="formModel"
            :rules="formRules"
            label-width="80px"
          >
            <lh-form-item
              prop="city"
              label="城市"
              required
            >
              <lh-select
                v-model="formModel.city"
                :options="cityOptions"
                clearable
              />
            </lh-form-item>
            <lh-form-item
              prop="accepted"
              label="协议"
            >
              <lh-checkbox
                v-model="formModel.accepted"
                label="同意服务条款"
              />
            </lh-form-item>
          </lh-form>
          <lh-checkbox-group
            v-model="selectedFrameworks"
            name="framework"
          >
            <lh-checkbox
              value="vue"
              label="Vue"
            />
            <lh-checkbox
              value="react"
              label="React"
            />
            <lh-checkbox
              value="svelte"
              label="Svelte"
            />
          </lh-checkbox-group>
          <span class="demo-desc">已选框架：{{ selectedFrameworks.join(', ') || '无' }}</span>
        </div>
      </section>

      <section class="dev-section">
        <h2>Radio 单选框</h2>

        <h3>独立使用</h3>
        <div class="demo-box">
          <lh-radio
            v-model="radioGender"
            value="male"
            label="男"
          />
          <lh-radio
            v-model="radioGender"
            value="female"
            label="女"
          />
          <span class="demo-desc">当前选择：{{ radioGender }}</span>
        </div>

        <h3>RadioGroup 分组</h3>
        <div class="demo-box">
          <lh-radio-group
            v-model="radioSize"
            name="size"
          >
            <lh-radio
              value="small"
              label="小"
            />
            <lh-radio
              value="medium"
              label="中"
            />
            <lh-radio
              value="large"
              label="大"
            />
          </lh-radio-group>
          <span class="demo-desc">当前选择：{{ radioSize }}</span>
        </div>

        <h3>禁用状态</h3>
        <div class="demo-box">
          <lh-radio-group
            v-model="radioStatus"
            name="status"
          >
            <lh-radio
              value="enabled"
              label="启用"
            />
            <lh-radio
              value="disabled-option"
              label="禁用的选项"
              disabled
            />
            <lh-radio
              value="another"
              label="另一个选项"
            />
          </lh-radio-group>
          <span class="demo-desc">当前选择：{{ radioStatus }}</span>
        </div>

        <h3>尺寸</h3>
        <div class="demo-box">
          <lh-radio-group
            v-model="radioDim"
            name="dim"
            size="small"
          >
            <lh-radio
              value="s1"
              label="小1"
            />
            <lh-radio
              value="s2"
              label="小2"
            />
          </lh-radio-group>
          <lh-radio-group
            v-model="radioDim"
            name="dim2"
            size="large"
          >
            <lh-radio
              value="l1"
              label="大1"
            />
            <lh-radio
              value="l2"
              label="大2"
            />
          </lh-radio-group>
        </div>
      </section>

      <section class="dev-section">
        <h2>Switch 开关</h2>

        <h3>基础用法</h3>
        <div class="demo-box">
          <lh-switch v-model="switchValue" />
          <span class="demo-desc">当前状态：{{ switchValue }}</span>
        </div>

        <h3>文本标签</h3>
        <div class="demo-box">
          <lh-switch
            v-model="switchText"
            active-text="开"
            inactive-text="关"
          />
          <span class="demo-desc">当前状态：{{ switchText }}</span>
        </div>

        <h3>禁用 & Loading</h3>
        <div class="demo-box">
          <lh-switch
            v-model="switchDisabled"
            disabled
          />
          <lh-switch
            v-model="switchLoading"
            loading
          />
        </div>

        <h3>尺寸</h3>
        <div class="demo-box">
          <lh-switch
            v-model="switchSizeSmall"
            size="small"
          />
          <lh-switch
            v-model="switchSizeMedium"
            size="medium"
          />
          <lh-switch
            v-model="switchSizeLarge"
            size="large"
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>InputNumber 输入框</h2>

        <h3>基础用法</h3>
        <div class="demo-box">
          <lh-input-number v-model="inputNumberValue" />
          <span class="demo-desc">当前值：{{ inputNumberValue }}</span>
        </div>

        <h3>范围限制</h3>
        <div class="demo-box">
          <lh-input-number
            v-model="inputNumberRange"
            :min="1"
            :max="10"
          />
          <span class="demo-desc">当前值：{{ inputNumberRange }}</span>
        </div>

        <h3>步长与精度</h3>
        <div class="demo-box">
          <lh-input-number
            v-model="inputNumberStep"
            :step="0.1"
            :precision="1"
          />
          <span class="demo-desc">当前值：{{ inputNumberStep }}</span>
        </div>

        <h3>尺寸</h3>
        <div class="demo-box">
          <lh-input-number
            v-model="inputNumberSize"
            size="small"
          />
          <lh-input-number
            v-model="inputNumberSize"
            size="medium"
          />
          <lh-input-number
            v-model="inputNumberSize"
            size="large"
          />
        </div>

        <h3>禁用</h3>
        <div class="demo-box">
          <lh-input-number
            v-model="inputNumberDisabled"
            disabled
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>ConfigProvider 配置提供者</h2>
        <p class="demo-desc">通过 provide/inject 为子组件提供全局配置。</p>

        <h3>全局尺寸</h3>
        <div class="demo-box">
          <lh-config-provider :size="'mini'">
            <lh-button>迷你尺寸</lh-button>
            <lh-button type="primary">迷你主要</lh-button>
          </lh-config-provider>
        </div>

        <h3>自定义主题变量</h3>
        <div class="demo-box">
          <lh-config-provider :theme-vars="{ 'primary-color': '#e6a23c' }">
            <lh-button>默认</lh-button>
            <lh-button type="primary">自定义颜色</lh-button>
          </lh-config-provider>
        </div>

        <h3>组合配置</h3>
        <div class="demo-box">
          <lh-config-provider
            :size="'large'"
            :theme-vars="{ 'primary-color': '#67c23a' }"
          >
            <lh-button>大尺寸</lh-button>
            <lh-button
              type="primary"
              plain
            >
              朴素
            </lh-button>
          </lh-config-provider>
        </div>

        <h3>国风花纹背景（通过 ConfigProvider 自定义）</h3>
        <div class="demo-box">
          <lh-button
            type="primary"
            @click="setPattern('none')"
          >
            无花纹
          </lh-button>
          <lh-button @click="setPattern('willow')">柳叶</lh-button>
          <lh-button @click="setPattern('cloud')">云纹</lh-button>
          <lh-button @click="setPattern('water')">水波</lh-button>
          <lh-button @click="setPattern('snow')">雪花</lh-button>
          <lh-button @click="setPattern('plum')">梅花</lh-button>
          <lh-button @click="setPattern('bamboo')">竹叶</lh-button>
        </div>
        <div
          class="demo-box"
          style="flex-direction: column; align-items: stretch"
        >
          <div
            class="pattern-preview"
            :style="patternPreviewStyle"
          >
            <span class="demo-desc">当前花纹: {{ currentPattern }}</span>
          </div>
        </div>

        <h3>国风色彩主题</h3>
        <div class="demo-box">
          <lh-button
            type="primary"
            @click="setTheme('default')"
          >
            默认
          </lh-button>
          <lh-button
            :style="{ '--lh-primary-color': '#B8860B' }"
            @click="setTheme('gold')"
          >
            金色华贵
          </lh-button>
          <lh-button
            :style="{ '--lh-primary-color': '#5B8C5A' }"
            @click="setTheme('jade')"
          >
            玉色清雅
          </lh-button>
          <lh-button
            :style="{ '--lh-primary-color': '#C43A31' }"
            @click="setTheme('vermilion')"
          >
            朱砂古韵
          </lh-button>
          <lh-button
            :style="{ '--lh-primary-color': '#2C3E6B' }"
            @click="setTheme('indigo')"
          >
            靛青深邃
          </lh-button>
        </div>
        <div class="demo-box">
          <lh-button type="primary">主题色按钮</lh-button>
          <lh-button type="success">成功</lh-button>
          <lh-button type="warning">警告</lh-button>
          <lh-button type="danger">危险</lh-button>
        </div>

        <h3>花纹 & 按钮融合效果</h3>
        <p class="demo-desc">
          选中上方花纹后，按钮自动应用花纹背景（soft-light 混合模式），花纹与背景色自然融合。
        </p>
        <div class="demo-box">
          <lh-button type="primary">主要按钮</lh-button>
          <lh-button type="success">成功</lh-button>
          <lh-button type="warning">警告</lh-button>
          <lh-button type="danger">危险</lh-button>
          <lh-button type="info">信息</lh-button>
          <lh-button plain>朴素按钮</lh-button>
        </div>
        <div class="demo-box">
          <lh-button
            type="primary"
            plain
          >
            朴素主要
          </lh-button>
          <lh-button
            type="success"
            plain
          >
            朴素成功
          </lh-button>
          <lh-button round>圆角按钮</lh-button>
          <lh-button
            type="primary"
            round
          >
            圆角主要
          </lh-button>
        </div>
      </section>

      <section class="dev-section">
        <h2>Slider 滑块</h2>

        <h3>基础用法</h3>
        <div class="demo-box">
          <lh-slider v-model="sliderValue" />
          <span class="demo-desc">当前值：{{ sliderValue }}</span>
        </div>

        <h3>范围选择</h3>
        <div class="demo-box">
          <lh-slider
            v-model="sliderRange"
            range
          />
          <span class="demo-desc">当前范围：{{ sliderRange }}</span>
        </div>

        <h3>步进</h3>
        <div class="demo-box">
          <lh-slider
            v-model="sliderStep"
            :step="10"
          />
          <span class="demo-desc">当前值：{{ sliderStep }}</span>
        </div>
      </section>

      <section class="dev-section">
        <h2>DatePicker 日期选择器</h2>

        <h3>基础用法</h3>
        <div class="demo-box">
          <lh-date-picker v-model="pickerDate" />
          <span class="demo-desc">当前值：{{ pickerDate }}</span>
        </div>

        <h3>尺寸</h3>
        <div class="demo-box">
          <lh-date-picker
            v-model="pickerDateSmall"
            size="small"
          />
          <lh-date-picker
            v-model="pickerDateMedium"
            size="medium"
          />
          <lh-date-picker
            v-model="pickerDateLarge"
            size="large"
          />
        </div>

        <h3>禁用状态</h3>
        <div class="demo-box">
          <lh-date-picker
            v-model="pickerDateDisabled"
            disabled
          />
        </div>

        <h3>日期格式化</h3>
        <div class="demo-box">
          <lh-date-picker
            v-model="pickerDateFormat1"
            format="yyyy/MM/dd"
          />
          <lh-date-picker
            v-model="pickerDateFormat2"
            format="MM/dd/yyyy"
          />
        </div>

        <h3>清除按钮</h3>
        <div class="demo-box">
          <lh-date-picker
            v-model="pickerDateClearable"
            clearable
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>TimePicker 时间选择器</h2>

        <h3>基础用法</h3>
        <div class="demo-box">
          <lh-time-picker v-model="timeValue" />
          <span class="demo-desc">当前值: {{ timeValue }}</span>
        </div>

        <h3>时间格式化</h3>
        <div class="demo-box">
          <lh-time-picker
            v-model="timeFormat1"
            format="HH:mm"
          />
          <lh-time-picker
            v-model="timeFormat2"
            format="HH:mm:ss"
          />
        </div>

        <h3>步进</h3>
        <div class="demo-box">
          <lh-time-picker
            v-model="timeStep"
            :step-minute="5"
            :step-second="10"
          />
        </div>

        <h3>禁用状态</h3>
        <div class="demo-box">
          <lh-time-picker
            v-model="timeDisabled"
            disabled
          />
        </div>

        <h3>清除按钮</h3>
        <div class="demo-box">
          <lh-time-picker
            v-model="timeClearable"
            clearable
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>Cascader 级联选择器</h2>

        <h3>基础用法</h3>
        <div class="demo-box">
          <lh-cascader
            v-model="cascaderValue"
            :options="cascaderOptions"
          />
          <span class="demo-desc">当前值: {{ cascaderValue }}</span>
        </div>

        <h3>多选模式</h3>
        <div class="demo-box">
          <lh-cascader
            v-model="cascaderMulti"
            :options="cascaderOptions"
            multiple
          />
          <span class="demo-desc">当前值: {{ cascaderMulti }}</span>
        </div>
      </section>

      <section class="dev-section">
        <h2>Tag 标签</h2>

        <h3>基础用法</h3>
        <div class="demo-box">
          <lh-tag>标签一</lh-tag>
          <lh-tag>标签二</lh-tag>
          <lh-tag>标签三</lh-tag>
        </div>

        <h3>类型</h3>
        <div class="demo-box">
          <lh-tag type="primary">主要标签</lh-tag>
          <lh-tag type="success">成功标签</lh-tag>
          <lh-tag type="warning">警告标签</lh-tag>
          <lh-tag type="danger">危险标签</lh-tag>
          <lh-tag type="info">信息标签</lh-tag>
        </div>

        <h3>尺寸</h3>
        <div class="demo-box">
          <lh-tag size="small">小标签</lh-tag>
          <lh-tag size="medium">中标签</lh-tag>
          <lh-tag size="large">大标签</lh-tag>
        </div>

        <h3>可关闭</h3>
        <div class="demo-box">
          <lh-tag v-if="tagShow1" closable @close="tagShow1 = false">标签一</lh-tag>
          <lh-tag v-if="tagShow2" type="primary" closable @close="tagShow2 = false">标签二</lh-tag>
        </div>

        <h3>圆角与标记</h3>
        <div class="demo-box">
          <lh-tag round>圆角标签</lh-tag>
          <lh-tag hit>标记标签</lh-tag>
          <lh-tag round hit>圆角标记</lh-tag>
        </div>
      </section>

      <section class="dev-section">
        <h2>Badge 徽标</h2>

        <h3>基础用法</h3>
        <div class="demo-box">
          <lh-badge :value="5">
            <lh-button>消息</lh-button>
          </lh-badge>
          <lh-badge :value="12">
            <lh-button>待办</lh-button>
          </lh-badge>
        </div>

        <h3>最大值封顶</h3>
        <div class="demo-box">
          <lh-badge :value="200" :max="99">
            <lh-button>未读消息</lh-button>
          </lh-badge>
          <lh-badge :value="100" :max="9">
            <lh-button>超限提醒</lh-button>
          </lh-badge>
        </div>

        <h3>红点</h3>
        <div class="demo-box">
          <lh-badge is-dot>
            <lh-button>新动态</lh-button>
          </lh-badge>
          <lh-badge is-dot type="success">
            <lh-button>在线</lh-button>
          </lh-badge>
        </div>

        <h3>类型</h3>
        <div class="demo-box">
          <lh-badge :value="1" type="primary">
            <lh-button>主要</lh-button>
          </lh-badge>
          <lh-badge :value="1" type="success">
            <lh-button>成功</lh-button>
          </lh-badge>
          <lh-badge :value="1" type="warning">
            <lh-button>警告</lh-button>
          </lh-badge>
          <lh-badge :value="1" type="info">
            <lh-button>信息</lh-button>
          </lh-badge>
        </div>

        <h3>尺寸与自定义内容</h3>
        <div class="demo-box">
          <lh-badge :value="8" size="small">
            <lh-button size="small">小徽标</lh-button>
          </lh-badge>
          <lh-badge :value="8" size="large">
            <lh-button size="large">大徽标</lh-button>
          </lh-badge>
          <lh-badge content="新">
            <lh-button>自定义文案</lh-button>
          </lh-badge>
        </div>

        <h3>显示与隐藏</h3>
        <div class="demo-box">
          <lh-badge :value="0" show-zero>
            <lh-button>显示零值</lh-button>
          </lh-badge>
          <lh-badge :value="0">
            <lh-button>默认隐藏零值</lh-button>
          </lh-badge>
          <lh-badge :value="5" hidden>
            <lh-button>强制隐藏</lh-button>
          </lh-badge>
        </div>
      </section>

      <section class="dev-section">
        <h2>Avatar 头像</h2>

        <h3>文字与图标</h3>
        <div class="demo-box">
          <lh-avatar text="水墨" />
          <lh-avatar icon="user" />
          <lh-avatar text="Alice Chen" />
        </div>

        <h3>形状与尺寸</h3>
        <div class="demo-box">
          <lh-avatar shape="square" size="small" text="小" />
          <lh-avatar shape="square" size="medium" text="中" />
          <lh-avatar shape="square" size="large" text="大" />
          <lh-avatar size="large" text="圆" />
        </div>

        <h3>图片头像</h3>
        <div class="demo-box">
          <lh-avatar
            src="https://api.dicebear.com/9.x/notionists/svg?seed=mo"
            size="large"
          />
          <lh-avatar
            src="/broken-avatar.png"
            text="备"
            size="large"
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>Progress 进度条</h2>

        <h3>线形</h3>
        <div class="demo-box" style="flex-direction: column; align-items: stretch; gap: 12px">
          <lh-progress :percentage="60" />
          <lh-progress :percentage="100" />
          <lh-progress
            :percentage="80"
            status="warning"
          />
          <lh-progress
            :percentage="40"
            status="exception"
          />
        </div>

        <h3>自定义颜色与文字</h3>
        <div class="demo-box" style="flex-direction: column; align-items: stretch; gap: 12px">
          <lh-progress
            :percentage="55"
            color="#B8860B"
          />
          <lh-progress
            :percentage="70"
            :format="(p: number) => `${p} 分`"
          />
        </div>

        <h3>圆形</h3>
        <div class="demo-box">
          <lh-progress
            type="circle"
            :percentage="75"
          />
          <lh-progress
            type="circle"
            :percentage="100"
            :width="100"
            :stroke-width="8"
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>Statistic 统计数值</h2>

        <h3>基础</h3>
        <div class="demo-box">
          <lh-statistic
            title="年访问量"
            :value="2384712"
          />
          <lh-statistic
            title="评分"
            :value="4.8471"
            :precision="2"
          />
        </div>

        <h3>前后缀</h3>
        <div class="demo-box">
          <lh-statistic
            title="成交额"
            :value="128600"
            prefix="¥"
            suffix="元"
          />
          <lh-statistic
            title="编号"
            :value="8899001"
            separator=""
          />
          <lh-statistic
            title="星辰"
            value="不可计数"
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>Descriptions 描述列表</h2>

        <h3>基础（column=2）</h3>
        <div class="demo-box" style="display: block">
          <lh-descriptions
            title="藏品档案"
            :column="2"
            :items="[
              { label: '名称', value: '青花缠枝莲纹瓶' },
              { label: '年代', value: '明永乐' },
              { label: '类别', value: '瓷器' },
              { label: '级别', value: '一级文物' },
            ]"
          />
        </div>

        <h3>跨列（column=3 + span）</h3>
        <div class="demo-box" style="display: block">
          <lh-descriptions
            :column="3"
            :items="[
              { label: '名称', value: '千里江山图', span: 2 },
              { label: '年代', value: '北宋' },
              { label: '作者', value: '王希孟' },
              { label: '材质', value: '绢本设色' },
              { label: '藏地', value: '北京故宫博物院' },
            ]"
          />
        </div>

        <h3>边框模式</h3>
        <div class="demo-box" style="display: block">
          <lh-descriptions
            :column="2"
            border
            :items="[
              { label: '名称', value: '兰亭序' },
              { label: '作者', value: '王羲之' },
              { label: '年代', value: '东晋' },
              { label: '书体', value: '行书' },
            ]"
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>Divider 分割线</h2>

        <h3>水平与虚线</h3>
        <div class="demo-box-col">
          <span class="demo-desc">上文</span>
          <lh-divider />
          <span class="demo-desc">下文</span>
          <lh-divider dashed />
          <span class="demo-desc">虚线分割</span>
        </div>

        <h3>带文案</h3>
        <div class="demo-box-col">
          <lh-divider>居中文案</lh-divider>
          <lh-divider label-position="left">左对齐文案</lh-divider>
          <lh-divider label-position="right">右对齐文案</lh-divider>
        </div>

        <h3>垂直方向</h3>
        <div class="demo-box">
          <span class="demo-desc">文本 A</span>
          <lh-divider direction="vertical" />
          <span class="demo-desc">文本 B</span>
          <lh-divider direction="vertical" />
          <span class="demo-desc">文本 C</span>
        </div>
      </section>

      <section class="dev-section">
        <h2>Space 间距</h2>

        <h3>基础与尺寸</h3>
        <div class="demo-box-col">
          <lh-space size="small">
            <lh-button size="small">小间距</lh-button>
            <lh-button size="small">小间距</lh-button>
            <lh-button size="small">小间距</lh-button>
          </lh-space>
          <lh-space size="large">
            <lh-button>大间距</lh-button>
            <lh-button>大间距</lh-button>
            <lh-button>大间距</lh-button>
          </lh-space>
        </div>

        <h3>垂直方向</h3>
        <div class="demo-box">
          <lh-space direction="vertical">
            <span class="demo-desc">第一行</span>
            <span class="demo-desc">第二行</span>
            <span class="demo-desc">第三行</span>
          </lh-space>
        </div>

        <h3>换行</h3>
        <div class="demo-box" style="display: block; max-width: 340px">
          <lh-space wrap>
            <lh-button
              v-for="i in 10"
              :key="i"
              size="small"
            >
              按钮 {{ i }}
            </lh-button>
          </lh-space>
        </div>
      </section>

      <section class="dev-section">
        <h2>Card 卡片</h2>

        <h3>基础</h3>
        <div class="demo-box">
          <lh-card
            title="雨打芭蕉"
            style="width: 100%; max-width: 280px"
          >
            隔窗知夜雨，芭蕉先有声。
          </lh-card>
        </div>

        <h3>封面 / 头部 / 底部</h3>
        <div class="demo-box">
          <lh-card style="width: 100%; max-width: 280px">
            <template #cover>
              <div class="demo-cover">封面区域</div>
            </template>
            <template #header>
              <span class="demo-strong">自定义头部</span>
            </template>
            <template #extra>
              <lh-button size="small">更多</lh-button>
            </template>
            正文内容……
            <template #footer>
              <lh-button
                size="small"
                type="primary"
              >
                收藏
              </lh-button>
            </template>
          </lh-card>
        </div>

        <h3>加载态与可点击</h3>
        <div class="demo-box">
          <lh-card
            title="加载中"
            loading
            style="width: 100%; max-width: 280px"
          />
          <lh-card
            clickable
            title="点击我"
            style="width: 100%; max-width: 280px"
            @click="cardClickCount++"
          >
            整卡可点击，已点击 {{ cardClickCount }} 次。
          </lh-card>
        </div>
      </section>

      <section class="dev-section">
        <h2>Empty 空状态</h2>

        <h3>基础</h3>
        <div class="demo-box" style="display: block">
          <lh-empty />
        </div>

        <h3>自定义描述与操作</h3>
        <div class="demo-box" style="display: block">
          <lh-empty description="藏品库暂无内容">
            <template #actions>
              <lh-button
                type="primary"
                size="small"
              >
                去添加
              </lh-button>
            </template>
          </lh-empty>
        </div>
      </section>

      <section class="dev-section">
        <h2>Skeleton 骨架屏</h2>

        <h3>加载切换</h3>
        <div class="demo-box-col">
          <lh-skeleton
            :rows="3"
            :loading="skeletonLoading"
            style="max-width: 420px"
          >
            <p class="demo-desc">内容加载完成：众鸟高飞尽，孤云独去闲。</p>
          </lh-skeleton>
          <lh-button
            size="small"
            @click="skeletonLoading = !skeletonLoading"
          >
            {{ skeletonLoading ? '显示内容' : '显示骨架' }}
          </lh-button>
        </div>

        <h3>头像组合 / 关闭动画</h3>
        <div class="demo-box">
          <lh-skeleton
            avatar
            :rows="2"
            style="max-width: 300px"
          />
          <lh-skeleton
            :rows="3"
            :animated="false"
            style="max-width: 300px"
          />
        </div>

        <h3>独立占位块</h3>
        <div class="demo-box">
          <lh-skeleton-item variant="circle" />
          <lh-skeleton-item
            variant="rect"
            style="width: 120px; height: 60px"
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>Alert 警告提示</h2>

        <h3>四种类型</h3>
        <div class="demo-box-col">
          <lh-alert
            title="信息提示"
            type="info"
            show-icon
          />
          <lh-alert
            title="成功提示"
            type="success"
            show-icon
          />
          <lh-alert
            title="警告提示"
            type="warning"
            show-icon
          />
          <lh-alert
            title="错误提示"
            type="danger"
            show-icon
          />
        </div>

        <h3>带描述与关闭</h3>
        <div class="demo-box-col">
          <lh-alert
            title="可关闭的提示"
            type="info"
            closable
            @close="alertClosed = true"
          >
            这是详细描述文案，关闭后会触发 close 事件。
          </lh-alert>
          <lh-alert
            v-if="alertClosed"
            title="已触发 close 事件"
            type="success"
            show-icon
          />
        </div>

        <h3>朴素样式</h3>
        <div class="demo-box-col">
          <lh-alert
            title="浅色朴素样式"
            type="warning"
            plain
            show-icon
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>Breadcrumb 面包屑</h2>

        <h3>基础</h3>
        <div class="demo-box">
          <lh-breadcrumb>
            <lh-breadcrumb-item>首页</lh-breadcrumb-item>
            <lh-breadcrumb-item>组件</lh-breadcrumb-item>
            <lh-breadcrumb-item>Breadcrumb</lh-breadcrumb-item>
          </lh-breadcrumb>
        </div>

        <h3>链接与自定义分隔符</h3>
        <div class="demo-box-col">
          <lh-breadcrumb separator="·">
            <lh-breadcrumb-item to="/">首页</lh-breadcrumb-item>
            <lh-breadcrumb-item to="/components">组件</lh-breadcrumb-item>
            <lh-breadcrumb-item>当前页</lh-breadcrumb-item>
          </lh-breadcrumb>
          <lh-breadcrumb separator="➜">
            <lh-breadcrumb-item>首页</lh-breadcrumb-item>
            <lh-breadcrumb-item>组件</lh-breadcrumb-item>
            <lh-breadcrumb-item>当前页</lh-breadcrumb-item>
          </lh-breadcrumb>
        </div>

        <h3>超出折叠</h3>
        <div class="demo-box">
          <lh-breadcrumb :max-items="3">
            <lh-breadcrumb-item to="/">首页</lh-breadcrumb-item>
            <lh-breadcrumb-item to="/a">一级目录 A</lh-breadcrumb-item>
            <lh-breadcrumb-item to="/a/b">二级目录 B</lh-breadcrumb-item>
            <lh-breadcrumb-item to="/a/b/c">三级目录 C</lh-breadcrumb-item>
            <lh-breadcrumb-item>当前页</lh-breadcrumb-item>
          </lh-breadcrumb>
        </div>
      </section>

      <section class="dev-section">
        <h2>Pagination 分页</h2>

        <h3>基础</h3>
        <div class="demo-box">
          <lh-pagination
            v-model:current="pageCurrent"
            :total="50"
          />
          <span class="demo-desc">当前页：{{ pageCurrent }}</span>
        </div>

        <h3>总数 / 条数 / 跳转</h3>
        <div class="demo-box-col">
          <lh-pagination
            :total="120"
            show-total
            show-size-changer
            show-jumper
          />
          <lh-pagination
            :total="120"
            disabled
          />
        </div>

        <h3>简约模式</h3>
        <div class="demo-box">
          <lh-pagination
            :total="50"
            simple
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>Tabs 标签页</h2>

        <h3>基础</h3>
        <div class="demo-box" style="display: block">
          <lh-tabs v-model="tabActive">
            <lh-tab-pane
              name="ink"
              label="水墨"
            >
              <span class="demo-desc">水墨内容</span>
            </lh-tab-pane>
            <lh-tab-pane
              name="blue"
              label="青花"
            >
              <span class="demo-desc">青花内容</span>
            </lh-tab-pane>
            <lh-tab-pane
              name="red"
              label="朱砂"
              disabled
            >
              <span class="demo-desc">朱砂内容（禁用）</span>
            </lh-tab-pane>
          </lh-tabs>
        </div>

        <h3>卡片样式</h3>
        <div class="demo-box" style="display: block">
          <lh-tabs
            v-model="tabActive"
            type="card"
          >
            <lh-tab-pane
              name="ink"
              label="水墨"
            >
              <span class="demo-desc">卡片样式的水墨内容</span>
            </lh-tab-pane>
            <lh-tab-pane
              name="blue"
              label="青花"
            >
              <span class="demo-desc">卡片样式的青花内容</span>
            </lh-tab-pane>
          </lh-tabs>
        </div>

        <h3>动态增删</h3>
        <div class="demo-box" style="display: block">
          <lh-tabs
            v-model="dynamicTab"
            type="card"
            closable
            addable
            @tab-add="addDynamicTab"
            @tab-remove="removeDynamicTab"
          >
            <lh-tab-pane
              v-for="tab in dynamicTabs"
              :key="tab.name"
              :name="tab.name"
              :label="tab.label"
            >
              <span class="demo-desc">{{ tab.label }} 的内容</span>
            </lh-tab-pane>
          </lh-tabs>
        </div>
      </section>

      <section class="dev-section">
        <h2>Steps 步骤条</h2>

        <h3>基础</h3>
        <div class="demo-box" style="display: block">
          <lh-steps :current="stepCurrent">
            <lh-step
              title="研墨"
              description="研磨墨锭"
            />
            <lh-step
              title="落笔"
              description="中锋行笔"
            />
            <lh-step
              title="钤印"
              description="盖印章"
            />
          </lh-steps>
        </div>

        <h3>可点击导航</h3>
        <div class="demo-box-col">
          <lh-steps
            v-model:current="stepClick"
            clickable
          >
            <lh-step
              title="选稿"
              description="挑选底本"
            />
            <lh-step
              title="临摹"
              description="对临或背临"
            />
            <lh-step
              title="装裱"
              description="上墙装裱"
            />
          </lh-steps>
          <span class="demo-desc">当前步骤：{{ stepClick }}</span>
        </div>

        <h3>错误状态 / 垂直方向</h3>
        <div class="demo-box-col">
          <lh-steps
            :current="1"
            status="error"
          >
            <lh-step title="上传" />
            <lh-step title="校验" />
            <lh-step title="完成" />
          </lh-steps>
          <lh-steps
            :current="1"
            direction="vertical"
          >
            <lh-step
              title="起"
              description="起势藏锋"
            />
            <lh-step
              title="行"
              description="行笔中锋"
            />
            <lh-step
              title="收"
              description="收笔回锋"
            />
          </lh-steps>
        </div>
      </section>

      <section class="dev-section">
        <h2>Calendar 日历面板</h2>

        <h3>基础面板形态</h3>
        <div class="demo-box-col">
          <lh-calendar v-model="calendarDate" />
          <span class="demo-desc">当前选择：{{ calendarDateText }}</span>
        </div>

        <h3>input 形态 + 多面板</h3>
        <div class="demo-box-col">
          <lh-calendar
            v-model="calendarInputDate"
            mode="input"
            :panels="2"
            placeholder="请选择日期"
          />
          <lh-calendar
            v-model="calendarInputDate2"
            mode="input"
            :close-on-select="false"
            placeholder="选中后不自动收起"
          />
        </div>

        <h3>选择模式 selection</h3>
        <div class="demo-box-col">
          <lh-calendar
            v-model="calendarRange"
            selection="range"
            :range="calendarBoundary"
          />
          <span class="demo-desc">区间选择（受 range 约束）：{{ calendarRangeText }}</span>
          <lh-calendar
            v-model="calendarMultiple"
            selection="multiple"
          />
          <span class="demo-desc">多选：{{ calendarMultipleText }}</span>
        </div>
      </section>

      <section class="dev-section">
        <h2>Image 图片</h2>

        <h3>基础用法</h3>
        <div class="demo-box">
          <lh-image
            src="https://api.dicebear.com/9.x/notionists/svg?seed=ink"
            alt="水墨示例图"
          />
          <lh-image
            src="/broken-image.png"
            alt="加载失败的图片"
          />
        </div>

        <h3>fit 裁剪与 preview 预览</h3>
        <div class="demo-box">
          <lh-image
            v-for="fit in imageFits"
            :key="fit"
            :src="`https://api.dicebear.com/9.x/notionists/svg?seed=fit`"
            :alt="`fit=${fit}`"
            :fit="fit"
            preview
            :preview-src-list="imagePreviewList"
          />
        </div>
        <span class="demo-desc">点击开启 preview 的图片可打开预览。</span>

        <h3>lazy 懒加载</h3>
        <div
          class="demo-box-col"
          style="max-height: 160px; overflow-y: auto"
        >
          <lh-image
            v-for="i in 6"
            :key="i"
            :src="`https://api.dicebear.com/9.x/notionists/svg?seed=lazy-${i}`"
            :alt="`懒加载图片 ${i}`"
            lazy
          />
        </div>
      </section>

      <section class="dev-section">
        <h2>国际化 (i18n)</h2>
        <div class="demo-box">
          <lh-button
            type="primary"
            @click="switchLang('zh-CN')"
          >
            切换中文
          </lh-button>
          <lh-button @click="switchLang('en-US')">Switch to EN</lh-button>
          <span class="demo-desc">当前语言: {{ currentLocale }} | 翻译: {{ localeText }}</span>
        </div>
      </section>
    </div>
  </lh-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { lhlocale, zhCN, enUS } from '@lh-ui/vue3'

// 按需导入组件
import LhButton from '~/components/button'
import LhInput from '~/components/input'
import LhIcon from '~/components/icon'
import LhTooltip from '~/components/tooltip'
import LhDialog from '~/components/dialog'
import LhConfigProvider from '~/components/config-provider'
import LhForm, { LhFormItem } from '~/components/form'
import LhSelect from '~/components/select'
import LhCheckbox, { LhCheckboxGroup } from '~/components/checkbox'
import LhRadio, { LhRadioGroup } from '~/components/radio'
import LhSwitch from '~/components/switch'
import LhInputNumber from '~/components/input-number'
import LhSlider from '~/components/slider'
import LhDatePicker from '~/components/date-picker'
import LhTimePicker from '~/components/time-picker'
import LhCascader from '~/components/cascader'
import LhTag from '~/components/tag'
import LhBadge from '~/components/badge'
import LhAvatar from '~/components/avatar'
import LhProgress from '~/components/progress'
import LhStatistic from '~/components/statistic'
import LhDescriptions from '~/components/descriptions'
import LhDivider from '~/components/divider'
import LhSpace from '~/components/space'
import LhCard from '~/components/card'
import LhEmpty from '~/components/empty'
import LhSkeleton, { LhSkeletonItem } from '~/components/skeleton'
import LhAlert from '~/components/alert'
import LhBreadcrumb, { LhBreadcrumbItem } from '~/components/breadcrumb'
import LhPagination from '~/components/pagination'
import LhTabs, { LhTabPane } from '~/components/tabs'
import LhSteps, { LhStep } from '~/components/steps'
import LhPopover from '~/components/popover'
import LhPopconfirm from '~/components/popconfirm'
import LhDrawer from '~/components/drawer'
import LhDropdown, { LhDropdownItem } from '~/components/dropdown'
import LhSpinner from '~/components/spinner'
import LhTimeline, { LhTimelineItem } from '~/components/timeline'
import LhCollapse, { LhCollapseItem } from '~/components/collapse'
import LhRate from '~/components/rate'
import LhSegmented from '~/components/segmented'
import LhCalendar from '~/components/calendar'
import LhImage from '~/components/image'
import LhAffix from '~/components/affix'
import LhBackTop from '~/components/backtop'
import LhMenu, { LhMenuItem, LhSubMenu } from '~/components/menu'
import LhTable from '~/components/table'
import LhTree from '~/components/tree'
import type { LhTreeNode } from '@lh-ui/share/core/tree'
import { LhRow, LhCol } from '~/components/grid'
import LhTreeSelect from '~/components/tree-select'
import LhTransfer from '~/components/transfer'
import '@lh-ui/share/styles/table'
import '@lh-ui/share/styles/grid'
import '@lh-ui/share/styles/tree'
import '@lh-ui/share/styles/tree-select'
import '@lh-ui/share/styles/transfer'
import '@lh-ui/share/styles/menu'
import '@lh-ui/share/styles/timeline'
import '@lh-ui/share/styles/collapse'
import '@lh-ui/share/styles/rate'
import '@lh-ui/share/styles/segmented'
import '@lh-ui/share/styles/calendar'
import '@lh-ui/share/styles/affix'
import '@lh-ui/share/styles/backtop'
import '@lh-ui/share/styles/image'
import { LhMessage } from '~/components/message'
import { LhNotification } from '~/components/notification'
import { LhLoading, showLhLoading } from '~/components/loading'
import '@lh-ui/share/styles/spinner'
import '@lh-ui/share/styles/message'
import '@lh-ui/share/styles/notification'
import '@lh-ui/share/styles/loading'

function showMessageLoading() {
  const handle = LhMessage.loading('正在同步…')
  setTimeout(() => handle.close(), 2000)
}

function showFullscreenLoading() {
  const handle = LhLoading.show({ lock: true })
  setTimeout(() => handle.close(), 2000)
}


// 独立图标组件（分包导入）
import { LhIconStar, LhIconSearch, LhIconCheck, LhIconLoading } from '~/components/icon'

// 组件样式
import '@lh-ui/share/styles/button'
import '@lh-ui/share/styles/input'
import '@lh-ui/share/styles/icon'
import '@lh-ui/share/styles/tooltip'
import '@lh-ui/share/styles/dialog'
import '@lh-ui/share/styles/form'
import '@lh-ui/share/styles/select'
import '@lh-ui/share/styles/checkbox'
import '@lh-ui/share/styles/radio'
import '@lh-ui/share/styles/switch'
import '@lh-ui/share/styles/input-number'
import '@lh-ui/share/styles/slider'
import '@lh-ui/share/styles/date-picker'
import '@lh-ui/share/styles/time-picker'
import '@lh-ui/share/styles/cascader'
import '@lh-ui/share/styles/tag'
import '@lh-ui/share/styles/badge'
import '@lh-ui/share/styles/avatar'
import '@lh-ui/share/styles/progress'
import '@lh-ui/share/styles/statistic'
import '@lh-ui/share/styles/descriptions'
import '@lh-ui/share/styles/divider'
import '@lh-ui/share/styles/space'
import '@lh-ui/share/styles/card'
import '@lh-ui/share/styles/empty'
import '@lh-ui/share/styles/skeleton'
import '@lh-ui/share/styles/alert'
import '@lh-ui/share/styles/breadcrumb'
import '@lh-ui/share/styles/pagination'
import '@lh-ui/share/styles/tabs'
import '@lh-ui/share/styles/steps'
import '@lh-ui/share/styles/popover'
import '@lh-ui/share/styles/popconfirm'
import '@lh-ui/share/styles/drawer'
import '@lh-ui/share/styles/dropdown'
import '@lh-ui/share/styles/theme/common/var.scss'
import '@lh-ui/share/styles/theme/common/var-dark.scss'
import '@lh-ui/share/styles/theme/common/patterns.scss'

const clickCount = ref(0)
const dialogVisible = ref(false)
const dialogDraggableVisible = ref(false)
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')
const input5 = ref('')
const input6 = ref('')
const formModel = ref({ city: '', accepted: false })
const selectedFrameworks = ref<string[]>(['vue'])
const radioGender = ref('male')
const radioSize = ref('medium')
const radioStatus = ref('enabled')
const radioDim = ref('s1')
const switchValue = ref(false)
const switchText = ref(false)
const switchDisabled = ref(false)
const switchLoading = ref(false)
const switchSizeSmall = ref(false)
const switchSizeMedium = ref(false)
const switchSizeLarge = ref(false)
const inputNumberValue = ref(0)
const inputNumberRange = ref(5)
const inputNumberStep = ref(0)
const inputNumberSize = ref(0)
const inputNumberDisabled = ref(5)
const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen', disabled: true },
]
const formRules = { city: [{ required: true, message: '请选择城市' }] }

// Slider refs
const sliderValue = ref(50)
const sliderRange = ref<[number, number]>([20, 50])
const sliderStep = ref(0)

// DatePicker refs
const pickerDate = ref(new Date(2024, 0, 15))
const pickerDateSmall = ref(new Date())
const pickerDateMedium = ref(new Date())
const pickerDateLarge = ref(new Date())
const pickerDateDisabled = ref(new Date())
const pickerDateFormat1 = ref(new Date())
const pickerDateFormat2 = ref(new Date())
const pickerDateClearable = ref(new Date())

// TimePicker refs
const timeValue = ref(new Date())
const timeFormat1 = ref(new Date())
const timeFormat2 = ref(new Date())
const timeStep = ref(new Date())
const timeDisabled = ref(new Date())
const timeClearable = ref(new Date())

// Tag refs
const tagShow1 = ref(true)
const tagShow2 = ref(true)

// Wave A/B refs
const cardClickCount = ref(0)
const skeletonLoading = ref(true)
const alertClosed = ref(false)
const pageCurrent = ref(1)
const tabActive = ref('ink')
const dynamicTab = ref('ink')
const dynamicTabs = ref([
  { name: 'ink', label: '水墨' },
  { name: 'blue', label: '青花' },
  { name: 'red', label: '朱砂' },
])
const stepCurrent = ref(1)
const stepClick = ref(1)

// Wave C refs
const popoverInput = ref('')
const popconfirmCount = ref(0)
const drawerVisible = ref(false)
const drawerDirection = ref<'right' | 'left' | 'top' | 'bottom'>('right')
const drawerSized = ref(false)
const drawerFilter = ref('')
const dropdownCommand = ref('')
const dropdownLabel = ref('')
const dropdownLabelMap: Record<string, string> = {
  new: '新建',
  edit: '编辑',
  audit: '审计日志',
  purge: '清空数据',
}

function openDrawer(d: 'right' | 'left' | 'top' | 'bottom') {
  drawerDirection.value = d
  drawerVisible.value = true
}

function onDropdownCommand(command: string | number | undefined) {
  dropdownCommand.value = String(command)
  dropdownLabel.value = dropdownLabelMap[String(command)] ?? String(command)
}

const loadingBoxRef = ref<HTMLElement>()
const segView = ref('列表')
const menuActive = ref('home')

// —— 阶段化增强概览 ——
const enhanceCols = [
  { prop: 'name', label: '名称', width: 120, resizable: true, fixed: 'left' as const },
  { label: '归属', children: [
    { prop: 'team', label: '小组' },
    { prop: 'city', label: '城市', width: 100, filters: [
      { text: '杭州', value: '杭州' },
      { text: '苏州', value: '苏州' },
      // 陆离·设计·北京 这一行原本筛不出来：过滤项要覆盖数据里出现的每个城市
      { text: '北京', value: '北京' },
    ] },
  ] },
  { prop: 'age', label: '年龄', sortable: true, width: 90 },
]
const enhanceRows = [
  { id: 1, name: '沈砚', team: '架构', city: '杭州', age: 34 },
  { id: 2, name: '苏晚', team: '前端', city: '苏州', age: 28 },
  { id: 3, name: '陆离', team: '设计', city: '北京', age: 31 },
]
const enhanceResizeLog = ref('（未调整）')
function onEnhanceResize({ prop, width }: { prop: string; width: number }) {
  enhanceResizeLog.value = `${prop} → ${width}px`
}

const lazyTreeData = ref([{ key: 'lazy', label: '点我加载', isLeaf: false }])
function loadLazyNodes(node: LhTreeNode, resolve: (children: LhTreeNode[]) => void) {
  setTimeout(() => {
    resolve([
      { key: 'lazy-1', label: '子节点一', isLeaf: true },
      { key: 'lazy-2', label: '子节点二', isLeaf: true },
    ])
  }, 600)
}

const scrollEndLog = ref('（未滚动）')
function onBackTopScrollEnd(scrollTop: number) {
  scrollEndLog.value = `${scrollTop}px`
}
const tableCols = [
  { prop: 'name', label: '名称', width: 120, fixed: 'left' as const },
  { prop: 'role', label: '职责', sortable: true },
  { prop: 'city', label: '城市', width: 100 },
]
const tableRows = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `成员 ${i + 1}`,
  role: i % 2 === 0 ? '前端' : '后端',
  city: '杭州',
}))
const treeNodes = [
  { key: 'a', label: '前端', children: [{ key: 'a-1', label: 'Vue' }, { key: 'a-2', label: 'React' }] },
  { key: 'b', label: '后端', children: [{ key: 'b-1', label: 'Node' }] },
]
const treePick = ref('a-1')
const transferItems = [
  { key: 'x', label: '甲' },
  { key: 'y', label: '乙' },
  { key: 'z', label: '丙' },
]
const transferSource = ref(['x'])
const rateVal = ref(3.5)

// Calendar 演示
const calendarDate = ref(new Date())
const calendarInputDate = ref(new Date())
const calendarInputDate2 = ref(new Date())
const calendarRange = ref<[Date, Date] | []>([])
// 月份 0 起算：8 即 9 月
const calendarBoundary: [Date, Date] = [new Date(2026, 8, 1), new Date(2026, 8, 28)]
const calendarMultiple = ref<Date[]>([])

const fmtDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const calendarDateText = computed(() =>
  calendarDate.value instanceof Date ? fmtDate(calendarDate.value) : String(calendarDate.value ?? '—'),
)
const calendarRangeText = computed(() => {
  const r = calendarRange.value
  if (!r || r.length !== 2) return '未选择'
  return `${fmtDate(r[0])} ~ ${fmtDate(r[1])}`
})
const calendarMultipleText = computed(() =>
  (calendarMultiple.value ?? []).map(fmtDate).join('、') || '未选择',
)

// Image 演示
const imageFits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
const imagePreviewList = [
  'https://api.dicebear.com/9.x/notionists/svg?seed=ink',
  'https://api.dicebear.com/9.x/notionists/svg?seed=fit',
  'https://api.dicebear.com/9.x/notionists/svg?seed=lazy-1',
]

function showBoxLoading() {
  const handle = showLhLoading({ target: loadingBoxRef.value, text: '拼命加载中' })
  setTimeout(() => handle.close(), 2000)
}

function addDynamicTab() {
  const i = dynamicTabs.value.length + 1
  const name = `tab-${i}`
  dynamicTabs.value.push({ name, label: `页签 ${i}` })
  dynamicTab.value = name
}

function removeDynamicTab(name: string) {
  const idx = dynamicTabs.value.findIndex((tab) => tab.name === name)
  if (idx < 0) return
  dynamicTabs.value.splice(idx, 1)
  if (dynamicTab.value === name) {
    dynamicTab.value = dynamicTabs.value[0]?.name ?? ''
  }
}

// Cascader refs
const cascaderValue = ref<(string | number)[]>([])
const cascaderMulti = ref<(string | number)[]>([])
const cascaderOptions = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'sheji',
        label: '设计指南',
        children: [
          { value: 'yuansze', label: '颜色' },
          { value: 'fuziyuanze', label: '字体' },
        ],
      },
      {
        value: 'shejiguize',
        label: '设计规则',
      },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      { value: 'jiben', label: '基础组件' },
      { value: 'fankui', label: '反馈组件' },
    ],
  },
]

// 花纹主题
const currentPattern = ref('none')
const themeVars = ref<Record<string, string>>({})

const patternPreviewStyle = computed(() => ({
  backgroundImage: `var(--lh-pattern-${currentPattern.value})`,
  backgroundColor: 'var(--lh-bg-color, #FAF6F0)',
  backgroundRepeat: 'repeat',
  backgroundSize: 'auto',
  minHeight: '80px',
  borderRadius: '4px',
  border: '1px solid var(--lh-border-color-light, #E5E0D8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const setPattern = (name: string) => {
  currentPattern.value = name
  if (name === 'none') {
    themeVars.value = { ...themeVars.value, 'bg-pattern': 'none' }
  } else {
    themeVars.value = {
      ...themeVars.value,
      'bg-pattern': `var(--lh-pattern-${name})`,
      'bg-pattern-size': '40px',
    }
  }
}

const setTheme = (name: string) => {
  const themes: Record<string, Record<string, string>> = {
    default: {},
    gold: {
      'primary-color': '#B8860B',
      'primary-color-hover': '#D4A843',
      'primary-color-active': '#9A6F00',
      'primary-color-bg': '#FBF6EA',
      'primary-color-border': '#E8DCC4',
      'success-color': '#7A9E6D',
      'success-color-hover': '#8FB882',
      'success-color-active': '#6A8A5D',
      'success-color-bg': '#F0F5EC',
      'warning-color': '#D4943A',
      'warning-color-hover': '#E0A84A',
      'warning-color-active': '#C08030',
      'warning-color-bg': '#FDF6EA',
      'danger-color': '#C45050',
      'danger-color-hover': '#D46060',
      'danger-color-active': '#B04040',
      'danger-color-bg': '#FDF0F0',
      'info-color': '#9A8A7A',
      'info-color-hover': '#B0A090',
      'info-color-active': '#8A7A6A',
      'info-color-bg': '#F5F0EB',
      'decoration-color': 'rgba(184, 134, 11, 0.15)',
    },
    jade: {
      'primary-color': '#5B8C5A',
      'primary-color-hover': '#7AAE7A',
      'primary-color-active': '#4B7A4A',
      'primary-color-bg': '#EDF5EC',
      'primary-color-border': '#D4E8D4',
      'success-color': '#7AAE7A',
      'success-color-hover': '#8FC48F',
      'success-color-active': '#6A9E6A',
      'success-color-bg': '#F0F8F0',
      'warning-color': '#B5A84A',
      'warning-color-hover': '#C8BA5A',
      'warning-color-active': '#A09840',
      'warning-color-bg': '#F8F8EC',
      'danger-color': '#B25A5A',
      'danger-color-hover': '#C46A6A',
      'danger-color-active': '#A04A4A',
      'danger-color-bg': '#F8F0F0',
      'info-color': '#8A9A8A',
      'info-color-hover': '#A0B0A0',
      'info-color-active': '#7A8A7A',
      'info-color-bg': '#F0F2F0',
      'decoration-color': 'rgba(91, 140, 90, 0.12)',
    },
    vermilion: {
      'primary-color': '#C43A31',
      'primary-color-hover': '#E85D4A',
      'primary-color-active': '#9F2A23',
      'primary-color-bg': '#FDF0EE',
      'primary-color-border': '#F0D8D4',
      'success-color': '#7A8A5A',
      'success-color-hover': '#8FA06A',
      'success-color-active': '#6A7A4A',
      'success-color-bg': '#F0F2EA',
      'warning-color': '#C49A4A',
      'warning-color-hover': '#D4AA5A',
      'warning-color-active': '#B48A3A',
      'warning-color-bg': '#FDF6EA',
      'danger-color': '#A03030',
      'danger-color-hover': '#B84040',
      'danger-color-active': '#8A2828',
      'danger-color-bg': '#F8ECEC',
      'info-color': '#8A7A7A',
      'info-color-hover': '#A09090',
      'info-color-active': '#7A6A6A',
      'info-color-bg': '#F2F0F0',
      'decoration-color': 'rgba(196, 58, 49, 0.12)',
    },
    indigo: {
      'primary-color': '#2C3E6B',
      'primary-color-hover': '#4A6FA5',
      'primary-color-active': '#1E2A4A',
      'primary-color-bg': '#EDF0F5',
      'primary-color-border': '#D4DCE8',
      'success-color': '#5A8A6A',
      'success-color-hover': '#6AA07A',
      'success-color-active': '#4A7A5A',
      'success-color-bg': '#ECF2EE',
      'warning-color': '#B5A05A',
      'warning-color-hover': '#C8B06A',
      'warning-color-active': '#A0904A',
      'warning-color-bg': '#F8F6EC',
      'danger-color': '#A05050',
      'danger-color-hover': '#B46060',
      'danger-color-active': '#8A4040',
      'danger-color-bg': '#F4ECEC',
      'info-color': '#7A8A9A',
      'info-color-hover': '#90A0B0',
      'info-color-active': '#6A7A8A',
      'info-color-bg': '#EEF0F2',
      'decoration-color': 'rgba(44, 62, 107, 0.12)',
    },
  }
  themeVars.value = { ...themeVars.value, ...themes[name] }
}

// 国际化
const currentLocale = ref('zh-CN')
const localeText = computed(() => {
  void lhlocale.version.value
  return lhlocale.t('input.placeholder')
})

const switchLang = (lang: string) => {
  currentLocale.value = lang
  if (lang === 'en-US') {
    lhlocale.use({ locale: 'en-US', messages: enUS })
  } else {
    lhlocale.use({ locale: 'zh-CN', messages: zhCN })
  }
}

function handleClick() {
  clickCount.value++
}
</script>

<style scoped>
.dev-container {
  max-width: 860px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.dev-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

.dev-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.dev-section h2 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
  font-size: 18px;
}

.dev-section h3 {
  margin: 16px 0 12px;
  font-size: 14px;
  color: #666;
}

.demo-box {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.demo-loading-zone {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 120px;
  padding: 16px;
  border: 1px dashed #ccc;
  border-radius: 8px;
}

.demo-box-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
  margin-bottom: 12px;
}

.demo-desc {
  color: #666;
  font-size: 14px;
}

.demo-strong {
  font-weight: 600;
}

.demo-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: linear-gradient(135deg, rgba(44, 82, 130, 0.14), rgba(56, 161, 105, 0.14));
  color: #8a8a8a;
  font-size: 13px;
  letter-spacing: 0.1em;
}

.click-count {
  color: #666;
  font-size: 14px;
}

.pattern-preview {
  transition: background-image 0.5s ease;
}
</style>
