import type { LhSxProps } from '@lh-ui/share/core/shared'
import type { LhUploadRequest } from '@lh-ui/share/core/upload'

export interface LhUploadProps {
  /** 允许多选 */
  multiple?: boolean
  /** 拖拽上传区 */
  drag?: boolean
  /** 禁用 */
  disabled?: boolean
  /** 允许的扩展名 / MIME：数组 `['.png', 'image/*']` 或逗号字符串 `'.png,.jpg'` */
  accept?: string[] | string
  /** 单个文件大小上限（字节） */
  maxSize?: number
  /** 数量上限（0 为不限） */
  maxCount?: number
  /** 上传请求函数（不传则只做本地选择与校验） */
  request?: LhUploadRequest
  /** sx 快速布局属性 */
  sx?: LhSxProps
}

export type { LhUploadFile, LhUploadFileStatus, LhUploadRequest } from '@lh-ui/share/core/upload'
