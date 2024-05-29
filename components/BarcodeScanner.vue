<template>
  <div
    class="barcode-scanner flex w-full h-full flex-col justify-center items-center gap-2.5 shrink-0"
  >
    <div class="main-ui flex flex-col items-center gap-16 relative">
      <div
        class="brand-name inline-flex flex-col items-center gap-2 text-center text-zinc-100 absolute top-[-64px] left-1/2 -translate-x-1/2"
        v-if="brand"
      >
        <span class="text-base font-normal leading-4"> Brand: </span>
        <h3 class="text-xl font-medium leading-6">{{ brand }}</h3>
      </div>
      <div
        class="video-container flex w-[59vw] h-[59vw] max-w-[250px] max-h-[250px] lg:w-[15vw] lg:h-[15vw] aspect-square flex-col justify-center items-center gap-2 p-2 rounded-2xl border-2 border-solid relative overflow-hidden"
        :class="
          brand
            ? 'border-transparent'
            : barcodeFound
            ? 'border-red-500'
            : 'border-zinc-600'
        "
      >
        <div role="status" v-if="isScanning && videoLoading">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-zinc-700 animate-spin dark:text-zinc-700 fill-zinc-300 z-0"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>

        <video
          ref="video"
          class="w-full h-full absolute inset-0 aspect-square object-cover"
          v-if="isScanning && !logo"
        />
        <div
          class="img-container bg-white w-full h-full flex justify-center items-center absolute"
          v-if="logo"
        >
          <img
            :src="logo"
            alt="Brand Logo"
            ref="logoImage"
            :class="imageClass"
            @load="detectImageOrientation"
          />
        </div>
        <FrameOverlay />
        <div class="camera-icon" v-if="!isScanning">
          <CameraIcon />
        </div>
      </div>
      <div
        class="barcode-actions flex flex-col items-center gap-16 self-stretch"
      >
        <div
          class="flex h-[54px] flex-col items-center gap-2"
          v-if="supportsIsrael === null && supportsPalestine === null && !noBrandInfo"
        >
          <h2
            class="text-zinc-300 text-center text-base font-normal leading-[1.2]"
          >
            Point the camera <br />at a barcode
          </h2>
        </div>
        <div
          class="flex h-[54px] flex-col items-center gap-2 text-zinc-100 text-center"
          v-if="supportsIsrael === true && supportsPalestine === false"
        >
          <h2 class="text-2xl font-bold leading-[normal] uppercase">
            Supports Genocide
          </h2>
          <button
            class="reasons-toggle text-base font-normal leading-[normal] underline"
            @click="showReasons"
          >
            Why boicot them?
          </button>
        </div>
        <div
          class="flex h-[54px] flex-col items-center gap-2 text-zinc-100 text-center"
          v-if="supportsIsrael === false && supportsPalestine === true"
        >
          <h2 class="text-2xl font-bold leading-[normal] uppercase">
            Supports Palestine
          </h2>
          <button
            class="reasons-toggle text-base font-normal leading-[normal] underline"
            @click="showReasons"
          >
            How they support?
          </button>
        </div>
        <div
          class="flex h-[54px] flex-col items-center gap-2 text-zinc-100 text-center"
          v-if="noBrandInfo"
        >
          <h2 class="text-2xl font-bold leading-[normal] uppercase">
            No info available for this brand
          </h2>
        </div>
        <div
          class="flex h-[54px] flex-col items-center gap-2 text-zinc-300 text-center"
          v-if="supportsIsrael === false && supportsPalestine === false"
        >
          <h2 class="text-2xl font-bold leading-[normal] uppercase">
            Stays neutral
          </h2>
        </div>
        <button
          @click="startScanner"
          class="flex justify-center items-center gap-2 border-red-500 text-red-500 pl-5 pr-8 py-2 rounded-full border-2 border-solid hover:bg-red-500/20 h-12"
          v-show="
            supportsIsrael === null && supportsPalestine === null && !isScanning
          "
        >
          <Icon name="heroicons:viewfinder-circle-solid" class="w-6 h-6" />
          <span class="text-center text-base font-normal leading-4"
            >Start<br />Scanning</span
          >
        </button>
        <button
          @click="stopScanner"
          class="flex justify-center items-center gap-2 border-red-500 p-3 rounded-full border-2 border-solid h-12 w-12 hover:bg-red-500/20"
          v-show="
            supportsIsrael === null && supportsPalestine === null && isScanning && !noBrandInfo
          "
        >
          <Icon
            name="heroicons:stop-circle-20-solid"
            class="w-6 h-6 text-red-500"
          />
        </button>

        <button
          @click="resetScanner"
          class="flex justify-center items-center gap-2 p-3 rounded-full border-2 border-solid"
          v-show="barcodeFound && brand"
          :class="
            supportsPalestine
              ? 'border-zinc-900 text-zinc-950 hover:bg-zinc-800/20'
              : 'border-zinc-100 text-zinc-100 hover:bg-zinc-100/20'
          "
        >
          <Icon name="heroicons:arrow-left" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

