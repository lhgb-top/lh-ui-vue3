<template>
  <div
    class="lh-message"
    :style="{ paddingTop: `${config.offset}px` }"
  >
    <TransitionGroup name="lh-message-zoom">
      <LhMessageItem
        v-for="record in records"
        :key="record.id"
        :type="record.type"
        :content="record.content"
        :show-close="record.showClose"
        :sx="record.sx"
        @close="close(record.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import LhMessageItem from './index.vue'
import { closeLhMessage as close, lhMessageConfig as config, lhMessageRecords as records } from './store'

defineOptions({ name: 'LhMessageHost' })
</script>
