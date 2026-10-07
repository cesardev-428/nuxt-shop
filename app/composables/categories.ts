export const useCategories = () => {
  const getCategories = async () => {
    try {
      const data = await $fetch<Array<Categorie>>("/api/categories/getAll");

      return data;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching categories");
    }
  };

  return {
    getCategories,
  };
};
