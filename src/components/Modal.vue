<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

const props = defineProps<{
  item: {
    id: number,
    german: string,
    manisch: string,
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <div class="flex items-center h-10 mb-3">
      <h3 class="text-2xl">{{ item.german }}</h3>
      <button class="py-3 pl-3 text-2xl" style="margin-right: -1rem; padding-right: 1rem;" @click="emit('update:modelValue', false)">×</button>
    </div>
    <div class="border border-gray-500 mb-3 rounded bg-light p-3">
      {{ item.manisch }}
    </div>
    <slot />
  </VueFinalModal>
</template>

<style>


</style>
