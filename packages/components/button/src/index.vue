<template>
    <button :class="[
        'lh-button',
        {

        }
    ]" :style="buttonStyle">
        <div class="lh-button__icon">
            <slot name="icon" v-if="props.icon">

            </slot>
        </div>
        <slot></slot>
    </button>
</template>

<script lang="ts"  setup>
import {useLhButton} from './index'
const {props, emits, handleClick, buttonStyle}= useLhButton()
</script>

<style lang="scss" scoped>
@use '../../../theme/src/index.scss' as *;

.lh-button {
    display: inline-block;
    padding: var(--lh-button-padding);
    font-size: var(--lh-button-font-size);
    line-height: var(--lh-button-line-height);
    border-radius: var(--lh-button-border-radius);

    &:hover {}

    &:active {}

    &:focus {}
}
</style>