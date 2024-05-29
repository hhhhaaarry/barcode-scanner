<template>
  <header
    class="top-bar flex w-full flex-col justify-center items-center gap-2 px-5 py-4 fixed top-0 left-0"
  >
    <h1
      class="text-base font-bold leading-4 uppercase flex justify-center items-center gap-0.5 p-2"
      :class="{
        'text-zinc-800': dark,
        'text-zinc-300': !dark,
      }"
    >
      Genocide
      <span
        ><svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="fluent-emoji-flat:drop-of-blood">
            <path
              id="Vector"
              d="M12.75 11.4812C13.2 10.0413 12.95 8.72125 12.35 7.62125L8.885 1.52125C8.49 0.82625 7.49 0.82625 7.095 1.52125L3.675 7.53625C3.26 8.26625 3 9.10125 3 10.0063C3 13.0513 5.725 15.4613 8.87 14.9213C10.69 14.6112 12.2 13.2413 12.75 11.4812Z"
              :class="{
                'fill-zinc-100': dark,
                'fill-[#F8312F]': !dark,
              }"
            />
          </g>
        </svg>
      </span>
      Checker
    </h1>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
