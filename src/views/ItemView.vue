<script setup lang="ts">
import { getTranslation } from '@/components/utils';
import { useRouter } from 'vue-router';

const props = defineProps<{
  id?: number
}>()
const translationId = props.id ?? +useRouter().currentRoute.value.params.id;

const translation = getTranslation(translationId);
if (!translation) throw new Error('Translation not found');

</script>

<template>
  <div class="flex justify-between">
    <strong>{{translation.germanIds}}</strong>
    <span>{{translation.manischIds}}</span>
  </div>
</template>
