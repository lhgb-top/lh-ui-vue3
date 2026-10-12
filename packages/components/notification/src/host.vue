<template>
  <div
    v-for="(group, position) in groups"
    :key="position"
    :class="['lh-notification', `lh-notification--${position}`]"
    :style="{
      marginTop: `${isTopPosition(position) ? config.offset : 0}px`,
      marginBottom: `${!isTopPosition(position) ? config.offset : 0}px`,
    }"
    role="region"
    :aria-live="'polite'"
    :aria-label="position"
  >
    <TransitionGroup name="lh-notification-slide">
      <LhNotificationItem
        v-for="record in group"
        :key="record.id"
        :type="record.type"
        :title="record.title"
        :content="record.content"
        :show-close="record.showClose"
        :sx="record.sx"
        :on-click="record.onClick"
        @close="close(record.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { groupNotificationsByPosition, isTopPosition } from '@lh-ui/share/core/notification'
import LhNotificationItem from './index.vue'
import { closeLhNotification as close, lhNotificationConfig as config, lhNotificationRecords } from './store'

defineOptions({ name: 'LhNotificationHost' })

const groups = computed(() => groupNotificationsByPosition(lhNotificationRecords))
</script>
