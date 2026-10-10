import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import vue from '@vitejs/plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import scss from 'rollup-plugin-scss';
import * as sass from 'sass';
import replace from '@rollup/plugin-replace';
import { string } from 'rollup-plugin-string';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from 'fs';

const root = process.cwd();
const isProd = process.env.BUILD === 'production';
const formatEnv = process.env.FORMAT;

function resolvePath(relativePath) {
  return path.resolve(root, relativePath);
}

// 获取 packages/components 下所有组件
function getComponentPackages() {
  const componentsDir = resolvePath('packages/components');
  if (!fs.existsSync(componentsDir)) return [];
  return fs.readdirSync(componentsDir).filter((name) => {
    return fs.statSync(path.join(componentsDir, name)).isDirectory();
  });
}

const components = getComponentPackages();

// 内部路径别名 — 所有入口共用，避免个别入口漏接导致产物出现裸导入
function getAliasEntries() {
  return [
    { find: '~', replacement: resolvePath('packages') },
    { find: 'lh-types', replacement: resolvePath('types') },
    { find: '@lh-ui/vue3', replacement: resolvePath('src/index.ts') },
    // 只别名 scss 前缀：JS 侧的 @lh-ui/share/* 必须保持 bare 才能被 external 命中
    { find: '@lh-ui/share/styles', replacement: resolvePath('node_modules/@lh-ui/share/styles') },
  ];
}

// node-resolve 默认不含 .ts/.vue，必须显式声明，否则别名指向的目录无法解析到 index.ts
const resolveOptions = {
  extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
};

// 公共插件配置
function createBasePlugins() {
  return [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
    }),
    alias({
      entries: getAliasEntries(),
    }),
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve',
        },
      },
    }),
    esbuild({
      include: /\.(ts|tsx)(\?.*)?$/,
      target: 'es2020',
      sourceMap: true,
    }),
    resolve(resolveOptions),
    commonjs(),
    string({
      include: ['**/*.html', '**/*.md'],
    }),
    scss({
      // 同时处理组件样式入口与 SFC 样式虚拟模块：
      // @vitejs/plugin-vue 会把 <style> 拆成 `?vue&type=style...` 模块，纯 CSS 的以 `&lang.css` 结尾
      // 组件 scss 源在 @lh-ui/share 包内（别名指向 node_modules），需单独匹配
      include: [
        /packages\/.*\.scss$/,
        /@lh-ui[\\/]share[\\/]styles[\\/].*\.scss$/,
        /\.vue\?vue&type=style.*&lang\.(css|scss|sass)$/,
      ],
      output: false,
      inject: true,
      prefixId: false,
      additionalData: '',
      // 插件 4.0.1 硬编码走 sass legacy render API（不透传 sassOptions），
      // 这里传一个基于现代 compileString API 的适配器，顺带静默弃用告警
      sass: {
        renderSync(options) {
          const result = sass.compileString(options.data, {
            loadPaths: options.includePaths,
            silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin'],
          })
          return { css: result.css, map: result.sourceMap ?? null }
        },
      },
      autoprefixer: {
        autoprefixer,
      },
    }),
  ];
}

// 全量构建入口
const mainEntry = {
  input: resolvePath('src/index.ts'),
  output: [
    {
      file: resolvePath('es/index.js'),
      format: 'es',
      exports: 'named',
    },
    {
      file: resolvePath('lib/index.js'),
      format: 'cjs',
      exports: 'named',
    },
  ],
  // @lh-ui/share 是运行时依赖，保持 bare 引用，不打入产物
  external: ['vue', /^@lh-ui\/share/],
  plugins: [...createBasePlugins()],
};

// 按需构建 - 每个组件独立打包
function createComponentEntry(name) {
  const componentPath = resolvePath(`packages/components/${name}/index.ts`);
  if (!fs.existsSync(componentPath)) return null;

  return {
    input: componentPath,
    output: [
      {
        file: resolvePath(`es/${name}/index.js`),
        format: 'es',
        exports: 'named',
      },
      {
        file: resolvePath(`lib/${name}/index.js`),
        format: 'cjs',
        exports: 'named',
      },
    ],
    external: ['vue', /^@lh-ui\/share/],
    plugins: [...createBasePlugins()],
  };
}

// 样式产物（theme/、dist/*/style.css、es|lib/<name>/style/index.css）
// 由 scripts/build-styles.mjs 用 sass API 生成：rollup-plugin-scss 不支持 outputDir，
// 放在这里只会产出空文件并把真实样式丢进 assets/。

// 主题预设包（纯数据入口，供 `@lh-ui/vue3/theme` 子路径消费）
// 转发 @lh-ui/share/theme：本仓库不再持有主题 TS 源
const themeEntry = {
  input: resolvePath('src/theme.ts'),
  output: [
    {
      file: resolvePath('es/theme/index.js'),
      format: 'es',
    },
    {
      file: resolvePath('lib/theme/index.js'),
      format: 'cjs',
      exports: 'named',
    },
  ],
  plugins: [
    alias({ entries: getAliasEntries() }),
    esbuild({ target: 'es2020', sourceMap: true }),
    resolve(resolveOptions),
    commonjs(),
  ],
};

// 根据环境变量决定构建目标
let configs = [];

if (formatEnv === 'esm') {
  // ESM: 只构建 JS，不构建 CSS
  configs.push(mainEntry);
  configs.push(themeEntry);
  components.forEach((name) => {
    const entry = createComponentEntry(name);
    if (entry) configs.push(entry);
  });
} else if (formatEnv === 'cjs') {
  // CJS: 只构建 JS
  configs.push(mainEntry);
  configs.push(themeEntry);
  components.forEach((name) => {
    const entry = createComponentEntry(name);
    if (entry) configs.push(entry);
  });
} else if (formatEnv === 'umd') {
  // UMD: 全量打包含依赖（share 无 CDN 全局名，一并打入）
  configs.push({
    input: resolvePath('src/index.ts'),
    output: {
      file: resolvePath('dist/vue3.js'),
      format: 'umd',
      name: 'LhUI3',
      exports: 'named',
      globals: { vue: 'Vue' },
    },
    external: ['vue'],
    plugins: [...createBasePlugins()],
  });
} else {
  // 默认全量构建: ESM + CJS（样式产物由 scripts/build-styles.mjs 生成）
  configs.push(mainEntry);
  configs.push(themeEntry);
  components.forEach((name) => {
    const compEntry = createComponentEntry(name);
    if (compEntry) configs.push(compEntry);
  });
}

export default configs;