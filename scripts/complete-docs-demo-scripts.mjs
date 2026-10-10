/**
 * 一次性迁移：补全文档示例的 <script>，所有示例区分 API 风格（DOC-APISCRIPT）
 *
 * 新基准约定（取代「纯模板示例单块不算缺陷」的旧约定）：
 * - 所有示例一律成对：```vue composition（<script setup lang="ts">）后紧跟 ```vue options（export default）
 * - 静态示例（模板只含字面量 props/插槽）：两块均配空脚本（循 button.md「不同尺寸」先例）
 * - 含状态示例：组合式脚本用类型化 ref，选项式脚本用 data()/methods
 *
 * 处理规则（扫描 docs/components 与 docs/en/components 的未打标 ```vue 围栏）：
 * - 含 <script setup>  → 打标 ```vue composition（仅改围栏标签，不动内容）
 * - 含 <script> + export default → 打标 ```vue options
 * - 纯模板 → 检测状态引用：
 *     - 静态：替换为空脚本成对块
 *     - 有状态：从 STATE_MAP 取脚本内容；未覆盖则报告并保持原样
 *
 * 用法：
 *   node scripts/complete-docs-demo-scripts.mjs --dry   # 只报告，不写文件
 *   node scripts/complete-docs-demo-scripts.mjs         # 应用迁移
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve, basename } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const isDry = process.argv.includes('--dry')

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

const FENCE_RE = /^(```vue[^\n]*)\n([\s\S]*?)^```$/gm

/**
 * 状态检测：模板是否引用了需要脚本提供的内容。
 * 返回 true 表示有状态（v-model / 事件 / 非字面量绑定 / 插值 / v-for 数据源）。
 */
function isStateful(body) {
  if (/v-model(?::[\w-]+)?=/.test(body)) return true
  if (/\s@[\w-]+=/.test(body)) return true
  if (/\{\{[^}]*[A-Za-z_$]/.test(body)) return true
  // :prop="value" / v-if="flag" / v-show="flag" / v-for="item in items"
  const bindingRe = /(?::[\w-]+|v-if|v-show|v-for)="([^"]*)"/g
  let m
  while ((m = bindingRe.exec(body)) !== null) {
    const v = m[1].trim()
    if (!v) continue
    if (/^[\d.]+$/.test(v)) continue
    if (/^'[^']*'$/.test(v) || /^"[^"]*"$/.test(v)) continue
    if (/^(true|false|null|undefined)$/.test(v)) continue
    if (/^\[[\s\S]*\]$/.test(v) || /^\{[\s\S]*\}$/.test(v)) continue
    // 内联函数表达式（箭头函数/调用）不需要脚本状态
    if (/^[($]/.test(v) || /=>/.test(v)) continue
    // v-for="i in 12" 这类数字范围也是静态
    if (/^[\w$]+\s+in\s+[\d.]+$/.test(v)) continue
    return true
  }
  return false
}

/** 空脚本成对块 */
function staticPair(template) {
  return [
    '```vue composition',
    '<script setup lang="ts">',
    '</script>',
    '',
    template.trim(),
    '```',
    '',
    '```vue options',
    '<script>',
    'export default {}',
    '</script>',
    '',
    template.trim(),
    '```',
  ].join('\n')
}

/** 有状态成对块：comp / opt 为各 script 的内部内容（空 comp/opt 渲染为空脚本） */
function statefulPair(template, comp, opt) {
  const compInner = comp.trim()
  const optInner = opt.trim()
  return [
    '```vue composition',
    compInner ? `<script setup lang="ts">\n${compInner}\n</script>` : '<script setup lang="ts">\n</script>',
    '',
    template.trim(),
    '```',
    '',
    '```vue options',
    optInner ? `<script>\n${optInner}\n</script>` : '<script>\nexport default {}\n</script>',
    '',
    template.trim(),
    '```',
  ].join('\n')
}

// ---------------------------------------------------------------------------
// 手工映射表：键为文件名（不含目录），中英镜像共用；英文目录内容不同时用
// 'en/<文件名>' 键覆盖。值为按出现顺序的状态块脚本内容：
// comp = <script setup lang="ts"> 的内部内容；opt = <script> 的内部内容。
// 状态命名与各页页面级 <script setup>（DemoBlock 实时演示）保持一致。
// ---------------------------------------------------------------------------

