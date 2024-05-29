import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { upc } = body;

  // Simulación de una respuesta de la API de Open Food Facts
  const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${upc}.json`);

  if (!response.ok) {
    throw new Error('Error fetching data from Open Food Facts');
  }

  const data = await response.json();

  if (!data.product || !data.product.brands) {
    throw new Error('No brand found for the given barcode');
  }

  return { brand: data.product.brands };
});