/**
 * 首页组件总览的唯一数据源（7 组 × 58 项）。
 *
 * 条目与 docs/.vitepress/config.ts 的中英侧边栏逐项对齐——侧边栏调整时
 * 必须同步本文件；反之亦然。横幅「组件」计数由总项数派生，不手写。
 */
export interface LhHomeComponentItem {
  /** 组件英文名（chip 展示） */
  name: string
  /** 中文名 */
  zh: string
  /** 文档路径（不含语言前缀） */
  link: string
}

export interface LhHomeComponentGroup {
  /** 分组中文名 */
  zh: string
  /** 分组英文名 */
  en: string
  items: LhHomeComponentItem[]
}

export const HOME_COMPONENT_GROUPS: LhHomeComponentGroup[] = [
  {
    zh: '基础组件',
    en: 'Basic',
    items: [
      { name: 'Button', zh: '按钮', link: '/components/button' },
      { name: 'Icon', zh: '图标', link: '/components/icon' },
    ],
  },
  {
    zh: '表单组件',
    en: 'Form',
    items: [
      { name: 'Input', zh: '输入框', link: '/components/input' },
      { name: 'InputNumber', zh: '计数器', link: '/components/input-number' },
      { name: 'Select', zh: '选择器', link: '/components/select' },
      { name: 'Checkbox', zh: '复选框', link: '/components/checkbox' },
      { name: 'Radio', zh: '单选框', link: '/components/radio' },
      { name: 'Switch', zh: '开关', link: '/components/switch' },
      { name: 'Slider', zh: '滑块', link: '/components/slider' },
      { name: 'DatePicker', zh: '日期选择器', link: '/components/date-picker' },
      { name: 'TimePicker', zh: '时间选择器', link: '/components/time-picker' },
      { name: 'Cascader', zh: '级联选择器', link: '/components/cascader' },
      { name: 'Form', zh: '表单', link: '/components/form' },
    ],
  },
  {
    zh: '数据展示',
    en: 'Data Display',
    items: [
      { name: 'Tag', zh: '标签', link: '/components/tag' },
      { name: 'Badge', zh: '徽标', link: '/components/badge' },
      { name: 'Avatar', zh: '头像', link: '/components/avatar' },
      { name: 'Progress', zh: '进度条', link: '/components/progress' },
      { name: 'Statistic', zh: '统计数值', link: '/components/statistic' },
      { name: 'Descriptions', zh: '描述列表', link: '/components/descriptions' },
    ],
  },
  {
    zh: '反馈组件',
    en: 'Feedback',
    items: [
      { name: 'Dialog', zh: '对话框', link: '/components/dialog' },
      { name: 'Tooltip', zh: '提示', link: '/components/tooltip' },
      { name: 'Popover', zh: '弹出框', link: '/components/popover' },
      { name: 'Popconfirm', zh: '气泡确认', link: '/components/popconfirm' },
      { name: 'Drawer', zh: '抽屉', link: '/components/drawer' },
      { name: 'Dropdown', zh: '下拉菜单', link: '/components/dropdown' },
      { name: 'Alert', zh: '警告提示', link: '/components/alert' },
      { name: 'Empty', zh: '空状态', link: '/components/empty' },
      { name: 'Skeleton', zh: '骨架屏', link: '/components/skeleton' },
      { name: 'Message', zh: '全局轻提示', link: '/components/message' },
      { name: 'Notification', zh: '通知', link: '/components/notification' },
      { name: 'Loading', zh: '加载', link: '/components/loading' },
      { name: 'Spinner', zh: '旋转图形', link: '/components/spinner' },
      { name: 'Timeline', zh: '时间线', link: '/components/timeline' },
      { name: 'Collapse', zh: '折叠面板', link: '/components/collapse' },
      { name: 'Rate', zh: '评分', link: '/components/rate' },
      { name: 'Segmented', zh: '分段选择器', link: '/components/segmented' },
      { name: 'Calendar', zh: '日历面板', link: '/components/calendar' },
      { name: 'Affix', zh: '固钉', link: '/components/affix' },
      { name: 'BackTop', zh: '返回顶部', link: '/components/backtop' },
      { name: 'Image', zh: '图片', link: '/components/image' },
      { name: 'Menu', zh: '导航菜单', link: '/components/menu' },
      { name: 'Table', zh: '表格', link: '/components/table' },
      { name: 'Layout', zh: '布局容器', link: '/components/layout' },
      { name: 'Grid', zh: '栅格', link: '/components/grid' },
      { name: 'Tree', zh: '树形控件', link: '/components/tree' },
      { name: 'TreeSelect', zh: '树选择', link: '/components/tree-select' },
      { name: 'Transfer', zh: '穿梭框', link: '/components/transfer' },
      { name: 'Upload', zh: '上传', link: '/components/upload' },
      { name: 'Anchor', zh: '锚点', link: '/components/anchor' },
      { name: 'VirtualList', zh: '虚拟列表', link: '/components/virtual-list' },
    ],
  },
  {
    zh: '布局组件',
    en: 'Layout',
    items: [
      { name: 'Divider', zh: '分割线', link: '/components/divider' },
      { name: 'Space', zh: '间距', link: '/components/space' },
      { name: 'Card', zh: '卡片', link: '/components/card' },
    ],
  },
  {
    zh: '导航组件',
    en: 'Navigation',
    items: [
      { name: 'Breadcrumb', zh: '面包屑', link: '/components/breadcrumb' },
      { name: 'Pagination', zh: '分页', link: '/components/pagination' },
      { name: 'Tabs', zh: '标签页', link: '/components/tabs' },
      { name: 'Steps', zh: '步骤条', link: '/components/steps' },
    ],
  },
  {
    zh: '配置组件',
    en: 'Configuration',
    items: [{ name: 'ConfigProvider', zh: '配置', link: '/components/config-provider' }],
  },
]

/** 组件总数（横幅计数由此派生，勿手写） */
export const HOME_COMPONENT_COUNT = HOME_COMPONENT_GROUPS.reduce(
  (sum, group) => sum + group.items.length,
  0,
)