// 通用：单个 value ref 的表单类示例
const inputValue = {
  comp: `import { ref } from 'vue'

const value = ref('')`,
  opt: `export default {
  data() {
    return { value: '' }
  },
}`,
}
const numberValue = {
  comp: `import { ref } from 'vue'

const value = ref<number | null>(1)`,
  opt: `export default {
  data() {
    return { value: 1 }
  },
}`,
}
const menuActive2 = {
  comp: `import { ref } from 'vue'

const active2 = ref('settings2-basic')`,
  opt: `export default {
  data() {
    return { active2: 'settings2-basic' }
  },
}`,
}
const menuActive = {
  comp: `import { ref } from 'vue'

const active = ref('home')`,
  opt: `export default {
  data() {
    return { active: 'home' }
  },
}`,
}
const selectValue = {
  comp: `import { ref } from 'vue'

const value = ref('a')
const options = [
  { label: '选项一', value: 'a' },
  { label: '选项二', value: 'b' },
  { label: '选项三', value: 'c' },
]`,
  opt: `export default {
  data() {
    return {
      value: 'a',
      options: [
        { label: '选项一', value: 'a' },
        { label: '选项二', value: 'b' },
        { label: '选项三', value: 'c' },
      ],
    }
  },
}`,
}
const cascaderValue = {
  comp: `import { ref } from 'vue'

const value = ref([])
const options = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      { value: 'sheji', label: '设计指南' },
      { value: 'shejiguize', label: '设计规则' },
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
]`,
  opt: `export default {
  data() {
    return {
      value: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            { value: 'sheji', label: '设计指南' },
            { value: 'shejiguize', label: '设计规则' },
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
      ],
    }
  },
}`,
}
const treeDataEntry = {
  comp: `const treeData = [
  { key: 'a', label: '前端', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: '后端', children: [{ key: 'b-1', label: 'Node' }] },
]`,
  opt: `export default {
  data() {
    return {
      treeData: [
        { key: 'a', label: '前端', children: [
          { key: 'a-1', label: 'Vue' },
          { key: 'a-2', label: 'React' },
        ] },
        { key: 'b', label: '后端', children: [{ key: 'b-1', label: 'Node' }] },
      ],
    }
  },
}`,
}
const ctrlDataEntry = {
  comp: `const ctrlData = [
  { key: 'x', label: '设计', children: [
    { key: 'x-1', label: '色彩' },
    { key: 'x-2', label: '字体' },
  ] },
  { key: 'y', label: '工程' },
]`,
  opt: `export default {
  data() {
    return {
      ctrlData: [
        { key: 'x', label: '设计', children: [
          { key: 'x-1', label: '色彩' },
          { key: 'x-2', label: '字体' },
        ] },
        { key: 'y', label: '工程' },
      ],
    }
  },
}`,
}
const listDataEntry = {
  comp: 'const listData = Array.from({ length: 1000 }, (_, i) => `项目 ${i + 1}`)',
  opt: `export default {
  data() {
    return {
      listData: Array.from({ length: 1000 }, (_, i) => \`项目 \${i + 1}\`),
    }
  },
}`,
}
const tableBigRows = {
  comp: `const cols = [
  { prop: 'name', label: '名称', width: 140 },
  { prop: 'role', label: '职责' },
  { prop: 'city', label: '城市', width: 120 },
]

const bigRows = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: \`行 \${i + 1}\`,
  role: i % 2 === 0 ? '架构' : '前端',
  city: '杭州',
}))`,
  opt: `export default {
  data() {
    return {
      cols: [
        { prop: 'name', label: '名称', width: 140 },
        { prop: 'role', label: '职责' },
        { prop: 'city', label: '城市', width: 120 },
      ],
      bigRows: Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: \`行 \${i + 1}\`,
        role: i % 2 === 0 ? '架构' : '前端',
        city: '杭州',
      })),
    }
  },
}`,
}
const tableSlot = {
  comp: `const rows = [
  { id: 1, name: '沈砚', age: 34, role: '架构', city: '杭州' },
  { id: 2, name: '苏晚', age: 28, role: '前端', city: '苏州' },
  { id: 3, name: '陆离', age: 31, role: '设计', city: '北京' },
]
const slotCols = [
  { prop: 'name', label: '名称', width: 140 },
  { prop: 'role', label: '职责', slot: 'role' },
]`,
  opt: `export default {
  data() {
    return {
      rows: [
        { id: 1, name: '沈砚', age: 34, role: '架构', city: '杭州' },
        { id: 2, name: '苏晚', age: 28, role: '前端', city: '苏州' },
        { id: 3, name: '陆离', age: 31, role: '设计', city: '北京' },
      ],
      slotCols: [
        { prop: 'name', label: '名称', width: 140 },
        { prop: 'role', label: '职责', slot: 'role' },
      ],
    }
  },
}`,
}

