/**
 * Imagen estable de un producto: usa el thumbnail si existe y, si no,
 * asigna una imagen local determinista según el id (misma imagen entre
 * el listado y la ficha de producto).
 */
export const productImage = (product: Product): string => {
  if (product.thumbnail && product.thumbnail !== "") {
    return product.thumbnail;
  }
  const id = Number(product.id) || 0;
  return `/products/${(Math.abs(id) % 20) + 1}.png`;
};
