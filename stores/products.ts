export const useProductStore = defineStore('Products', () => {
  const productsInCart = ref<CartItem[]>([])
  const products = ref<Product[]>([])
  
  /* actions */
  function setProducts(newProducts: Product[]) {
    

    newProducts.forEach((p:Product) => {
      const index = products.value.findIndex((p1) => p1.id === p.id)
      if (index === -1) {
        products.value.push(p)
      }
    })


  }
  function addProductsTocartCookie(newProducts:Array<CartItem>){

    newProducts.forEach((p:CartItem) => {
      const index = products.value.findIndex((p1) => p1.id === p.product.id)
      if (index === -1) {
        productsInCart.value.push(p)
      }
    })
    
  }
  function addProductTocart(product: CartItem) {

    productsInCart.value.push(product)
    const cookie = useCookie<{ cartItems: Array<CartItem> }>('cart')
    if (!cookie.value) {
      cookie.value = { cartItems: [] }
    }
    /* console.log('cookie.value.cartItems', cookie.value.cartItems) */
    cookie.value.cartItems.push(product)

  }
  function removeProductFromCart(product: CartItem) {
    const index = productsInCart.value.findIndex((p) => p.product.id === product.product.id)
    
    productsInCart.value.splice(index, 1)

    const cookie = useCookie<{ cartItems: Array<CartItem> }>('cart')
    cookie.value.cartItems.splice(index, 1)


  }
  
  const editQuantity = (index: number,q:number) => {
    /* const index = productsInCart.value.findIndex((p) => p.product.id === product.product.id) */
    productsInCart.value[index].quantity += q
    const cookie = useCookie<{ cartItems: Array<CartItem> }>('cart')
    cookie.value.cartItems[index].quantity += q

  }
  

  /* getters */
  const productsFormatted = computed(() => {
    return products.value.map((p:Product) => {
      return {
        ...p,
        title: p.title.length > 32 ? p.title.slice(0, 32).padEnd(35, '...') : p.title,
        description: p.description.length > 45 ? p.description.slice(0, 45).padEnd(48, '...') : p.description,
      }
    }) 
  })

  const totalProductsInCart = computed(() => {
    return productsInCart.value.reduce((acc, p:CartItem) => acc + (p.product.price as number) * p.quantity, 0)
  })
  const productsFormattedInCart = computed(() => {

    return productsInCart.value.map((p:CartItem) => {
      return {
        ...p,
        quantity: p.quantity,
        total:(p.product.price as number) * p.quantity
      }
    })
  })

  return { addProductsTocartCookie,productsInCart,addProductTocart,removeProductFromCart,setProducts,products ,productsFormatted ,editQuantity , totalProductsInCart ,productsFormattedInCart}
})