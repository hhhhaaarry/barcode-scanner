<template>
  <div
    class="main-layout w-full h-screen "
    
    :class="backgroundClass"
  >
    <TopBar :dark="brandStore.supportsIsrael || brandStore.supportsPalestine"/>
    <NuxtPage  class="h-full"/>
    <BottomBar :dark="brandStore.supportsIsrael || brandStore.supportsPalestine"/>
  </div>
</template>

<script setup lang="ts">
import { useBrandStore } from '@/stores/brandStore';
const brandStore = useBrandStore();
const backgroundClass = computed(() => {
  if (brandStore.supportsIsrael) return '!bg-red-500';
  if (brandStore.supportsPalestine) return '!bg-green-500';
  return '[background:linear-gradient(180deg,#1E1E1E_0%,#18181B_100%)]';
});

watch(
  () => [brandStore.supportsIsrael, brandStore.supportsPalestine],
  () => {
    backgroundClass.value = computed(() => {
      if (brandStore.supportsIsrael) return '!bg-red-500';
      if (brandStore.supportsPalestine) return '!bg-green-500';
      return '[background:linear-gradient(180deg,#1E1E1E_0%,#18181B_100%)]';
    });
  }
);

</script>

<style scoped></style>