const STATE_MAP = {
  'anchor.md': [
    {
      comp: `const anchorItems = [
  { id: 'sec-1', title: '第一节' },
  { id: 'sec-2', title: '第二节', children: [{ id: 'sec-2-1', title: '第二节之一' }] },
]`,
      opt: `export default {
  data() {
    return {
      anchorItems: [
        { id: 'sec-1', title: '第一节' },
        { id: 'sec-2', title: '第二节', children: [{ id: 'sec-2-1', title: '第二节之一' }] },
      ],
    }
  },
}`,
    },
  ],
  'card.md': [
    {
      comp: `function onCardClick() {
  console.log('card clicked')
}`,
      opt: `export default {
  methods: {
    onCardClick() {
      console.log('card clicked')
    },
  },
}`,
    },
  ],
  'cascader.md': [cascaderValue],
  'checkbox.md': [
    {
      comp: `import { ref } from 'vue'

const value = ref(false)
const indeterminate = ref(true)
const group = ref<string[]>([])`,
      opt: `export default {
  data() {
    return { value: false, indeterminate: true, group: [] }
  },
}`,
    },
  ],
  'date-picker.md': [
    {
      comp: `import { ref } from 'vue'

const dpRange = ref<[Date, Date] | null>([new Date(2024, 0, 1), new Date(2024, 0, 15)])`,
      opt: `export default {
  data() {
    return { dpRange: [new Date(2024, 0, 1), new Date(2024, 0, 15)] }
  },
}`,
    },
  ],
  'drawer.md': [
    {
      comp: `import { ref } from 'vue'

const sized = ref(false)`,
      opt: `export default {
  data() {
    return { sized: false }
  },
}`,
    },
    {
      comp: `import { ref } from 'vue'

const visible = ref(false)
const visible2 = ref(false)`,
      opt: `export default {
  data() {
    return { visible: false, visible2: false }
  },
}`,
    },
  ],
  // v-for="i in 12" 数字范围 + 循环变量插值，无需任何状态
  'dropdown.md': [{ comp: '', opt: '' }],
  'image.md': [
    {
      comp: `const imageList = [
  'https://picsum.photos/600/400?random=11',
  'https://picsum.photos/600/400?random=12',
  'https://picsum.photos/600/400?random=13',
]`,
      opt: `export default {
  data() {
    return {
      imageList: [
        'https://picsum.photos/600/400?random=11',
        'https://picsum.photos/600/400?random=12',
        'https://picsum.photos/600/400?random=13',
      ],
    }
  },
}`,
    },
  ],
  'input.md': [inputValue, inputValue, inputValue, inputValue, inputValue],
  'input-number.md': [numberValue, numberValue, numberValue],
  'menu.md': [menuActive2, menuActive, menuActive],
  'radio.md': [
    {
      comp: `import { ref } from 'vue'

const value = ref('1')
const group = ref('a')`,
      opt: `export default {
  data() {
    return { value: '1', group: 'a' }
  },
}`,
    },
  ],
  'select.md': [selectValue, selectValue],
  'switch.md': [
    {
      comp: `import { ref } from 'vue'

const value = ref(false)`,
      opt: `export default {
  data() {
    return { value: false }
  },
}`,
    },
  ],
  'table.md': [tableBigRows, tableSlot],
  'time-picker.md': [
    {
      comp: `import { ref } from 'vue'

const tp3 = ref(new Date())`,
      opt: `export default {
  data() {
    return { tp3: new Date() }
  },
}`,
    },
  ],
  'transfer.md': [
    {
      comp: `import { ref } from 'vue'

const source = ref(['a'])
const items = [
  { key: 'a', label: '甲' },
  { key: 'b', label: '乙' },
  { key: 'c', label: '丙', disabled: true },
]`,
      opt: `export default {
  data() {
    return {
      source: ['a'],
      items: [
        { key: 'a', label: '甲' },
        { key: 'b', label: '乙' },
        { key: 'c', label: '丙', disabled: true },
      ],
    }
  },
}`,
    },
  ],
  'tree.md': [treeDataEntry, treeDataEntry, ctrlDataEntry],
  'virtual-list.md': [listDataEntry, listDataEntry],

  // ----- 英文镜像内容不同的覆盖键 -----
  'en/input.md': [inputValue, inputValue, inputValue, inputValue],
  'en/switch.md': [
    {
      comp: `import { ref } from 'vue'

const value = ref(false)
const value2 = ref(true)`,
      opt: `export default {
  data() {
    return { value: false, value2: true }
  },
}`,
    },
  ],
  'en/table.md': [
    {
      comp: `const sortCols = [
  { prop: 'name', label: 'Name', width: 140, fixed: 'left' },
  { prop: 'age', label: 'Age', width: 100, sortable: true, align: 'center' },
  { prop: 'role', label: 'Role' },
  { prop: 'city', label: 'City', width: 120 },
]
const rows = [
  { id: 1, name: 'Shen Yan', age: 34, role: 'Architect', city: 'Hangzhou' },
  { id: 2, name: 'Su Wan', age: 28, role: 'Frontend', city: 'Suzhou' },
]`,
      opt: `export default {
  data() {
    return {
      sortCols: [
        { prop: 'name', label: 'Name', width: 140, fixed: 'left' },
        { prop: 'age', label: 'Age', width: 100, sortable: true, align: 'center' },
        { prop: 'role', label: 'Role' },
        { prop: 'city', label: 'City', width: 120 },
      ],
      rows: [
        { id: 1, name: 'Shen Yan', age: 34, role: 'Architect', city: 'Hangzhou' },
        { id: 2, name: 'Su Wan', age: 28, role: 'Frontend', city: 'Suzhou' },
      ],
    }
  },
}`,
    },
    {
      comp: `const cols = [
  { prop: 'name', label: 'Name', width: 140 },
  { prop: 'role', label: 'Role' },
  { prop: 'city', label: 'City', width: 120 },
]

const bigRows = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: \`Row \${i + 1}\`,
  role: i % 2 === 0 ? 'Architect' : 'Frontend',
  city: 'Hangzhou',
}))`,
      opt: `export default {
  data() {
    return {
      cols: [
        { prop: 'name', label: 'Name', width: 140 },
        { prop: 'role', label: 'Role' },
        { prop: 'city', label: 'City', width: 120 },
      ],
      bigRows: Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: \`Row \${i + 1}\`,
        role: i % 2 === 0 ? 'Architect' : 'Frontend',
        city: 'Hangzhou',
      })),
    }
  },
}`,
    },
  ],
  'en/tree-select.md': [
    {
      comp: `import { ref } from 'vue'

const treeMulti = ref<string[]>([])
const treeData = [
  { key: 'a', label: 'Frontend', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: 'Backend' },
]`,
      opt: `export default {
  data() {
    return {
      treeMulti: [],
      treeData: [
        { key: 'a', label: 'Frontend', children: [
          { key: 'a-1', label: 'Vue' },
          { key: 'a-2', label: 'React' },
        ] },
        { key: 'b', label: 'Backend' },
      ],
    }
  },
}`,
    },
    {
      comp: `const treeData = [
  { key: 'a', label: 'Frontend', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: 'Backend' },
]`,
      opt: `export default {
  data() {
    return {
      treeData: [
        { key: 'a', label: 'Frontend', children: [
          { key: 'a-1', label: 'Vue' },
          { key: 'a-2', label: 'React' },
        ] },
        { key: 'b', label: 'Backend' },
      ],
    }
  },
}`,
    },
  ],
  'en/cascader.md': [
    {
      comp: `import { ref } from 'vue'

const value = ref([])
const options = [
  {
    value: 'zhinan',
    label: 'Guide',
    children: [
      { value: 'sheji', label: 'Design Guide' },
      { value: 'shejiguize', label: 'Design Rules' },
    ],
  },
  {
    value: 'zujian',
    label: 'Components',
    children: [
      { value: 'jiben', label: 'Basic' },
      { value: 'fankui', label: 'Feedback' },
    ],
  },
]`,
      opt: `export default {
  data() {
    return {
      value: [],
      options: [
        {
          value: 'zhinan',
          label: 'Guide',
          children: [
            { value: 'sheji', label: 'Design Guide' },
            { value: 'shejiguize', label: 'Design Rules' },
          ],
        },
        {
          value: 'zujian',
          label: 'Components',
          children: [
            { value: 'jiben', label: 'Basic' },
            { value: 'fankui', label: 'Feedback' },
          ],
        },
      ],
    }
  },
}`,
    },
  ],
  'en/select.md': [
    {
      comp: `import { ref } from 'vue'

const value = ref('a')
const options = [
  { label: 'Option one', value: 'a' },
  { label: 'Option two', value: 'b' },
  { label: 'Option three', value: 'c' },
]`,
      opt: `export default {
  data() {
    return {
      value: 'a',
      options: [
        { label: 'Option one', value: 'a' },
        { label: 'Option two', value: 'b' },
        { label: 'Option three', value: 'c' },
      ],
    }
  },
}`,
    },
    {
      comp: `import { ref } from 'vue'

const value = ref('beijing')
const options = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Shenzhen', value: 'shenzhen' },
]`,
      opt: `export default {
  data() {
    return {
      value: 'beijing',
      options: [
        { label: 'Beijing', value: 'beijing' },
        { label: 'Shanghai', value: 'shanghai' },
        { label: 'Shenzhen', value: 'shenzhen' },
      ],
    }
  },
}`,
    },
  ],
  'en/transfer.md': [
    {
      comp: `import { ref } from 'vue'

const source = ref(['a'])
const items = [
  { key: 'a', label: 'A' },
  { key: 'b', label: 'B' },
  { key: 'c', label: 'C', disabled: true },
]`,
      opt: `export default {
  data() {
    return {
      source: ['a'],
      items: [
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B' },
        { key: 'c', label: 'C', disabled: true },
      ],
    }
  },
}`,
    },
  ],
  'en/tree.md': [
    {
      comp: `const treeData = [
  { key: 'a', label: 'Frontend', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: 'Backend', children: [{ key: 'b-1', label: 'Node' }] },
]`,
      opt: `export default {
  data() {
    return {
      treeData: [
        { key: 'a', label: 'Frontend', children: [
          { key: 'a-1', label: 'Vue' },
          { key: 'a-2', label: 'React' },
        ] },
        { key: 'b', label: 'Backend', children: [{ key: 'b-1', label: 'Node' }] },
      ],
    }
  },
}`,
    },
    {
      comp: `const treeData = [
  { key: 'a', label: 'Frontend', children: [
    { key: 'a-1', label: 'Vue' },
    { key: 'a-2', label: 'React' },
  ] },
  { key: 'b', label: 'Backend', children: [{ key: 'b-1', label: 'Node' }] },
]`,
      opt: `export default {
  data() {
    return {
      treeData: [
        { key: 'a', label: 'Frontend', children: [
          { key: 'a-1', label: 'Vue' },
          { key: 'a-2', label: 'React' },
        ] },
        { key: 'b', label: 'Backend', children: [{ key: 'b-1', label: 'Node' }] },
      ],
    }
  },
}`,
    },
    {
      comp: `const ctrlData = [
  { key: 'x', label: 'Design', children: [
    { key: 'x-1', label: 'Color' },
    { key: 'x-2', label: 'Type' },
  ] },
  { key: 'y', label: 'Engineering' },
]`,
      opt: `export default {
  data() {
    return {
      ctrlData: [
        { key: 'x', label: 'Design', children: [
          { key: 'x-1', label: 'Color' },
          { key: 'x-2', label: 'Type' },
        ] },
        { key: 'y', label: 'Engineering' },
      ],
    }
  },
}`,
    },
  ],
  'en/virtual-list.md': [
    {
      comp: 'const listData = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)',
      opt: `export default {
  data() {
    return {
      listData: Array.from({ length: 1000 }, (_, i) => \`Item \${i + 1}\`),
    }
  },
}`,
    },
    {
      comp: 'const listData = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)',
      opt: `export default {
  data() {
    return {
      listData: Array.from({ length: 1000 }, (_, i) => \`Item \${i + 1}\`),
    }
  },
}`,
    },
  ],
  'en/anchor.md': [
    {
      comp: `const anchorItems = [
  { id: 'sec-1', title: 'Section 1' },
  { id: 'sec-2', title: 'Section 2', children: [{ id: 'sec-2-1', title: 'Section 2.1' }] },
]`,
      opt: `export default {
  data() {
    return {
      anchorItems: [
        { id: 'sec-1', title: 'Section 1' },
        { id: 'sec-2', title: 'Section 2', children: [{ id: 'sec-2-1', title: 'Section 2.1' }] },
      ],
    }
  },
}`,
    },
  ],
}

