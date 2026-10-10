<template>
  <div
    :class="uploadClasses"
    :style="uploadStyle"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <input
      ref="inputRef"
      type="file"
      class="lh-upload__input"
      :multiple="props.multiple || undefined"
      :accept="acceptAttr"
      :disabled="props.disabled || undefined"
      :aria-label="t('upload.select', '选择文件')"
      @change="handleInputChange"
    />

    <div
      class="lh-upload__trigger"
      role="button"
      :tabindex="props.disabled ? -1 : 0"
      :aria-disabled="props.disabled || undefined"
      @click="openFileDialog"
      @keydown="handleTriggerKeydown"
    >
      <slot>
        <span class="lh-upload__hint">
          {{
            props.drag
              ? t('upload.drag', '将文件拖到此处，或点击上传')
              : t('upload.select', '选择文件')
          }}
        </span>
      </slot>
    </div>

    <ul
      v-if="files.length > 0"
      class="lh-upload__list"
      :aria-label="t('upload.list', '文件列表')"
    >
      <li
        v-for="file in files"
        :key="file.uid"
        :class="fileClassNames(file.status)"
      >
        <span class="lh-upload__file-name">{{ file.name }}</span>
        <span class="lh-upload__file-size">{{ formatFileSize(file.size) }}</span>

        <span
          v-if="file.status === 'uploading'"
          class="lh-upload__progress"
          role="progressbar"
          :aria-valuenow="file.percent"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span
            class="lh-upload__progress-bar"
            :style="{ width: `${file.percent}%` }"
          />
        </span>
        <span
          v-else-if="file.status === 'fail'"
          class="lh-upload__file-error"
        >
          {{ file.error || t('upload.fail', '上传失败') }}
        </span>
        <span
          v-else-if="file.status === 'success'"
          class="lh-upload__file-success"
          aria-hidden="true"
        >
          ✓
        </span>

        <button
          type="button"
          class="lh-upload__file-remove"
          :aria-label="`${t('upload.remove', '移除')} ${file.name}`"
          @click="remove(file.uid)"
        >
          ✕
        </button>
      </li>
    </ul>

    <p
      v-if="errorMessage"
      class="lh-upload__error"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  createUploadFile,
  exceedsMaxCount,
  exceedsMaxSize,
  formatFileSize,
  getUploadClassNames,
  getUploadFileClassNames,
  isFileRejected,
  LH_UPLOAD_MAX_SIZE,
  normalizeUploadAccept,
  patchUploadFile,
  removeUploadFile,
} from '@lh-ui/share/core/upload'
import { isActivationKey, sxToStyle } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import type { LhUploadFile } from '@lh-ui/share/core/upload'
import type { LhUploadProps } from './types'

defineOptions({ name: 'LhUpload' })

const props = withDefaults(defineProps<LhUploadProps>(), {
  multiple: false,
  drag: false,
  disabled: false,
  accept: () => [],
  maxSize: LH_UPLOAD_MAX_SIZE,
  maxCount: 0,
  request: undefined,
  sx: undefined,
})

const emit = defineEmits<{
  change: [files: LhUploadFile[]]
  success: [file: LhUploadFile]
  error: [file: LhUploadFile, reason: string]
  remove: [uid: string]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const inputRef = ref<HTMLInputElement | null>(null)
const dragOver = ref(false)
const files = ref<LhUploadFile[]>([])
const errorMessage = ref('')

/** accept 入口归一：字符串（'.png,.jpg'）与数组统一成 string[]，下游只面对一种形态 */
const acceptList = computed(() => normalizeUploadAccept(props.accept))

const acceptAttr = computed(() => (acceptList.value.length > 0 ? acceptList.value.join(',') : undefined))

function openFileDialog(): void {
  if (props.disabled) return
  inputRef.value?.click()
}

function handleTriggerKeydown(event: KeyboardEvent): void {
  if (props.disabled) return
  if (isActivationKey(event)) {
    event.preventDefault()
    openFileDialog()
  }
}

function handleInputChange(event: Event): void {
  const input = event.target as HTMLInputElement
  if (input.files) addFiles(Array.from(input.files))
  input.value = ''
}

function handleDragOver(): void {
  if (props.disabled) return
  dragOver.value = true
}

function handleDragLeave(): void {
  dragOver.value = false
}

function handleDrop(event: DragEvent): void {
  dragOver.value = false
  if (props.disabled) return
  const dropped = event.dataTransfer?.files
  if (dropped) addFiles(Array.from(dropped))
}

function addFiles(incoming: File[]): void {
  errorMessage.value = ''
  for (const file of incoming) {
    if (exceedsMaxCount(files.value.length, props.maxCount)) {
      errorMessage.value = t('upload.exceedCount', '超出数量限制')
      break
    }
    if (exceedsMaxSize(file, props.maxSize)) {
      errorMessage.value = t('upload.exceedSize', '文件超出大小限制')
      continue
    }
    if (isFileRejected(file, acceptList.value)) {
      errorMessage.value = t('upload.rejectType', '文件类型不允许')
      continue
    }
    const record = createUploadFile(file)
    files.value = [...files.value, record]
    emit('change', files.value)
    startUpload(record)
  }
}

async function startUpload(record: LhUploadFile): Promise<void> {
  if (!props.request) return
  files.value = patchUploadFile(files.value, record.uid, { status: 'uploading', percent: 0 })
  try {
    const result = await props.request({
      file: record.raw as File,
      onProgress: (percent) => {
        files.value = patchUploadFile(files.value, record.uid, { percent })
      },
    })
    files.value = patchUploadFile(files.value, record.uid, {
      status: 'success',
      percent: 100,
      url: result.url,
    })
    const done = files.value.find((f) => f.uid === record.uid)
    if (done) emit('success', done)
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error)
    files.value = patchUploadFile(files.value, record.uid, { status: 'fail', error: reason })
    const failed = files.value.find((f) => f.uid === record.uid)
    if (failed) emit('error', failed, reason)
  }
  emit('change', files.value)
}

function remove(uid: string): void {
  files.value = removeUploadFile(files.value, uid)
  emit('remove', uid)
  emit('change', files.value)
}

const uploadClasses = computed(() =>
  getUploadClassNames({ dragOver: dragOver.value, disabled: !!props.disabled }),
)

const fileClassNames = (status: LhUploadFile['status']) => getUploadFileClassNames(status)

const uploadStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
