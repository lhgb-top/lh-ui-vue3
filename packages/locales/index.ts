
import zh_CN from './lang/zh-CN';
import en_US from './lang/en-US';
import {  LhLocaleMessages, LhLocaleType, LocaleOptions } from 'types/locale';
import { LH_LANGUAGE_DEFAULT, LhBaseProps, LhLanguageConst, LhSizes, LhTypes } from 'types/components';
// packages/locales/src/index.ts
class LhLocale {
    private current: LhLocaleType = LH_LANGUAGE_DEFAULT;
    private messages: LhLocaleMessages = zh_CN;

    use(options: LocaleOptions): void {
        this.current = options.locale;
        this.messages = options.messages;
    }

    t(path: string): string {
        const keys = path.split('.');
        let result: any = this.messages[this.current];

        for (const key of keys) {
            if (result === undefined || result === null) break;
            result = result[key];
        }

        return result || '';
    }

    getLocale(): LhLocaleType {
        return this.current;
    }

    setLocale(locale: LhLocaleType): void {
        this.current = locale;
    }
}

export const lhlocale = new LhLocale();

// 默认中文语言包
export const zhCN: LhLocaleMessages =zh_CN;

// 默认英文语言包
export const enUS: LhLocaleMessages =en_US;