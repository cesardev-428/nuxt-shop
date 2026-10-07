export const useProductStore = defineStore("Products", () => {
  const productsInCart = ref<CartItem[]>([]);
  const products = ref<Product[]>([]);
  const pages = ref<number>(0);

  const filter = ref({
    isFiltered: false,
    name: "",
  });

  /* actions */
  function clearFilter() {
    filter.value.isFiltered = false;
    filter.value.name = "";
  }
  function setFilter(name: string) {
    filter.value.isFiltered = true;
    filter.value.name = name;
  }
  function setProducts(newProducts: Product[]) {
    /* products.value = [] */
    newProducts.forEach((p: Product) => {
      const index = products.value.findIndex((p1) => p1.id === p.id);
      if (index === -1) {
        products.value.push(p);
      }
    });
  }
  function clearProducts() {
    products.value = [];
  }
  function addProductsTocartCookie(newProducts: Array<CartItem>) {
    newProducts.forEach((p: CartItem) => {
      const index = products.value.findIndex((p1) => p1.id === p.product.id);
      if (index === -1) {
        productsInCart.value.push(p);
      }
    });
  }
  function addProductTocart(product: CartItem) {
    productsInCart.value.push(product);
    const cookie = useCookie<{ cartItems: Array<CartItem> }>("cart");
    if (!cookie.value) {
      cookie.value = { cartItems: [] };
    }
    /* console.log('cookie.value.cartItems', cookie.value.cartItems) */
    cookie.value.cartItems.push(product);
  }
  function removeProductFromCart(product: CartItem) {
    const index = productsInCart.value.findIndex(
      (p) => p.product.id === product.product.id
    );

    productsInCart.value.splice(index, 1);

    const cookie = useCookie<{ cartItems: Array<CartItem> }>("cart");
    cookie.value.cartItems.splice(index, 1);
  }
  function setPages(totalProducts: number, limit: number) {
    pages.value =
      totalProducts === limit
        ? Math.floor(totalProducts / limit)
        : Math.floor(totalProducts / limit) + 1;
  }

  const editQuantity = (index: number, q: number) => {
    /* const index = productsInCart.value.findIndex((p) => p.product.id === product.product.id) */
    const item = productsInCart.value[index];
    const cookieItem = useCookie<{ cartItems: Array<CartItem> }>("cart").value
      .cartItems[index];
    if (item) item.quantity += q;
    if (cookieItem) cookieItem.quantity += q;
  };

  /* getters */

  const productsFormatted = computed(() => {
    const tagSelected = useTagStore().tagSelected;
    const tagSelectedId = useTagStore().getTagSelectedId;

    let _products = products.value;
    if (tagSelected !== "AllTags" && tagSelectedId) {
      _products = products.value.filter((p: Product) => {
        return p.tag_id?.some((t) => t === tagSelectedId);
      });
    }

    // filter by price
    if (filter.value.isFiltered && filter.value.name === "Price: Low to High") {
      _products = _products.sort((a, b) => {
        return (a.price as number) - (b.price as number);
      });
    } else if (
      filter.value.isFiltered &&
      filter.value.name === "Price: High to Low"
    ) {
      _products = _products.sort((a, b) => {
        return (b.price as number) - (a.price as number);
      });
    } else if (filter.value.isFiltered && filter.value.name === "Newest") {
      _products = _products.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
    }

    const productsWithImages = _products.map((p: Product) => {
      if (!p.thumbnail || p.thumbnail === "" || p.thumbnail === null) {
        // Imagen determinista por id: la misma entre listado y ficha
        p.thumbnail = `/products/${(Math.abs(Number(p.id)) % 20) + 1}.png`;
      }

      return p;
    });

    return productsWithImages.map((p: Product) => {
      return {
        ...p,
        title:
          p.title.length > 32
            ? p.title.slice(0, 32).padEnd(35, "...")
            : p.title,
        description:
          p.description.length > 45
            ? p.description.slice(0, 45).padEnd(48, "...")
            : p.description,
      };
    });
  });
  const getPagesFromFormatted = computed(() => {
    const limit = 6;
    const totalProducts = productsFormatted.value.length;
    return totalProducts === limit
      ? Math.floor(totalProducts / limit)
      : Math.floor(totalProducts / limit) + 1;
  });

  const totalProductsInCart = computed(() => {
    return productsInCart.value.reduce(
      (acc, p: CartItem) => acc + (p.product.price as number) * p.quantity,
      0
    );
  });
  const productsFormattedInCart = computed(() => {
    return productsInCart.value.map((p: CartItem) => {
      return {
        ...p,
        quantity: p.quantity,
        total: (p.product.price as number) * p.quantity,
      };
    });
  });

  return {
    addProductsTocartCookie,
    productsInCart,
    addProductTocart,
    removeProductFromCart,
    setProducts,
    products,
    productsFormatted,
    editQuantity,
    totalProductsInCart,
    productsFormattedInCart,
    setPages,
    pages,
    clearProducts,
    getPagesFromFormatted,
    filter,
    clearFilter,
    setFilter,
  };
});
