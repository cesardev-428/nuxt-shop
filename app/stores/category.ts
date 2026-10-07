export const useCategoryStore = defineStore("category", () => {
  const categorySelected = ref<string | null>(null);
  const categories = ref<Categorie[]>([]);
  const setCategorySelected = (id: string | null) => {
    categorySelected.value = id;
  };

  const setCategories = (data: Categorie[]) => {
    categories.value = data;
  };

  const updateCategorySelectedFromParam = (name: string) => {
    const id = categories.value.find((c) => c.name == name)?.id;
    setCategorySelected(id as string);
  };
  /* const getIdCategorySelectedForParam = (name: string) => {
    return categories.value.find((c) => c.name == name)?.id as string;
  }; */

  // recursive function to get children
  const getChildren: any = (N: Categorie) => {
    // case base
    let children = categories.value.filter((c) => c.category_id === N.id);
    if (children.length === 0) {
      return [];
    } else {
      return children.map((child: Categorie) => {
        return {
          id: child.id,
          label: child.name,
          children: getChildren(child),
        };
      });
    }
  };
  const nodes = computed<Array<Tree>>(() => {
    const categoriesParent = categories.value.filter(
      (c) => c.category_id === null
    );
    return categoriesParent.map((c) => {
      return {
        id: c.id,
        label: c.name,
        children: getChildren(c),
      };
    });
  });

  const getIdCategorySelectedForParam = computed(() => {
    const route = useRoute();
    return categories.value.find((c) => c.name == route.query.category)?.id;
  });
  const getNameCategorySelected = computed(() => {
    return categories.value.find((c) => c.id == categorySelected.value)?.name;
  });
  const getBreadCrumbCategory = computed(() => {
    //return  parent -> child -> category-selected

    let category = categories.value.find((c) => c.id == categorySelected.value);
    let categoriesSelected = [];
    while (category) {
      categoriesSelected.unshift(category);
      category = categories.value.find((c) => c.id == category?.category_id);
    }

    return categoriesSelected.map((c) => c.name).join("→");
  });

  return {
    categorySelected,
    setCategorySelected,
    categories,
    setCategories,
    getBreadCrumbCategory,
    getNameCategorySelected,
    getIdCategorySelectedForParam,
    updateCategorySelectedFromParam,
    nodes,
  };
});
