import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { string } from 'rollup-plugin-string';
import { multiInput } from 'rollup-plugin-multi-input';
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

// 公共插件配置
function createBasePlugins() {
  return [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
    }),
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve',
        },
      },
    }),
    typescript({
      declaration: true,
      rootDir: resolvePath('.'),
      tsconfig: resolvePath('tsconfig.json'),
    }),
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
      alias: {
        '~': resolvePath('packages'),
        'constants': resolvePath('packages/constants'),
        'types': resolvePath('types'),
      },
    }),
    commonjs(),
    string({
      include: ['**/*.html', '**/*.md'],
    }),
    scss({
      include: ['packages/**/*.scss'],
      output: false,
      inject: true,
      prefixId: false,
      additionalData: '',
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
      exports: 'default',
    },
  ],
  external: ['vue'],
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
        exports: 'default',
      },
    ],
    external: ['vue'],
    plugins: [...createBasePlugins()],
  };
}

// 样式独立打包
function createStyleEntry(name) {
  const stylePath = resolvePath(`packages/components/${name}/style/index.scss`);
  if (!fs.existsSync(stylePath)) return null;

  return {
    input: stylePath,
    output: [
      {
        file: resolvePath(`es/${name}/style/index.css`),
        format: 'es',
      },
    ],
    plugins: [
      scss({
        output: true,
        inject: false,
        prefixId: false,
        outputDir: resolvePath(`es/${name}/style`),
        autoprefixer: {
          autoprefixer,
        },
      }),
    ],
  };
}

// 主题样式
const themeEntry = {
  input: resolvePath('packages/theme/src/index.scss'),
  output: [
    {
      file: resolvePath('theme/index.css'),
      format: 'es',
    },
  ],
  plugins: [
    scss({
      output: true,
      inject: false,
      outputDir: resolvePath('theme'),
      autoprefixer: {
        autoprefixer,
      },
    }),
  ],
};

// 常量包
const constantsEntry = {
  input: resolvePath('packages/constants/index.ts'),
  output: [
    {
      file: resolvePath('es/constants/index.js'),
      format: 'es',
    },
    {
      file: resolvePath('lib/constants/index.js'),
      format: 'cjs',
      exports: 'default',
    },
  ],
  plugins: [typescript({ declaration: true, rootDir: resolvePath('.') })],
};

// 语言包
const localeEntry = {
  input: resolvePath('packages/locales/index.ts'),
  output: [
    {
      file: resolvePath('es/locale/index.js'),
      format: 'es',
    },
    {
      file: resolvePath('lib/locale/index.js'),
      format: 'cjs',
      exports: 'default',
    },
  ],
  plugins: [
    typescript({ declaration: true, rootDir: resolvePath('.') }),
    resolve(),
    commonjs(),
  ],
};

// 根据环境变量决定构建目标
let configs = [];

if (formatEnv === 'esm') {
  // ESM: 只构建 JS，不构建 CSS
  configs.push(mainEntry);
  configs.push(constantsEntry);
  configs.push(localeEntry);
  components.forEach((name) => {
    const entry = createComponentEntry(name);
    if (entry) configs.push(entry);
  });
} else if (formatEnv === 'cjs') {
  // CJS: 只构建 JS
  configs.push(mainEntry);
  configs.push(constantsEntry);
  configs.push(localeEntry);
  components.forEach((name) => {
    const entry = createComponentEntry(name);
    if (entry) configs.push(entry);
  });
} else if (formatEnv === 'umd') {
  // UMD: 全量打包含依赖
  configs.push({
    input: resolvePath('src/index.ts'),
    output: {
      file: resolvePath('dist/lh-ui-plus.js'),
      format: 'umd',
      name: 'LhUIPlus',
      globals: { vue: 'Vue' },
    },
    external: ['vue'],
    plugins: [...createBasePlugins()],
  });
} else {
  // 默认全量构建: ESM + CJS + 样式
  configs.push(mainEntry);
  configs.push(constantsEntry);
  configs.push(localeEntry);
  configs.push(themeEntry);
  components.forEach((name) => {
    const compEntry = createComponentEntry(name);
    if (compEntry) configs.push(compEntry);
    const styleEntry = createStyleEntry(name);
    if (styleEntry) configs.push(styleEntry);
  });
}

export default configs;