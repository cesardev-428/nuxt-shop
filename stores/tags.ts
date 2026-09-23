export const useTagStore = defineStore("tag", () => {
  const tagSelected = ref("AllTags") as Ref<string | "Alltags">;
  const tags = ref<Tag[]>([]);
  const setTagSelected = (id: string) => {
    tagSelected.value = id;
  };

  const setTags = (data: []) => {
    tags.value = [] as Tag[];
    if (data.length > 0) {
      // push tags to the store and remove duplicates
      data.forEach((tag: Tag) => {
        const index = tags.value.findIndex((t) => t.id === tag.id);
        if (index === -1) {
          tags.value.push(tag);
        }
      });
    } else {
      tags.value = data;
    }
  };
  // get id from tagSelected
  const getTagSelectedId = computed(() => {
    return tags.value.find((tag) => tag.name === tagSelected.value)?.id || "";
  });
  //get tags from products in store
  const getTagsFromProducts = computed(() => {
    const colors = [
      "bg-[#dad5ff]",
      "bg-[#ffe2eb]",
      "bg-[#ffe4c2]",
      "bg-[#fffd92]",
      "bg-[#cfffcb]",
      "bg-[#dbfff6]",
      "bg-[#d7edff]",
    ];

    let tagsWithColor = [
      {
        name: "AllTags",
        color: "bg-[#dad5ff]",
      },
    ];

    tags.value.forEach((tag, index) => {
      tagsWithColor.push({
        name: tag.name,
        color: colors[index % colors.length],
      });
    });

    // remove duplicates for names
    tagsWithColor = tagsWithColor.filter(
      (tag, index, self) => index === self.findIndex((t) => t.name === tag.name)
    );

    return tagsWithColor;
  });

  return {
    tags,
    tagSelected,
    setTags,
    setTagSelected,
    getTagsFromProducts,
    getTagSelectedId,
  };
});
