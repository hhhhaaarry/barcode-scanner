import { ref, onMounted, onUnmounted } from 'vue';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

export const useBarcodeScanner = () => {
  const video = ref(null);
  const brand = ref('');
  const codeReader = new BrowserMultiFormatReader();

  const fetchBrand = async (barcode: string) => {
    try {
      const response = await fetch(`/api/getBrand?barcode=${barcode}`);
      const text = await response.text(); // Obtener la respuesta como texto
      try {
        const data = JSON.parse(text); // Intentar parsear el texto como JSON
        brand.value = data.brand; // Asegúrate de acceder correctamente a la propiedad 'brand'
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        console.error('Response text:', text); // Mostrar el texto de la respuesta para depuración
      }
    } catch (error) {
      console.error('Error fetching brand:', error);
    }
  };

  const startScanner = () => {
    codeReader.decodeFromVideoDevice(null, video.value, (result, err) => {
      if (result) {
        alert(`Barcode detected: ${result.text}`);
        fetchBrand(result.text);
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error(err);
      }
    });
  };

  onMounted(() => {
    onUnmounted(() => {
      codeReader.reset();
    });
  });

  return { video, brand, startScanner };
};