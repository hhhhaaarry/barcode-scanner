<template>
  <div
    id="app w-full h-full bg-red-500"
  >
    <NuxtLayout name="default" />
  </div>
</template>
<script setup lang="ts">
import { useBrandStore } from '@/stores/brandStore';

const brandStore = useBrandStore();

useHead({
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1",
    },
    { charset: "utf-8" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
onMounted(() => {
  brandStore.init();
  // Ajustar la altura de la aplicación
  window.addEventListener("resize", appHeight);
  appHeight();
  // Ocultar overflow y establecer altura del body
  document.body.style.overflow = "hidden";
  document.body.style.height = "var(--app-height)";
  const app = document.querySelector("#__nuxt") as HTMLElement;
  if (app) {
    app.style.height = "100%";
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", appHeight);
});
</script>
