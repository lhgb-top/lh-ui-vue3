import { ref } from 'vue'
import zh_CN from './lang/zh-CN';
import en_US from './lang/en-US';
import type { LhLocaleMessages, LhLocaleType } from 'types/locale';
import { LH_LANGUAGE_DEFAULT } from 'constants';

/**
 * 内置语言包注册表
 */
const locales: Record<string, LhLocaleMessages> = {
  [LH_LANGUAGE_DEFAULT]: zh_CN,
  'en-US': en_US,
};

/**
 * 国际化模块
 *
 * 使用方式：
 * ```ts
 * // 切换语言
 * import { lhlocale, zhCN, enUS } from 'lh-ui-plus'
 * lhlocale.use({ locale: 'en-US', messages: enUS })
 *
 * // 组件内使用
 * lhlocale.t('input.placeholder')
 * ```
 */
class LhLocale {
    private current: LhLocaleType = LH_LANGUAGE_DEFAULT;
    private messages: LhLocaleMessages = locales[LH_LANGUAGE_DEFAULT];
    /** 响应式版本号，用于触发 Vue computed 重新计算 */
    public version = ref(0)

    /**
     * 设置语言
     */
    use(options: { locale: LhLocaleType; messages: LhLocaleMessages }): void {
        this.current = options.locale;
        this.messages = options.messages;
        locales[options.locale] = options.messages;
        this.version.value++
    }

    /**
     * 根据路径获取翻译文案
     * @param path 点号分隔的路径，如 'input.placeholder'
     * @param fallback 未找到翻译时的兜底值
     */
    t(path: string, fallback?: string): string {
        const keys = path.split('.');
        let result: any = this.messages;

        for (const key of keys) {
            if (result === undefined || result === null) {
                return fallback || path;
            }
            result = result[key];
        }
        return result !== undefined ? String(result) : (fallback || path);
    }

    /**
     * 获取当前语言
     */
    getLocale(): LhLocaleType {
        return this.current;
    }

    /**
     * 设置当前语言（仅切换，不会加载新 messages）
     */
    setLocale(locale: LhLocaleType): void {
        this.current = locale;
        const msgs = locales[locale];
        if (msgs) {
            this.messages = msgs;
        }
        this.version.value++
    }

    /**
     * 添加自定义语言包
     */
    add(locale: string, messages: LhLocaleMessages): void {
        locales[locale] = messages;
    }
}

export const lhlocale = new LhLocale();

// 默认中文语言包
export const zhCN: LhLocaleMessages = zh_CN;

// 默认英文语言包
export const enUS: LhLocaleMessages = en_US;