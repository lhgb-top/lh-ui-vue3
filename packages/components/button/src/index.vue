<template>
  <button
    v-if="!props.href"
    :type="props.nativeType || 'button'"
    :class="[
      'lh-button',
      `lh-button--${props.type}`,
      `lh-button--${effectiveSize}`,
      {
        'lh-button--plain': props.plain,
        'lh-button--block': props.block,
        'lh-button--round': props.round,
        'lh-button--circle': props.circle,
        'lh-button--loading': props.loading,
        'lh-button--disabled': props.disabled,
      },
    ]"
    :disabled="props.disabled || props.loading"
    :style="buttonStyle"
    @click="handleClick"
  >
    <span v-if="props.loading" class="lh-button__loading">
      <svg class="lh-button__spinner" viewBox="0 0 100 100">
        <circle
          class="lh-button__path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="16"
        />
      </svg>
    </span>
    <span v-if="props.icon" class="lh-button__icon">
      <slot name="icon">
        <i :class="props.icon"></i>
      </slot>
    </span>
    <span v-if="$slots.default" class="lh-button__text">
      <slot></slot>
    </span>
  </button>

  <a
    v-else
    :href="props.href"
    :target="props.target"
    :class="[
      'lh-button',
      `lh-button--${props.type}`,
      `lh-button--${effectiveSize}`,
      {
        'lh-button--plain': props.plain,
        'lh-button--block': props.block,
        'lh-button--round': props.round,
        'lh-button--circle': props.circle,
        'lh-button--disabled': props.disabled,
      },
    ]"
    :style="buttonStyle"
  >
    <span v-if="props.icon" class="lh-button__icon">
      <slot name="icon">
        <i :class="props.icon"></i>
      </slot>
    </span>
    <span v-if="$slots.default" class="lh-button__text">
      <slot></slot>
    </span>
  </a>
</template>

<script lang="ts" setup>
import { useLhButton } from "./index";
import type { LhButtonProps } from "./types";
import { LH_BUTTON_TYPE_CONST } from "./types";

defineOptions({
  name: "LhButton",
});

const props = withDefaults(defineProps<LhButtonProps>(), {
  type: LH_BUTTON_TYPE_CONST.default,
  size: undefined,
  loading: false,
  disabled: false,
  plain: false,
  block: false,
  round: false,
  circle: false,
  icon: "",
  nativeType: "button",
  href: "",
  target: "_self",
  themeVars: undefined,
  bgPattern: undefined,
});

const emit = defineEmits<{
  click: [e: MouseEvent];
}>();

const { handleClick, buttonStyle, effectiveSize } = useLhButton(props, emit);
</script>
