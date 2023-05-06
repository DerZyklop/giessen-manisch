<script setup lang="ts">
import { getModalFns } from './modal-fns';
import { GermanToManisch, getTranslationWords } from './utils';

const props = defineProps<{
  item: GermanToManisch;
}>()

const { open, close } = getModalFns(props.item);

const manischWords = getTranslationWords({german: props.item.german});
</script>

<template>
  <router-link :to="`/translation/german/${item.id}/`" :data-nav-to-id="item.id" @click="open()" class="flex justify-between p-3 gap-5">
    <dt class="german">{{ item.german }}</dt>
    <dd class="manisch">{{ manischWords.join(', ') }}</dd>
  </router-link>
</template>

<style scoped>
dt {
  font-weight: bold;
  color: #222;
}

dd {
  margin: 0%;
  text-align: right;
}

a:hover {
  font-weight: bold;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }
}

</style>