const DIRS = [
  { path: join(root, 'docs', 'components'), tag: '' },
  { path: join(root, 'docs', 'en', 'components'), tag: 'en/' },
]

let totalRelabeled = 0
let totalStatic = 0
let totalStateful = 0
const missing = []
const stats = {}

for (const { path: dir, tag } of DIRS) {
  for (const file of walk(dir).filter((f) => f.endsWith('.md'))) {
    const src = readFileSync(file, 'utf8')
    const fences = [...src.matchAll(FENCE_RE)]
    if (fences.length === 0) continue

    const key = tag + basename(file)
    const rel = file.replace(root, '')
    let statefulIdx = 0
    let touched = false
    let out = ''
    let cursor = 0

    for (const fence of fences) {
      const [full, tagRaw, body] = fence
      const start = fence.index
      const tag = tagRaw.trim().replace(/^```/, '').trim()
      out += src.slice(cursor, start)
      cursor = start + full.length

      if (tag === 'vue') {
        if (/<script\s+setup/.test(body)) {
          out += full.replace('```vue', '```vue composition')
          totalRelabeled++
          touched = true
          continue
        }
        if (/<script>[\s\S]*export\s+default/.test(body) || /<script\s+>[\s\S]*export\s+default/.test(body)) {
          out += full.replace('```vue', '```vue options')
          totalRelabeled++
          touched = true
          continue
        }
        if (/<template[\s>]/.test(body)) {
          if (!isStateful(body)) {
            out += staticPair(body)
            totalStatic++
            touched = true
            continue
          }
          const entries = STATE_MAP[key] ?? STATE_MAP[basename(file)] ?? []
          const entry = entries[statefulIdx]
          const template = body
          if (!entry) {
            const firstLine = body.split('\n').find((l) => l.trim()) || ''
            missing.push(`${rel}  #${statefulIdx + 1}  ${firstLine.trim().slice(0, 70)}`)
            out += full
            statefulIdx++
            continue
          }
          out += statefulPair(template, entry.comp, entry.opt)
          totalStateful++
          statefulIdx++
          touched = true
          continue
        }
      }
      out += full
    }
    out += src.slice(cursor)

    if (touched && !isDry) writeFileSync(file, out)
    if (touched) stats[rel] = true
  }
}

const action = isDry ? '（dry，未写入）' : '（已写入）'
console.log(`打标既有 script 块 ${totalRelabeled} 个，静态块转空脚本对 ${totalStatic} 个，状态块转映射对 ${totalStateful} 个 ${action}`)
console.log(`改动文件 ${Object.keys(stats).length} 个`)
if (missing.length > 0) {
  console.log(`\n以下状态块缺映射表内容（保持原样，需人工补 STATE_MAP 后重跑）：`)
  console.log(missing.map((m) => '  ' + m).join('\n'))
}
