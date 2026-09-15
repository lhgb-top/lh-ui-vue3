import type { Component } from 'vue'

import LhButton from './button'
import LhInput from './input'
import LhConfigProvider from './config-provider'
import LhIcon from './icon'
import LhTooltip from './tooltip'
import LhDialog from './dialog'
import LhForm, { LhFormItem } from './form'
import LhSelect from './select'
import LhCheckbox, { LhCheckboxGroup } from './checkbox'
import LhRadio, { LhRadioGroup } from './radio'
import LhSwitch from './switch'
import LhInputNumber from './input-number'
import LhSlider from './slider'
import LhDatePicker from './date-picker'
import LhTimePicker from './time-picker'
import LhCascader from './cascader'
import LhTag from './tag'
import LhBadge from './badge'
import LhAvatar from './avatar'
import LhProgress from './progress'
import LhStatistic from './statistic'
import LhDescriptions from './descriptions'

export const lhComponents: (Component & { name?: string })[] = [
  LhButton,
  LhInput,
  LhIcon,
  LhTooltip,
  LhDialog,
  LhForm,
  LhFormItem,
  LhSelect,
  LhCheckbox,
  LhCheckboxGroup,
  LhRadio,
  LhRadioGroup,
  LhSwitch,
  LhInputNumber,
  LhConfigProvider,
  LhSlider,
  LhDatePicker,
  LhTimePicker,
  LhCascader,
  LhTag,
  LhBadge,
  LhAvatar,
  LhProgress,
  LhStatistic,
  LhDescriptions,
]

export {
  LhButton,
  LhInput,
  LhConfigProvider,
  LhIcon,
  LhTooltip,
  LhDialog,
  LhForm,
  LhFormItem,
  LhSelect,
  LhCheckbox,
  LhCheckboxGroup,
  LhRadio,
  LhRadioGroup,
  LhSwitch,
  LhInputNumber,
  LhSlider,
  LhDatePicker,
  LhTimePicker,
  LhCascader,
  LhTag,
  LhBadge,
  LhAvatar,
  LhProgress,
  LhStatistic,
  LhDescriptions,
}
