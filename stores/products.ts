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
    productsInCart.value[index].quantity += q;
    const cookie = useCookie<{ cartItems: Array<CartItem> }>("cart");
    cookie.value.cartItems[index].quantity += q;
  };

  /* getters */

  const productsFormatted = computed(() => {
    const tagSelected = useTagStore().tagSelected;
    const tagSelectedId = useTagStore().getTagSelectedId;

    const productsUrl = [
      "/products/1.png",
      "/products/2.png",
      "/products/3.png",
      "/products/4.png",
      "/products/5.png",
      "/products/6.png",
      "/products/7.png",
      "/products/8.png",
      "/products/9.png",
      "/products/10.png",
      "/products/11.png",
      "/products/12.png",
      "/products/13.png",
      "/products/14.png",
      "/products/15.png",
      "/products/16.png",
      "/products/17.png",
      "/products/18.png",
      "/products/19.png",
      "/products/20.png",
    ];
    /* const productsUrl = [
      "/public/products/1.png",
      "/public/products/2.png",
      "/public/products/3.png",
      "/public/products/4.png",
      "/public/products/5.png",
      "/public/products/6.png",
      "/public/products/7.png",
      "/public/products/8.png",
      "/public/products/9.png",
      "/public/products/10.png",
      "/public/products/11.png",
      "/public/products/12.png",
      "/public/products/13.png",
      "/public/products/14.png",
      "/public/products/15.png",
      "/public/products/16.png",
      "/public/products/17.png",
      "/public/products/18.png",
      "/public/products/19.png",
      "/public/products/20.png",
    ]; */

    let _products = products.value;
    if (tagSelected !== "AllTags") {
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
        // if product has no image, assign a random image from productsUrl
        p.thumbnail =
          productsUrl[Math.floor(Math.random() * productsUrl.length)];
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
