import { defineStore } from "pinia";
import type { BrandData } from "@/types/index";

export const useBrandStore = defineStore("brand", {
  state: () => ({
    loaded: false as boolean,
    data: {} as BrandData,
    supportsIsrael: null as boolean | null,
    supportsPalestine: null as boolean | null,
  }),
  actions: {
    async init() {
      await Promise.all([this.loadJsonData()]);
      this.loaded = true;
      // console.log('mainStore is loaded')
    },
    async loadJsonData() {
      try {
        const response = await fetch("/json/brands.json");
        this.data = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    setSupport(supportsIsrael: boolean, supportsPalestine: boolean) {
      this.supportsIsrael = supportsIsrael;
      this.supportsPalestine = supportsPalestine;
      console.log(this.supportsIsrael, this.supportsPalestine);
    },
  },
});
