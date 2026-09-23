export const useProduct = () => {
  const getProductsWitchQuery = async (query: string) => {
    if (query) {
      const data = await $fetch(
        `/api/products/getProductsWithQuery?query=${query}`
      );
      return data;
    }
    return { products: [] };
  };

  const getProductsForCategory = async (
    category: string,
    limit: number,
    currentPage: number
  ) => {
    if (category) {
      const data = await $fetch(
        `/api/products/getProductsForCat?limit=${limit}&page=${currentPage}&category=${category}`
      );
      return data;
    }
    return { products: [] };
  };

  const getProductsWithoutCategory = async (
    limit: number,
    currentPage: number
  ) => {
    const data = await $fetch(
      `/api/products/getProductsWithout?limit=${limit}&page=${currentPage}`
    );

    return data;
  };

  const getLength = async (category?: string) => {
    if (category) {
      const data = await $fetch(`/api/products/getLength?category=${category}`);
      return data;
    } else {
      const data = await $fetch("/api/products/getLength");
      return data;
    }
  };

  return {
    getProductsForCategory,
    getLength,
    getProductsWithoutCategory,
    getProductsWitchQuery,
  };
};
