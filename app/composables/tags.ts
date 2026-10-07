export const useTags = () => {
  const getTags = async () => {
    try {
      const data = await $fetch("/api/tags/getAll");

      return data;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching Tags");
    }
  };
  const getTagsFromProducts = async (Id_tags: []) => {
    try {
      const data = await $fetch("/api/tags/getTagsFromProducts", {
        method: "POST",
        body: {
          Id_tags,
        },
      });

      return data;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching Tags from Products");
    }
  };

  return {
    getTags,
    getTagsFromProducts,
  };
};
