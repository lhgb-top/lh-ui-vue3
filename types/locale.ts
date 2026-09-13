import { LH_LANGUAGE_CONST } from './components'

export type LhLocaleType = (typeof LH_LANGUAGE_CONST)[keyof typeof LH_LANGUAGE_CONST]
export type LhLocaleMessageValue =
  | string
  | readonly LhLocaleMessageValue[]
  | {
      readonly [key: string]: LhLocaleMessageValue
    }
export type LhLocaleMessages = Record<string, LhLocaleMessageValue>

export interface LocaleOptions {
  locale: LhLocaleType
  messages: LhLocaleMessages
}
