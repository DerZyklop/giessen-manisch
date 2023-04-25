<script setup lang="ts">
import { useRouter } from 'vue-router';
import translations from './../assets/translations.json'

const props = defineProps<{
  id?: number
}>()
const translationId = props.id ?? +useRouter().currentRoute.value.params.id;

const translation = translations.find(item => item.id === translationId);
if (!translation) throw new Error('Translation not found');

</script>

<template>
  <div class="flex justify-between">
    <strong>{{translation.german}}</strong>
    <span>{{translation.manisch}}</span>
  </div>
</template>
