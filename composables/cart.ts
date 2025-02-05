export const useCart = () => {
 
 
  const getCookieCart = async () => {

    const products = useProductStore()
    if (!products.productsInCart.length  ) {
      const data = await $fetch('/api/cart', {
        headers: useRequestHeaders(['cookie'])
      })
      console.log("composables",data.cartItems as Array<CartItem>)
      
      products.addProductsTocartCookie(data.cartItems as Array<CartItem>)
    }
  }
  return {
    getCookieCart,
  }
}