const brandStore = useBrandStore();

const video = ref(null);
const videoLoading = ref(true);
const isScanning = ref(false);
const barcodeFound = ref(false);
const brand = ref("");
const supportsIsrael = ref(null);
const supportsPalestine = ref(null);
const reason = ref("");
const source = ref("");
const logo = ref("");
const logoImage = ref(null);
const codeReader = new BrowserMultiFormatReader();
const noBrandInfo = computed(() => supportsIsrael.value === null && supportsPalestine.value === null && brand.value);

const fetchBrand = async (barcode) => {
  try {
    const response = await fetch("/api/getBrand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ upc: barcode }),
    });
    const data = await response.json();
    if (!data.brand) {
      throw new Error("No brand found for the given barcode");
    }
    brand.value = data.brand;
    checkSupport(data.brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
  }
};

const checkSupport = (brandName) => {
  const brandInfo = brandStore.data.find((b) => b.brand === brandName);
  if (brandInfo) {
    supportsIsrael.value = brandInfo["supports-israel"];
    supportsPalestine.value = brandInfo["supports-palestine"];
    reason.value = brandInfo.reason;
    source.value = brandInfo.source;
    logo.value = brandInfo.logo;
    brandStore.setSupport(
      brandInfo["supports-israel"],
      brandInfo["supports-palestine"]
    );
  } else {
    supportsIsrael.value = null;
    supportsPalestine.value = null;
    reason.value = "No data available for this brand";
    source.value = "";
    logo.value = "";
    brandStore.setSupport(null, null);
  }
};

const startScanner = () => {
  isScanning.value = true;
  const constraints = {
    video: { facingMode: "environment" }, // Usar la cámara trasera si está disponible
    audio: false, // Desactivar el acceso al micrófono
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      // Desactivar manualmente las pistas de audio
      stream.getAudioTracks().forEach((track) => track.stop());
      video.value.srcObject = stream;
      videoLoading.value = false;
      codeReader.decodeFromVideoDevice(null, video.value, (result, err) => {
        if (result) {
          // alert(`Barcode detected: ${result.text}`);
          fetchBrand(result.text);
          barcodeFound.value = true;
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      });
    })
    .catch((err) => {
      console.error("Error accessing camera:", err);
    });
};
const stopScanner = () => {
  isScanning.value = false;
  videoLoading.value = true;
  codeReader.reset();
};

const resetScanner = () => {
  isScanning.value = false;
  videoLoading.value = true;
  codeReader.reset();
  barcodeFound.value = false;
  brand.value = "";
  supportsIsrael.value = null;
  supportsPalestine.value = null;
  reason.value = "";
  source.value = "";
  logo.value = "";
  brandStore.setSupport(false, false);
};

onMounted(() => {
  resetScanner();
});
onUnmounted(() => {
  resetScanner();
});
</script>
<style lang="postcss">
.landscape {
  @apply w-full h-auto;
}
.portrait {
  @apply w-auto h-full;
}
.square {
  @apply w-full h-full;
}
</style>
