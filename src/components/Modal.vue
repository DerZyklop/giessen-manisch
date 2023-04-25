<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

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
    <div class="flex items-center h-10">
      <h1 class="text-2xl">
        translation
      </h1>
      <button class="ml-auto" @click="emit('update:modelValue', false)">×</button>
    </div>
    {{ item.german }} > {{ item.manisch }}
    <slot />
  </VueFinalModal>
</template>

<style>


</style>
