import { LhLanguageConst } from "./components";

//  国际化类型声明
export type LhLocaleType = typeof LhLanguageConst[keyof typeof LhLanguageConst];
export type LhLocaleMessages = {
    [key: string]: any
}

export interface LocaleOptions {
    locale: LhLocaleType;
    messages: LhLocaleMessages;
}