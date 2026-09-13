import type { App, Component } from 'vue'
import LhForm from './src/index.vue'
import LhFormItem from './src/item.vue'
import type { LhFormItemProps, LhFormProps, LhFormRule } from './src/types'

const formName = LhForm.name ?? 'LhForm'
const formItemName = LhFormItem.name ?? 'LhFormItem'

;(LhForm as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(formName, LhForm)
  app.component(formItemName, LhFormItem)
}

export default LhForm
export { LhForm, LhFormItem }
export type { LhFormItemProps, LhFormProps, LhFormRule }
