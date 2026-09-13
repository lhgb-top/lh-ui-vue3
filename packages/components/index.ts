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
}
