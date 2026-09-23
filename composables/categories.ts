export const useCategories = () => {
  const getCategories = async () => {
    try {
      const data = (await $fetch("/api/categories/getAll")) as Array<Categorie>;

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
