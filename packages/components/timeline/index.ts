import type { App, Component } from 'vue'
import LhTimeline from './src/index.vue'
import LhTimelineItem from './src/item.vue'
import type { LhTimelineItemProps, LhTimelineProps } from './src/types'

const name = LhTimeline.name ?? 'LhTimeline'

;(LhTimeline as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhTimeline)
  app.component('LhTimelineItem', LhTimelineItem)
}

export default LhTimeline
export { LhTimeline, LhTimelineItem }
export type { LhTimelineItemProps, LhTimelineProps }
