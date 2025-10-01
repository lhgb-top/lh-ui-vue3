

import { computed, PropType } from 'vue'
import { LhButtonSize, LhButtonSizeConst, LhButtonType, LhButtonTypeConst } from './types'
export const useLhButton = () => {
    const props = defineProps({
        type: {
            type: String as PropType<LhButtonType>,
            default: LhButtonTypeConst.default
        },
        size: {
            type: String as PropType<LhButtonSize>,
            default: LhButtonSizeConst.default
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
        href: {
            type: String,
            default: ''
        }
    })
    const emits = defineEmits(['click']);

    const handleClick = (e: MouseEvent) => {
        if (!props.loading && !props.disabled) {
            emits('click', e)
        }
    }

    // 支持主题变量
    const buttonStyle = computed(() => {
        return {
            '--lh-button-primary-color': `var(--lh-primary-color, #409EFF)`,
            '--lh-button-border-radius': `var(--lh-border-radius-base, 4px)`
        }
    })
    return {
        props,
        emits,
        handleClick,
        buttonStyle
    }
}


