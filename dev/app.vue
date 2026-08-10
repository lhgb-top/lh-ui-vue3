<template>
  <lh-config-provider>
    <div class="dev-container">
      <h1>lh-ui-plus 开发预览</h1>
      <p class="dev-desc">
        修改组件源码后自动热更新，随写随见。
      </p>

      <section class="dev-section">
        <h2>Button 按钮组件</h2>

        <h3>基础类型</h3>
        <div class="demo-box">
          <lh-button>默认按钮</lh-button>
          <lh-button type="primary">主要按钮</lh-button>
          <lh-button type="success">成功按钮</lh-button>
          <lh-button type="warning">警告按钮</lh-button>
          <lh-button type="danger">危险按钮</lh-button>
          <lh-button type="info">信息按钮</lh-button>
        </div>

        <h3>Plain 朴素按钮</h3>
        <div class="demo-box">
          <lh-button type="primary" plain>朴素主要</lh-button>
          <lh-button type="success" plain>朴素成功</lh-button>
          <lh-button type="warning" plain>朴素警告</lh-button>
          <lh-button type="danger" plain>朴素危险</lh-button>
        </div>

        <h3>禁用 & Loading</h3>
        <div class="demo-box">
          <lh-button :disabled="true">禁用按钮</lh-button>
          <lh-button type="primary" :loading="true">加载中</lh-button>
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
          <lh-button type="primary" round>圆角主要</lh-button>
          <lh-button type="primary" circle>圆形</lh-button>
          <lh-button href="https://github.com" target="_blank">链接按钮</lh-button>
        </div>

        <h3>Block 块级按钮 & 事件</h3>
        <div class="demo-box" style="flex-direction: column; align-items: stretch;">
          <lh-button type="primary" block>全宽按钮</lh-button>
        </div>
        <div class="demo-box">
          <lh-button type="primary" @click="handleClick">点击按钮</lh-button>
          <span v-if="clickCount" class="click-count">点击次数: {{ clickCount }}</span>
        </div>
      </section>

      <section class="dev-section">
        <h2>Input 输入框组件</h2>

        <h3>基础用法</h3>
        <div class="demo-box-col">
          <lh-input v-model="input1" placeholder="请输入内容"></lh-input>
          <lh-input v-model="input2" placeholder="密码输入" type="password"></lh-input>
          <lh-input v-model="input3" disabled placeholder="禁用输入"></lh-input>
        </div>

        <h3>带前后缀 & 可清空</h3>
        <div class="demo-box-col">
          <lh-input v-model="input4" placeholder="输入用户名">
            <template #prefix>@</template>
          </lh-input>
          <lh-input v-model="input5" placeholder="搜索关键词" clearable>
            <template #suffix>🔍</template>
          </lh-input>
        </div>

        <h3>文本域 & 字数统计</h3>
        <div class="demo-box-col">
          <lh-input v-model="input6" type="textarea" :rows="3" :maxlength="100" show-word-limit placeholder="请输入多行文本"></lh-input>
        </div>
      </section>

      <section class="dev-section">
        <h2>Icon 图标组件</h2>
        <div class="demo-box">
          <lh-icon name="star" size="small" color="#f56c6c"></lh-icon>
          <lh-icon name="search" size="medium" color="#409eff"></lh-icon>
          <lh-icon name="check" size="large" color="#67c23a"></lh-icon>
          <lh-icon size="x-large" color="#e6a23c">⭐</lh-icon>
        </div>
      </section>

      <section class="dev-section">
        <h2>Tooltip 文字提示</h2>
        <div class="demo-box">
          <lh-tooltip content="这是提示内容" placement="top">
            <lh-button>上方的 Tooltip</lh-button>
          </lh-tooltip>
          <lh-tooltip content="底部的提示" placement="bottom">
            <lh-button type="primary">底部的 Tooltip</lh-button>
          </lh-tooltip>
          <lh-tooltip content="Light 主题" placement="right" effect="light">
            <lh-button type="success">Light 主题</lh-button>
          </lh-tooltip>
        </div>
      </section>

      <section class="dev-section">
        <h2>Dialog 对话框</h2>
        <div class="demo-box">
          <lh-button type="primary" @click="dialogVisible = true">打开对话框</lh-button>
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
          <lh-input v-model="input1" placeholder="在对话框中输入内容"></lh-input>
          <template #footer>
            <lh-button @click="dialogVisible = false">取消</lh-button>
            <lh-button type="primary" @click="dialogVisible = false">确定</lh-button>
          </template>
        </lh-dialog>
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
          <lh-config-provider :size="'large'" :theme-vars="{ 'primary-color': '#67c23a' }">
            <lh-button>大尺寸</lh-button>
            <lh-button type="primary" plain>朴素</lh-button>
          </lh-config-provider>
        </div>
      </section>

      <section class="dev-section">
        <h2>国际化 (i18n)</h2>
        <div class="demo-box">
          <lh-button type="primary" @click="switchLang('zh-CN')">切换中文</lh-button>
          <lh-button @click="switchLang('en-US')">Switch to EN</lh-button>
          <span class="demo-desc">当前语言: {{ currentLocale }} | 翻译: {{ localeText }}</span>
        </div>
      </section>
    </div>
  </lh-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { lhlocale, zhCN, enUS } from '../src/index'

const clickCount = ref(0)
const dialogVisible = ref(false)
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')
const input5 = ref('')
const input6 = ref('')

// 国际化
const currentLocale = ref('zh-CN')
const localeText = computed(() => lhlocale.t('input.placeholder'))

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

.click-count {
  color: #666;
  font-size: 14px;
}
</style>
