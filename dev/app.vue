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
          <lh-button type="primary" circle icon="search">
            <template #icon>🔍</template>
          </lh-button>
          <lh-button href="https://github.com" target="_blank"
            >链接按钮</lh-button
          >
        </div>

        <h3>Block 块级按钮 & 事件</h3>
        <div
          class="demo-box"
          style="flex-direction: column; align-items: stretch"
        >
          <lh-button type="primary" block>全宽按钮</lh-button>
        </div>
        <div class="demo-box">
          <lh-button type="primary" @click="handleClick">点击按钮</lh-button>
          <span v-if="clickCount" class="click-count"
            >点击次数: {{ clickCount }}</span
          >
        </div>
      </section>

      <section class="dev-section">
        <h2>Input 输入框组件</h2>

        <h3>基础用法</h3>
        <div class="demo-box-col">
          <lh-input v-model="input1" placeholder="请输入内容"></lh-input>
          <lh-input
            v-model="input2"
            placeholder="密码输入"
            type="password"
          ></lh-input>
          <lh-input v-model="input3" disabled placeholder="禁用输入"></lh-input>
        </div>

        <h3>带前后缀 & 可清空</h3>
        <div class="demo-box-col">
          <lh-input v-model="input4" placeholder="输入用户名" label="用户名">
            <template #prefix>@</template>
          </lh-input>
          <lh-input v-model="input5" placeholder="搜索关键词" clearable label="搜索">
            <template #suffix>🔍</template>
          </lh-input>
          <lh-input v-model="input5" clearable label="可清空输入"></lh-input>
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
          <lh-input v-model="input3" disabled placeholder="禁用输入" label="禁用"></lh-input>
          <lh-input v-model="input3" disabled placeholder="禁用带后缀" clearable label="禁用可清空">
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
          <lh-icon name="star" size="small" color="#f56c6c"></lh-icon>
          <lh-icon name="search" size="medium" color="#409eff"></lh-icon>
          <lh-icon name="check" size="large" color="#67c23a"></lh-icon>
          <lh-icon size="x-large" color="#e6a23c">⭐</lh-icon>
        </div>

        <h3>独立组件（分包导入，支持 tree-shaking）</h3>
        <div class="demo-box">
          <LhIconStar :size="24" color="#f56c6c" />
          <LhIconSearch :size="24" color="#409eff" />
          <LhIconCheck :size="24" color="#67c23a" />
          <LhIconLoading :size="24" color="#909399" />
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
          <lh-button type="primary" @click="dialogVisible = true"
            >打开对话框</lh-button
          >
          <lh-button type="success" @click="dialogDraggableVisible = true"
            >打开可拖拽对话框</lh-button
          >
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
            <lh-button type="primary" @click="dialogVisible = false"
              >确定</lh-button
            >
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
            <lh-button type="primary" @click="dialogDraggableVisible = false"
              >确定</lh-button
            >
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
          <lh-config-provider
            :size="'large'"
            :theme-vars="{ 'primary-color': '#67c23a' }"
          >
            <lh-button>大尺寸</lh-button>
            <lh-button type="primary" plain>朴素</lh-button>
          </lh-config-provider>
        </div>

        <h3>国风花纹背景（通过 ConfigProvider 自定义）</h3>
        <div class="demo-box">
          <lh-button @click="setPattern('none')" type="primary"
            >无花纹</lh-button
          >
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
          <div class="pattern-preview" :style="patternPreviewStyle">
            <span class="demo-desc">当前花纹: {{ currentPattern }}</span>
          </div>
        </div>

        <h3>国风色彩主题</h3>
        <div class="demo-box">
          <lh-button @click="setTheme('default')" type="primary"
            >默认</lh-button
          >
          <lh-button
            @click="setTheme('gold')"
            :style="{ '--lh-primary-color': '#B8860B' }"
            >金色华贵</lh-button
          >
          <lh-button
            @click="setTheme('jade')"
            :style="{ '--lh-primary-color': '#5B8C5A' }"
            >玉色清雅</lh-button
          >
          <lh-button
            @click="setTheme('vermilion')"
            :style="{ '--lh-primary-color': '#C43A31' }"
            >朱砂古韵</lh-button
          >
          <lh-button
            @click="setTheme('indigo')"
            :style="{ '--lh-primary-color': '#2C3E6B' }"
            >靛青深邃</lh-button
          >
        </div>
        <div class="demo-box">
          <lh-button type="primary">主题色按钮</lh-button>
          <lh-button type="success">成功</lh-button>
          <lh-button type="warning">警告</lh-button>
          <lh-button type="danger">危险</lh-button>
        </div>

        <h3>花纹 & 按钮融合效果</h3>
        <p class="demo-desc">
          选中上方花纹后，按钮自动应用花纹背景（soft-light
          混合模式），花纹与背景色自然融合。
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
          <lh-button type="primary" plain>朴素主要</lh-button>
          <lh-button type="success" plain>朴素成功</lh-button>
          <lh-button round>圆角按钮</lh-button>
          <lh-button type="primary" round>圆角主要</lh-button>
        </div>
      </section>

      <section class="dev-section">
        <h2>国际化 (i18n)</h2>
        <div class="demo-box">
          <lh-button type="primary" @click="switchLang('zh-CN')"
            >切换中文</lh-button
          >
          <lh-button @click="switchLang('en-US')">Switch to EN</lh-button>
          <span class="demo-desc"
            >当前语言: {{ currentLocale }} | 翻译: {{ localeText }}</span
          >
        </div>
      </section>
    </div>
  </lh-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { lhlocale, zhCN, enUS } from "../src/index";

