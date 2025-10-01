export const LhTypesConst = {
    success: 'success',
    warning: 'warning',
    error: 'error',
    info: 'info',
    danger: 'danger',
} as const;

export const LhSizeConst = {
    default: 'default',
    small: 'small',
    medium: 'medium',
    large: 'large',
    mini: 'mini',
    // 老年人专用
    old: 'x-large',
} as const;

export const LH_SIZE_DEFAULT = LhSizeConst.medium;

export const LhLanguageConst = {
    zhCN: 'zh-CN',
    enUS: 'en-US',
} as const;

export const LH_LANGUAGE_DEFAULT = LhLanguageConst.zhCN;