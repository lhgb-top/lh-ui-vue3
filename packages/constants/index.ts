/**
 * 组件类型常量
 */
export const LhTypesConst = {
    success: 'success',
    warning: 'warning',
    error: 'error',
    info: 'info',
    danger: 'danger',
} as const;

/**
 * 组件尺寸常量
 */
export const LhSizeConst = {
    default: 'default',
    small: 'small',
    medium: 'medium',
    large: 'large',
    mini: 'mini',
    // 老年人专用
    old: 'x-large',
} as const;

/**
 * 默认尺寸
 */
export const LH_SIZE_DEFAULT = LhSizeConst.medium;

/**
 * 语言常量
 */
export const LhLanguageConst = {
    zhCN: 'zh-CN',
    enUS: 'en-US',
} as const;

/**
 * 默认语言
 */
export const LH_LANGUAGE_DEFAULT = LhLanguageConst.zhCN;