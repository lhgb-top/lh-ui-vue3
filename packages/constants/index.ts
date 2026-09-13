/**
 * 组件类型常量
 */
export const LH_TYPES_CONST = {
    /** @alias 成功 */
    success: 'success',
    /** @alias 警告 */
    warning: 'warning',
    /** @alias 错误 */
    error: 'error',
    /** @alias 信息 */
    info: 'info',
    /** @alias 危险 */
    danger: 'danger',
} as const;

/**
 * 组件尺寸常量
 */
export const LH_SIZE_CONST = {
    /** @alias 小 */
    small: 'small',
    /** @alias 中 */
    medium: 'medium',
    /** @alias 大 */
    large: 'large',
    /** @alias 迷你 */
    mini: 'mini',
    // 老年人专用
    /** @alias 老年人尺寸 */
    old: 'x-large',
} as const;

/**
 * 默认尺寸
 */
export const LH_SIZE_DEFAULT = LH_SIZE_CONST.medium;

/**
 * 语言常量
 */
export const LH_LANGUAGE_CONST = {
    /** @alias 简体中文 */
    zhCN: 'zh-CN',
    /** @alias 英文 */
    enUS: 'en-US',
} as const;

/**
 * 默认语言
 */
export const LH_LANGUAGE_DEFAULT = LH_LANGUAGE_CONST.zhCN;