// 按需导入组件
import LhButton from "../packages/components/button";
import LhInput from "../packages/components/input";
import LhIcon from "../packages/components/icon";
import LhTooltip from "../packages/components/tooltip";
import LhDialog from "../packages/components/dialog";
import LhConfigProvider from "../packages/components/config-provider";

// 独立图标组件（分包导入）
import {
  LhIconStar,
  LhIconSearch,
  LhIconCheck,
  LhIconLoading,
} from "../packages/components/icon";

// 组件样式
import "../packages/components/button/style/index.scss";
import "../packages/components/input/style/index.scss";
import "../packages/components/icon/style/index.scss";
import "../packages/components/tooltip/style/index.scss";
import "../packages/components/dialog/style/index.scss";
import "../packages/theme/src/common/var.scss";
import "../packages/theme/src/common/var-dark.scss";
import "../packages/theme/src/common/patterns.scss";

const clickCount = ref(0);
const dialogVisible = ref(false);
const dialogDraggableVisible = ref(false);
const input1 = ref("");
const input2 = ref("");
const input3 = ref("");
const input4 = ref("");
const input5 = ref("");
const input6 = ref("");

// 花纹主题
const currentPattern = ref("none");
const themeVars = ref<Record<string, string>>({});

const patternPreviewStyle = computed(() => ({
  backgroundImage: `var(--lh-pattern-${currentPattern.value})`,
  backgroundColor: "var(--lh-bg-color, #FAF6F0)",
  backgroundRepeat: "repeat",
  backgroundSize: "auto",
  minHeight: "80px",
  borderRadius: "4px",
  border: "1px solid var(--lh-border-color-light, #E5E0D8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const setPattern = (name: string) => {
  currentPattern.value = name;
  if (name === "none") {
    themeVars.value = { ...themeVars.value, "bg-pattern": "none" };
  } else {
    themeVars.value = {
      ...themeVars.value,
      "bg-pattern": `var(--lh-pattern-${name})`,
      "bg-pattern-size": "40px",
    };
  }
};

const setTheme = (name: string) => {
  const themes: Record<string, Record<string, string>> = {
    default: {},
    gold: {
      "primary-color": "#B8860B",
      "primary-color-hover": "#D4A843",
      "primary-color-active": "#9A6F00",
      "primary-color-bg": "#FBF6EA",
      "primary-color-border": "#E8DCC4",
      "success-color": "#7A9E6D",
      "success-color-hover": "#8FB882",
      "success-color-active": "#6A8A5D",
      "success-color-bg": "#F0F5EC",
      "warning-color": "#D4943A",
      "warning-color-hover": "#E0A84A",
      "warning-color-active": "#C08030",
      "warning-color-bg": "#FDF6EA",
      "danger-color": "#C45050",
      "danger-color-hover": "#D46060",
      "danger-color-active": "#B04040",
      "danger-color-bg": "#FDF0F0",
      "info-color": "#9A8A7A",
      "info-color-hover": "#B0A090",
      "info-color-active": "#8A7A6A",
      "info-color-bg": "#F5F0EB",
      "decoration-color": "rgba(184, 134, 11, 0.15)",
    },
    jade: {
      "primary-color": "#5B8C5A",
      "primary-color-hover": "#7AAE7A",
      "primary-color-active": "#4B7A4A",
      "primary-color-bg": "#EDF5EC",
      "primary-color-border": "#D4E8D4",
      "success-color": "#7AAE7A",
      "success-color-hover": "#8FC48F",
      "success-color-active": "#6A9E6A",
      "success-color-bg": "#F0F8F0",
      "warning-color": "#B5A84A",
      "warning-color-hover": "#C8BA5A",
      "warning-color-active": "#A09840",
      "warning-color-bg": "#F8F8EC",
      "danger-color": "#B25A5A",
      "danger-color-hover": "#C46A6A",
      "danger-color-active": "#A04A4A",
      "danger-color-bg": "#F8F0F0",
      "info-color": "#8A9A8A",
      "info-color-hover": "#A0B0A0",
      "info-color-active": "#7A8A7A",
      "info-color-bg": "#F0F2F0",
      "decoration-color": "rgba(91, 140, 90, 0.12)",
    },
    vermilion: {
      "primary-color": "#C43A31",
      "primary-color-hover": "#E85D4A",
      "primary-color-active": "#9F2A23",
      "primary-color-bg": "#FDF0EE",
      "primary-color-border": "#F0D8D4",
      "success-color": "#7A8A5A",
      "success-color-hover": "#8FA06A",
      "success-color-active": "#6A7A4A",
      "success-color-bg": "#F0F2EA",
      "warning-color": "#C49A4A",
      "warning-color-hover": "#D4AA5A",
      "warning-color-active": "#B48A3A",
      "warning-color-bg": "#FDF6EA",
      "danger-color": "#A03030",
      "danger-color-hover": "#B84040",
      "danger-color-active": "#8A2828",
      "danger-color-bg": "#F8ECEC",
      "info-color": "#8A7A7A",
      "info-color-hover": "#A09090",
      "info-color-active": "#7A6A6A",
      "info-color-bg": "#F2F0F0",
      "decoration-color": "rgba(196, 58, 49, 0.12)",
    },
    indigo: {
      "primary-color": "#2C3E6B",
      "primary-color-hover": "#4A6FA5",
      "primary-color-active": "#1E2A4A",
      "primary-color-bg": "#EDF0F5",
      "primary-color-border": "#D4DCE8",
      "success-color": "#5A8A6A",
      "success-color-hover": "#6AA07A",
      "success-color-active": "#4A7A5A",
      "success-color-bg": "#ECF2EE",
      "warning-color": "#B5A05A",
      "warning-color-hover": "#C8B06A",
      "warning-color-active": "#A0904A",
      "warning-color-bg": "#F8F6EC",
      "danger-color": "#A05050",
      "danger-color-hover": "#B46060",
      "danger-color-active": "#8A4040",
      "danger-color-bg": "#F4ECEC",
      "info-color": "#7A8A9A",
      "info-color-hover": "#90A0B0",
      "info-color-active": "#6A7A8A",
      "info-color-bg": "#EEF0F2",
      "decoration-color": "rgba(44, 62, 107, 0.12)",
    },
  };
  themeVars.value = { ...themeVars.value, ...themes[name] };
};

// 国际化
const currentLocale = ref("zh-CN");
const localeText = computed(() => {
  lhlocale.version.value; // 依赖响应式版本号，触发重新计算
  return lhlocale.t("input.placeholder");
});

const switchLang = (lang: string) => {
  currentLocale.value = lang;
  if (lang === "en-US") {
    lhlocale.use({ locale: "en-US", messages: enUS });
  } else {
    lhlocale.use({ locale: "zh-CN", messages: zhCN });
  }
};

function handleClick() {
  clickCount.value++;
}
</script>

<style scoped>
.dev-container {
  max-width: 860px;
  margin: 40px auto;
  padding: 0 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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

.pattern-preview {
  transition: background-image 0.5s ease;
}
</style>
