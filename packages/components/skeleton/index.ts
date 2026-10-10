import type { App, Component } from 'vue'
import LhSkeleton from './src/index.vue'
import LhSkeletonItem from './src/skeleton-item.vue'
import type { LhSkeletonProps, LhSkeletonItemProps } from './src/types'

const name = LhSkeleton.name ?? 'LhSkeleton'

;(LhSkeleton as Component & { install?: (app: App) => void }).install = (app: App): void => {
  app.component(name, LhSkeleton)
}

const itemName = LhSkeletonItem.name ?? 'LhSkeletonItem'

;(LhSkeletonItem as Component & { install?: (app: App) => void }).install = (
  app: App,
): void => {
  app.component(itemName, LhSkeletonItem)
}

export default LhSkeleton
export { LhSkeleton, LhSkeletonItem }
export type { LhSkeletonProps, LhSkeletonItemProps }
